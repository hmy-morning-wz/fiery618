import '@tklc/miniapp-tracker-sdk';
import tracertTa from '@alipay/tracert-ta';
import { getUserId, config, request } from './utils/TinyAppHttp';
import herculex from 'herculex';
import serviceplugin from "./utils/serviceplugin";
import servicesCreactor from "./utils/serviceCreator";
import Store from './store';
import appVersion from './version.json';
import GlobalData from './utils/globalData';
import common from './utils/common';
import ext from "./ext.json";
const extJson = ext.ext;
const env = extJson.env;
const Tracert = new tracertTa({
    spmAPos: 'a56',
    spmBPos: 'b23056',
    system: "a1001",
    subsystem: "b1001",
    bizType: 'common',
    logLevel: 2,
    chInfo: '',
    debug: env == 'sit',
    mdata: {},
});
App(Store({
    Tracert,
    request,
    herculex,
    serviceplugin,
    servicesCreactor,
    extJson,
    appId: extJson.appId,
    globalData: new GlobalData({
        env: extJson.env,
        url: extJson.url,
        version: appVersion.version
    }),
    mtrConfig: {
        server: ['https://webtrack.allcitygo.com:8088/event/upload'],
        version: appVersion.version + '@' + appVersion.date,
        stat_auto_expo: true,
        stat_reach_bottom: true,
        stat_batch_send: true,
        appName: extJson.title,
        appId: extJson.appId,
        stat_app_launch: false,
        stat_app_show: false,
        mtrDebug: env == 'sit'
    },
    async onLaunch(options) {
        const { query, scene, referrerInfo } = options;
        let globalData = this.globalData;
        let extraBz = referrerInfo && referrerInfo.extraData && referrerInfo.extraData.bizScenario;
        let bizScenario = extraBz || (query && query.bizScenario);
        globalData.bizScenario = bizScenario;
        globalData.appId = extJson.appId,
            globalData.query = query;
        globalData.scene = scene;
        globalData.env = extJson.env;
        this.replaceConfig = globalData.replaceConfig = Object.assign({ appName: extJson.title, appId: extJson.appId, bizScenario: bizScenario }, extJson.cityInfo);
        console.info('App onLaunch', options, globalData);
        config({
            env,
            appId: extJson.appId,
            autoLogin: false,
            hostBaseUrl: env === 'sit' ? 'https://sit-basic-ug.allcitygo.com' : 'https://ztmanage.allcitygo.com:8192'
        });
        this.systemInfo = { env: extJson.env };
        updateSystemInfo().then((res) => {
            Object.assign(this.systemInfo, res);
        });
        this.loadUserId();
        my.reportAnalytics("v" + this.mtrConfig.version, { version: this.mtrConfig.version });
    },
    taobaoResult(param) {
        this.globalData.taobaoResult = param;
        let { followedId, from, tbResult } = param;
        if (followedId && from && tbResult == 0 && from == 'follow') {
            param = Object.assign(Object.assign({}, param), { code: 'SUCCESS', sellerId: followedId, type: 'follow' });
            this.globalData.taobaoResult = param;
        }
        this.$emitter && this.$emitter.emitEvent('taobaoResult', param);
    },
    onShow(options) {
        const { query, scene, referrerInfo } = options;
        this.type = (query && query.type) || 'normal';
        if (query) {
            this.msg = query;
            if (query._preview) {
                let reg = new RegExp('\{.*\}');
                if (reg.test(query._preview)) {
                    try {
                        let preview = JSON.parse(query._preview);
                        if (preview && preview.exp) {
                            if (+Date.now() > preview.exp) {
                                console.warn("预览码过期");
                                preview = null;
                                my.showToast({ content: "亲，你扫的预览码已过期" });
                            }
                        }
                        this.preview = preview;
                    }
                    catch (err) {
                    }
                    console.log("_preview", query, this.preview);
                }
            }
            if (query.clear) {
                my.clearStorageSync();
                setTimeout(async () => {
                    await this.globalData.clear();
                    my.clearStorageSync();
                    my.confirm({
                        title: '缓存清除提示',
                        content: '缓存已经清除，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                my.clearStorageSync();
                                my.reLaunch({ url: '/pages/index/index' });
                            }
                        }
                    });
                }, 3000);
            }
        }
        let globalData = this.globalData;
        globalData.query = query;
        globalData.scene = scene;
        if (query) {
            let { notifyParam } = query;
            if (notifyParam) {
                let result = common.qs.parse(notifyParam);
                this.taobaoResult(result);
            }
        }
    },
    async loadUserId() {
        if (!this.alipayId) {
            let userId = await getUserId();
            this.alipayId = userId;
            this.globalData.userId = userId;
            this.replaceConfig.userId = userId;
            return { success: userId || false };
        }
        return { success: this.alipayId };
    },
    handleIconClick(e) {
        console.log('handleClick', e.currentTarget.dataset);
        if (e.detail && e.detail.formId) {
            console.log("formId", e.detail.formId);
            this.formId = this.globalData.formId = e.detail.formId;
        }
        let obj = e.currentTarget.dataset.obj;
        if (!obj) {
            console.warn('handleClick dataset obj is undefine');
            return;
        }
        common.handleNavigate(obj, this);
    },
}));
async function updateSystemInfo() {
    let res = await common.getSystemInfoSync();
    let versionCodes = res.version.split(".").map((t) => parseInt(t));
    let version = versionCodes[0] * 10000 + versionCodes[1] * 100 + versionCodes[2];
    if (version < 100170) {
        my.showToast({
            type: 'success',
            content: '您当前支付宝版本过低，须更新'
        });
        my.canIUse('ap.updateAlipayClient') && my.ap.updateAlipayClient();
    }
    else {
        let sdkVersionCodes = my.SDKVersion.split(".").map((t) => parseInt(t));
        let sdkVersion = sdkVersionCodes[0] * 10000 + sdkVersionCodes[1] * 100 + sdkVersionCodes[2];
        if (sdkVersion < 11100) {
            my.showToast({
                type: 'success',
                content: '您当前支付宝版本过低，须更新'
            });
            my.canIUse('ap.updateAlipayClient') && my.ap.updateAlipayClient();
        }
    }
    try {
        if (my.canIUse('getUpdateManager')) {
            const updateManager = my.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log(res.hasUpdate);
            });
            updateManager.onUpdateReady(function () {
                my.confirm({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启应用？',
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function () {
            });
        }
    }
    catch (err) {
        console.error(err);
    }
    return res;
}

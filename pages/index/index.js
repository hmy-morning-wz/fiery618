import store from './store';
import tmallshop from '../../services/tmallshop';
import basepage from '../../utils/basepage';
import common from '../../utils/common';
const DEBUG = true;
const defaultActivityId = 99;
const createPage = function (options) {
    return Page(store.register(options));
};
createPage(Object.assign({ data: {
        loading: true,
        recordListShow: false,
        drawResult: false,
        brandIdx: 0,
        loadingBallOpacity: 0,
        redBagDouble: {},
        showPopInfo: {},
        loadReady: false
    }, mapActionsToMethod: [''], async onLoad(query) {
        my.showNavigationBarLoading();
        let app = getApp();
        let globalData = app.globalData;
        let bizScenario = globalData.bizScenario;
        if ((query && query.bizScenario) && !bizScenario) {
            globalData.bizScenario = query.bizScenario;
        }
        globalData.sharerId = query.sharerId;
        await this.dispatch("pageOnLoad");
        my.hideNavigationBarLoading();
        let { mtopEnd } = this.data;
        if (!mtopEnd) {
            setTimeout(() => {
                let { loading } = this.data;
                loading && this.hideLoading();
            }, 5000);
        }
        this.setData({ loadReady: true, loading: !mtopEnd, systemInfo: app.systemInfo });
        getApp().$emitter = this.$emitter;
        if (!this.taobaoResultListener) {
            this.taobaoResultListener = this.$emitter.addListener('taobaoResult', () => {
                console.log("$emitter Listener  taobaoResult");
                setTimeout(() => {
                    let { taobaoResult } = getApp().globalData;
                    if (taobaoResult) {
                        this.onTaskComple(taobaoResult);
                        delete getApp().globalData.taobaoResult;
                    }
                    else {
                        console.warn("no taobaoResult");
                    }
                }, this._isHided ? 500 : 0);
            });
        }
    }, onUnload() {
        this.removeNotifyListener();
        this.taobaoResultListener && this.taobaoResultListener();
        delete this.taobaoResultListener;
    }, currentStepRef(ref) {
        this.stepRef = ref;
    }, goNextTask() {
        let { currentTask, taskList2 } = this.data;
        if ((!currentTask) || (!currentTask.sellerId)) {
            currentTask = taskList2 && taskList2.length && taskList2[0] || {};
            currentTask.userTap = "AUTO_NEXT";
        }
        this.setData({ currentTask });
        return currentTask.sellerId && this.onGoTask(currentTask);
    }, showLoading(delay) {
        if (delay) {
            this.loadingTimer = setTimeout(() => {
                this.loadingTimer = 0;
                this.setData({ loading: true });
            }, delay);
        }
        else {
            this.setData({ loading: true });
        }
    }, hideLoading() {
        this.setData({ loading: false });
        if (this.loadingTimer) {
            clearTimeout(this.loadingTimer);
            this.loadingTimer = 0;
        }
    }, addNotifyListener() {
        this.notifyListener = true;
        my.call('addNotifyListener', {
            name: 'NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS',
            success: (result) => {
                console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS success ', result, new Date().getTime());
            },
            fail: (result) => {
                this.notifyListener = false;
                console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS fail ', result, new Date().getTime());
                if (getApp().globalData.env == 'sit')
                    my.showToast({ content: "NEBULANOTIFY_XLIGHT_TASK_SUCCESS fail " + JSON.stringify(result) });
            }
        }, (result) => {
            console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS cb ', result, new Date().getTime());
            this.setData({ notification: JSON.stringify(result) });
            this.onTaskComple(Object.assign(Object.assign({}, result), { type: "member", code: "SUCCESS" }));
        });
    },
    removeNotifyListener() {
        this.notifyListener = false;
        my.call('removeNotifyListener', {
            name: 'NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS',
            success: (result) => {
                console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS removeNotifyListener success ', result, new Date().getTime());
            },
            fail: (result) => {
                console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS removeNotifyListener fail ', result, new Date().getTime());
            }
        }, (result) => {
            console.log('NEBULANOTIFY_BRAND_MINIAPP_JOIN_MEBMER_SUCCESS removeNotifyListener cb ', result, new Date().getTime());
        });
    }, onShow() {
        if (this.data.loadReady) {
            let { currentTaskItem } = this.data;
            this.dispatch("updateTaskList");
            if (currentTaskItem && currentTaskItem.sellerId) {
                console.log("task doing");
                return;
            }
        }
        this.setData({ doDraw: false });
    },
    onShareAppMessage(options) {
        let url = options.webViewUrl || this.data.url;
        let userId = getApp().globalData.userId;
        return {
            title: `分享活动`,
            path: `pages/index/index?sharerId=${userId}`,
            'web-view': url,
        };
    }, onRuleClose(e) {
        this.setData({ rule: false });
    },
    activityTap(e) {
        getApp().handleIconClick(e);
    },
    onShopTap(e) {
        let obj = e.currentTarget.dataset.obj;
        console.log("onShopTap", obj);
        let globalData = getApp().globalData;
        let { sellerId, state } = obj;
        if (!state) {
            getApp().handleIconClick(e);
            globalData.set(`goshop-${sellerId}`, 1);
            this.dispatch("updateGoShopList");
        }
        else if (state == 1) {
            this.dispatch("$service:preheatRedBagRandom", { sellerId });
        }
        else {
            console.log("已领取");
        }
    },
    couponsTap(e) {
        getApp().handleIconClick(e);
    },
    async onTopTaskTap(obj) {
        if (obj.drawId && obj.type == 'draw') {
            if (this.flagTopTaskTap) {
                return;
            }
            this.setData({ jumpObj: obj });
            this.flagTopTaskTap = true;
            await this.dispatch('$service:getIndustryVoucher', { activityId: defaultActivityId, campId: obj.drawId });
            setTimeout(() => {
                this.flagTopTaskTap = false;
            }, 1000);
        }
        else if (obj.type == 'jump') {
            common.handleNavigate(obj);
        }
    },
    onBallTap(obj) {
        obj.userTap = "BALL_TAP";
        this.setData({ currentTask: obj });
        this.onDrawTap(obj);
    }, onChangeTap() {
        let brandIndex = (this.data.brandIdx < this.data.gifZone3.length - 1) ? (this.data.brandIdx + 1) : 0;
        this.setData({
            brandIdx: brandIndex
        });
    }, async onDrawTap(obj) {
        let { redBag: { state, amount, count }, gameZone, taskList2 } = this.data;
        let currentTask = obj;
        if (!obj) {
            currentTask = taskList2.length && taskList2[0] || {};
            currentTask.userTap = "DRAW";
            this.setData({ currentTask });
        }
        console.log("onDrawTap", state);
        if (state == 0 && !amount) {
            if (taskList2.length) {
                let showPopInfo = {
                    isShowPop: true,
                    showPop: "taskPop1",
                    redEnvelopeAmount: gameZone.firstMoney,
                    brandText: `${currentTask.name}为红包助力，最高可得`,
                    logoUrl: currentTask.icon_img
                };
                this.setData({ showPopInfo });
                this.$mtr_click(obj ? "气泡领取点击" : "按钮领取点击", currentTask);
                if (!obj) {
                    let spmId = "a56.b23056.c58532.d120954";
                    let { creativeId, sellerId } = currentTask || {};
                    let app = getApp();
                    if (app.Tracert) {
                        let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                        let { system, subsystem } = app.Tracert;
                        let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                        app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                    }
                }
            }
            else {
                this.$mtr_click("按钮领取点击-没有任务了-领兜底券");
                if (!obj) {
                    let spmId = "a56.b23056.c58532.d120954";
                    let { creativeId, sellerId } = currentTask || {};
                    let app = getApp();
                    if (app.Tracert) {
                        let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                        let { system, subsystem } = app.Tracert;
                        let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                        app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                    }
                }
                this.showLoading();
                await this.dispatch('$service:sendVoucher');
                this.hideLoading();
            }
        }
        else {
            let { redBagDouble, taskList2, redBag, } = this.data;
            let { totalCount } = redBagDouble || {};
            if (!totalCount) {
                redBagDouble.totalCount = totalCount = taskList2.length;
            }
            if (taskList2.length && count) {
                let amount = redBagDouble.doubleAmount;
                let progressBar = redBagDouble.progressBar;
                let count = redBagDouble.count;
                if (count && progressBar && amount) {
                    let showPopInfo = {
                        isShowPop: true,
                        showPop: "taskPop2",
                        redEnvelopeAmount: amount,
                        brandText: `${currentTask.name}`,
                        taskTotalCount: progressBar,
                        taskCompleteCount: progressBar - (count || 0),
                        logoUrl: currentTask.icon_img
                    };
                    this.setData({ showPopInfo, doNextTask: true, redBagDouble });
                }
                else {
                    this.showLoading();
                    await this.dispatch('$service:pereheatRedBagPopup', { taskNumber: taskList2.length });
                    this.setData({ doNextTask: true });
                    this.hideLoading();
                }
                this.$mtr_click(obj ? "气泡领取翻倍点击" : "按钮翻倍点击", currentTask);
                if (!obj) {
                    let spmId = "a56.b23056.c58532.d120955";
                    let { creativeId, sellerId } = currentTask || {};
                    let app = getApp();
                    if (app.Tracert) {
                        let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                        let { system, subsystem } = app.Tracert;
                        let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                        app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                    }
                }
            }
            else {
                console.log("没有任务了，去领奖金");
                let { amount, redBagId } = redBag;
                if (amount && redBagId) {
                    this.$mtr_click("按钮领取点击-领奖金");
                    if (!obj) {
                        let spmId = "a56.b23056.c58532.d120954";
                        let { creativeId, sellerId } = currentTask || {};
                        let app = getApp();
                        if (app.Tracert) {
                            let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                            let { system, subsystem } = app.Tracert;
                            let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                            app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                        }
                    }
                    this.onNotTaskTap();
                }
                else {
                    this.$mtr_click("按钮领取点击-无奖金-领兜底券");
                    if (!obj) {
                        let spmId = "a56.b23056.c58532.d120954";
                        let { creativeId, sellerId } = currentTask || {};
                        let app = getApp();
                        if (app.Tracert) {
                            let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                            let { system, subsystem } = app.Tracert;
                            let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                            app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                        }
                    }
                    this.showLoading();
                    await this.dispatch('$service:sendVoucher');
                    this.hideLoading();
                }
            }
        }
    }, onGiveupDouble() {
        console.log("放弃翻倍");
        let { redBagDouble: { amount, count }, gameZone } = this.data;
        let showPopInfo = {
            isShowPop: true,
            showPop: "redPacket1",
            redEnvelopeAmount: amount || gameZone.money,
        };
        this.setData({ showPopInfo, doNextTask: false });
    },
    onDrawDoubleTap() {
        console.log("点击去翻倍");
        this.setData({ doNextTask: true });
        let res = this.goNextTask();
        if (!res) {
            console.log("没有任务了");
        }
    },
    onDraw() {
    }, async onEntityDrawTap(e) {
        let { currentTarget: { dataset } } = e;
        let { obj } = dataset;
        let { drawId: activityId, prizeId, status } = obj;
        let { gifReach } = this.data;
        console.log("onEntityDrawTap", { gifReach, activityId, prizeId, status });
        if (gifReach == undefined) {
            my.showToast({ content: "亲，请稍后再试" });
            console.log("亲，请稍后再试");
            return;
        }
        if (gifReach == false) {
            my.showToast({ content: "亲，还未达标" });
            console.log("亲，还未达标");
            my.pageScrollTo({ scrollTop: 0 });
            return;
        }
        if (status == 1) {
            console.log("已领抽奖");
            return;
        }
        this.showLoading();
        await this.dispatch('$service:getEntityPrize', { activityId, prizeId });
        this.hideLoading();
    }, async onNotTaskTap() {
        let { redBag: { redBagId, amount } } = this.data;
        if (amount && redBagId) {
            this.showLoading();
            await this.dispatch('$service:preheatRedBagSend', { redBagId });
            this.hideLoading();
        }
        else {
            console.log("不满足条件");
        }
        this.setData({ doNextTask: false, "redBag.state": 0 });
    }, onGoTask(e) {
        let shop = e;
        if (!shop) {
            console.warn("onGoTask not fond obj");
            return;
        }
        console.log("onGoTask", shop);
        let { sellerId, shopAppId: appId, taskUrlType, taskUrl, taskType, taskId } = shop;
        if (!sellerId) {
            return;
        }
        this.$mtr_click("去做任务", shop);
        this.setData({ currentTaskItem: shop });
        if (my.isIDE) {
            setTimeout(() => {
                this.onTaskCompleTap();
            }, 3000);
        }
        let obj = tmallshop.goShopTask({
            sellerId: sellerId, appId: appId, taskUrlType, taskUrl,
            exInfo: JSON.stringify({ "autoExit": 1, "notifyParam": { "taskId": taskId, "sellerId": sellerId } }),
        });
        if (obj.startApp) {
            if (taskUrlType === 'miniapp') {
                if (!this.notifyListener) {
                    this.addNotifyListener();
                }
            }
            my.ap.navigateToAlipayPage({
                path: obj.url,
                success: (res) => {
                    if (taskType === 'shop') {
                        this.onTaskComple({ code: "SUCCESS", sellerId, type: taskType, taskId });
                    }
                },
                fail: (error) => {
                    if (getApp().globalData.env == 'sit')
                        my.showToast({ content: 'navigateToAlipayPage fail' + JSON.stringify(error) });
                }
            });
            return true;
        }
        else {
            if (obj.url) {
                if (taskUrlType == "alipays") {
                    if (taskType === 'shop') {
                        this.onTaskComple({ code: "SUCCESS", sellerId, type: taskType, taskId });
                    }
                    my.ap.navigateToAlipayPage({
                        path: obj.url,
                        success: (res) => {
                        },
                        fail: (error) => {
                            if (getApp().globalData.env == 'sit')
                                my.showToast({ content: 'navigateToAlipayPage fail' + JSON.stringify(error) });
                        }
                    });
                }
                else {
                    let url = `/pages/webview/webview?url=${encodeURIComponent(obj.url)}&sellerId=${sellerId}&taskId=${taskId}&taskType=${taskType}`;
                    if (taskType === 'shop') {
                        my.navigateTo({ url });
                    }
                    else {
                        my.navigateTo({ url });
                    }
                }
                return true;
            }
        }
    }, onTaskFail() {
        this.notifyListener && this.removeNotifyListener();
    }, onTaskCompleTap() {
        if (DEBUG) {
            let { currentTaskItem } = this.data;
            this.onTaskComple(Object.assign({ code: "SUCCESS" }, currentTaskItem));
        }
    },
    onTaskComple(data) {
        console.log("onTaskComple", data);
        this.notifyListener && this.removeNotifyListener();
        if (!data) {
            return;
        }
        let { type, sellerId, code, taskId } = data;
        if (code !== "SUCCESS" || !sellerId) {
            console.log("onTaskComple not success", code);
            return;
        }
        let { redBag } = this.data;
        let playload = { sellerId, sharerId: this.data.sharerId, taskType: type, redBagId: redBag.redBagId };
        if (type === 'member') {
            playload.taskType = 1;
        }
        else if (type === 'follow') {
            playload.taskType = 2;
        }
        else if (type === 'shop') {
            playload.taskType = 3;
        }
        else {
            playload.taskType = type;
        }
        setTimeout(async () => {
            this.showLoading(500);
            let { redBagDouble, taskList2, currentTask } = this.data;
            playload.userTaskNumber = taskList2 === null || taskList2 === void 0 ? void 0 : taskList2.length;
            if (redBagDouble && redBagDouble.count == 1) {
                this.setData({ doNextTask: false, "redBag.state": 0 });
            }
            this.dispatch('$service:preheatRedBagDouble', playload).then(async () => {
                this.hideLoading();
                this.$mtr_click("任务完成", Object.assign(Object.assign({}, currentTask), data));
                let spmId = "a56.b23056.c58532.d120956";
                let { creativeId, sellerId } = currentTask || {};
                let app = getApp();
                if (app.Tracert) {
                    let traceId = app.Tracker && app.Tracker.Mtr.traceId && app.Tracker.Mtr.traceId();
                    let { system, subsystem } = app.Tracert;
                    let scm = `${system}.${subsystem}.creative.${creativeId || '-'}.${traceId}.${sellerId || '-'}`;
                    app.Tracert && app.Tracert.clickContent(spmId, scm || "", "", "");
                }
                let taskIndex = taskList2.indexOf(currentTask);
                if (taskIndex > -1) {
                    taskList2.splice(taskIndex, 1);
                }
                this.setData({ taskList2, currentTaskItem: {}, currentTask: {} }, () => {
                    let { doNextTask } = this.data;
                    if (doNextTask) {
                        let { redBagDouble, redBag, taskList2 } = this.data;
                        let currentTask = taskList2.length && taskList2[0] || {};
                        let amount = redBagDouble.doubleAmount;
                        let progressBar = redBagDouble.progressBar;
                        let count = redBagDouble.count;
                        let isShowPop = !!(taskList2.length && count);
                        let showPopInfo = {
                            isShowPop,
                            showPop: "taskPop2",
                            brandText: `${currentTask.name}`,
                            redEnvelopeAmount: amount,
                            taskTotalCount: progressBar,
                            taskCompleteCount: progressBar - count,
                            logoUrl: currentTask.icon_img
                        };
                        this.setData({ showPopInfo }, () => {
                            if (isShowPop) {
                                setTimeout(() => {
                                    let ret = this.goNextTask();
                                    if (!ret) {
                                        console.log("没有任务了");
                                        this.setData({ doNextTask: false, "redBag.state": 0 });
                                    }
                                }, 500);
                            }
                            else {
                                this.setData({ doNextTask: false, "redBag.state": 0 });
                            }
                        });
                    }
                    else {
                        this.setData({ "showPopInfo.isShowPop": false });
                    }
                });
            });
        }, this._isHided ? 500 : 0);
    }, onShowRule() {
        this.setData({ rule: true });
    },
    onShowResult() {
    },
    onResultClick() {
        this.onResultClose();
    },
    onBannerClick() {
        this.onResultClose();
    }, onBannerTap(e) {
        let { currentTarget: { dataset } } = e;
        let { obj } = dataset;
        common.handleNavigate(obj);
    },
    onGoodsTap(e) {
        let { currentTarget: { dataset } } = e;
        let { obj } = dataset;
        common.handleNavigate(obj);
    },
    handleJump(event) {
        let { currentTarget: { dataset } } = event;
        let { obj } = dataset;
        if (obj) {
            common.handleNavigate(obj);
        }
    }, onAppear() {
        console.log("onAppear");
    },
    async onPreheatRedBagList() {
        this.setData({
            recordListShow: true,
        });
        return await this.dispatch('$service:preheatRedBagList');
    },
    closeRecordList() {
        this.setData({
            recordListShow: false,
        });
    },
    onJoinMember() {
        console.log("去入会");
        let { showPopInfo } = this.data;
        if ('taskPop2' != showPopInfo.showPop) {
            this.setData({
                'showPopInfo.isShowPop': false,
            }, () => {
                let res = this.goNextTask();
                if (!res) {
                    console.log("没有任务了");
                }
            });
        }
        else {
            let res = this.goNextTask();
            if (!res) {
                console.log("没有任务了");
            }
        }
    },
    onGoDouble() {
        console.log("去翻倍");
        this.setData({
            'showPopInfo.isShowPop': false,
        }, () => {
            let { redBagDouble, redBag, taskList2 } = this.data;
            let amount = redBagDouble.doubleAmount || redBag.doubleAmount;
            let progressBar = redBagDouble.progressBar || redBag.progressBar || redBagDouble.totalCount;
            let count = redBagDouble.count || redBag.count;
            if (taskList2.length) {
                let currentTask = taskList2[0];
                let showPopInfo = {
                    isShowPop: true,
                    showPop: "taskPop2",
                    brandText: `${currentTask.name}`,
                    redEnvelopeAmount: amount,
                    taskTotalCount: progressBar,
                    taskCompleteCount: progressBar - count,
                    logoUrl: currentTask.icon_img
                };
                this.setData({ showPopInfo, doNextTask: true });
            }
            else {
                console.log("none task");
            }
        });
    },
    onGoLeave() {
        console.log("去意已决");
        this.onNotTaskTap();
        this.setData({
            "redBag.state": 1,
            'showPopInfo.isShowPop': false,
        });
    },
    onTaskPopClose() {
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    },
    onGoShare() {
        this.dispatch("$service:getShareRecordList");
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    },
    onGoToShare() {
        my.showSharePanel();
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    }, onGetAddress(obj) {
        my.getAddress({
            success: (res) => {
                let { address, country, prov, city, area, street, fullname, mobilePhone } = res && res.result || {};
                let { showPopInfo, gifZone } = this.data;
                let gameRecordId = showPopInfo.gameRecordId || (obj && obj.gameRecordId);
                let prizeName = showPopInfo.prizeName || (obj && obj.prizeName);
                let awardPicUrl;
                if (obj) {
                    let gifs = gifZone.filter((a) => a.title == prizeName);
                    if (gifs && gifs.length) {
                        let gif = gifs.pop();
                        let { title, image } = gif;
                        awardPicUrl = image;
                    }
                }
                if (!gameRecordId) {
                    let entityPrize = this.data.$result.getEntityPrize;
                    console.log("getEntityPrize success", res);
                    gameRecordId = entityPrize && entityPrize.gameRecordId;
                }
                let isShowPop = !!gameRecordId;
                showPopInfo = Object.assign(Object.assign({ awardName: prizeName, awardPicUrl }, showPopInfo), { gameRecordId, result: { address, country, prov, city, area, street, fullname, mobilePhone }, isShowPop, showPop: "getAddress", addressName: fullname, addressMobile: mobilePhone, address: country + prov + city + area + street + address });
                this.setData({ showPopInfo });
                if (!isShowPop) {
                    my.showToast({ content: "亲，无需填写收货地址" });
                }
            }
        });
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    }, async onAddressComplete() {
        let { showPopInfo } = this.data;
        let { gameRecordId } = showPopInfo;
        if (!gameRecordId) {
            let res = this.data.$result.getEntityPrize;
            console.log("getEntityPrize success", res);
            gameRecordId = res && res.gameRecordId;
        }
        let { result: { address, country, prov, city, area, street, fullname, mobilePhone }, } = this.data.showPopInfo;
        await this.dispatch('$service:addPrizeAddress', { gameRecordId, address, country, prov, city, area, street, fullname, mobilePhone });
        await this.dispatch('$service:preheatRedBagList');
    },
    onAddressUpdate() {
        this.onGetAddress();
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    },
    onGetGift() {
        let { mysticalGif } = this.data;
        mysticalGif && common.handleNavigate(mysticalGif);
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    },
    onGoRiding() {
        this.setData({
            'showPopInfo.isShowPop': false,
        }, () => {
            let jumpObj = this.data.jumpObj || {};
            let { buttonLink } = jumpObj;
            if (buttonLink && buttonLink.indexOf("alipays://platformapi/startapp") > -1) {
                my.ap.navigateToAlipayPage({ path: buttonLink });
            }
            else {
                common.handleNavigate(buttonLink);
            }
        });
    }, onPopReceive(item) {
        console.log("onPopReceive:", item);
        item && common.handleNavigate(item.url);
        this.setData({
            'showPopInfo.isShowPop': false,
        });
    }, onReachBottom() {
        this.onBottomLoad();
    },
    onBottomLoad() {
        this.setData({ bottomLoad: true });
    } }, basepage));

import Store from 'herculex';
import servicesCreactor from "../../utils/serviceCreator";
import * as services from "../../services/acitivty";
import * as actions from "./actions";
import serviceplugin from "../../utils/serviceplugin";
import common from '../../utils/common';
import { getUserId } from '../../utils/TinyAppHttp';
const defaultActivityId = 99;
export default new Store({
    connectGlobal: true,
    state: {
        redBag: {},
        redBagDouble: {},
        liveList: [],
        liveTitle: '',
        layoutOrder: [],
        preLoadImages: [],
        taskList3: [],
        taskList2: []
    },
    getters: {},
    plugins: ['logger', serviceplugin()],
    services: servicesCreactor(services),
    mutations: {
        SHOW_POP_INFO(state, payload) {
            state.showPopInfo = payload;
        }
    },
    actions: Object.assign(Object.assign({}, actions), { async pageOnLoad({ state, dispatch, commit, getters }) {
            console.log("time", +Date.now());
            let p = [
                dispatch('$global:getPageJSON', 'pages/index/index'),
                common.getSystemInfoSync(),
            ];
            let res = await Promise.all(p);
            await dispatch("pageOnNextLoad");
        },
        async pageOnNextLoad({ state, dispatch, commit, getters, global }) {
            console.time('time-pageOnNextLoad');
            console.log("time", +Date.now());
            let app = getApp();
            let globalData = app.globalData;
            let curpage = global.getIn(['pageJson', 'pages/index/index'], {});
            let page_title = curpage['page_title'];
            if (page_title) {
                my.setNavigationBar({ title: page_title });
            }
            let backClass = curpage['backClass'] || [];
            let { bizScenario, version } = globalData;
            let examine = (!bizScenario) && (curpage['auditminiapp'] == version);
            if (!bizScenario)
                bizScenario = 'default';
            backClass = backClass.filter((t) => {
                if (t.bizScenario)
                    return t.bizScenario.indexOf(bizScenario) > -1;
                else
                    return true;
            });
            backClass = backClass.map((t) => {
                t.taskId = t.taskId || t.sellerId;
                return t;
            });
            let layoutOrder = curpage['layoutOrder'];
            let newUser = curpage['newUser2'];
            if (examine) {
                newUser = "OFF";
                if (layoutOrder && typeof layoutOrder === 'string') {
                    layoutOrder = layoutOrder.replace(/,shopTaskZone|,gifZone|,live/g, "");
                }
            }
            if (layoutOrder && typeof layoutOrder === 'string') {
                layoutOrder = layoutOrder.split(",");
            }
            let page = curpage['page'];
            if (page) {
                if (page.image) {
                    let res = await common.getSystemInfoSync();
                    page.image = common.crossImage(page.image, { width: 750, height: 1690, systemInfo: res });
                }
            }
            let topTask = curpage['topTask'];
            if (topTask && topTask.length) {
                topTask = topTask.filter((t) => {
                    if (t.bizScenario)
                        return t.bizScenario.indexOf(bizScenario) > -1;
                    else
                        return true;
                });
            }
            let { gifZone, flashsaleZone, liveList, brandList } = curpage;
            if (liveList && liveList.length) {
                liveList = liveList.map((t, index) => {
                    t.spmId = `\${spmAPos}.\${spmBPos}.c58535.d120961_${index + 1}`;
                    let { creativeId, sellerId } = t;
                    t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                    return t;
                });
            }
            if (brandList && brandList.length) {
                brandList = brandList.map((t, index) => {
                    t.spmId = `\${spmAPos}.\${spmBPos}.c58536.d120962_${index + 1}`;
                    let { creativeId, sellerId } = t;
                    t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                    return t;
                });
            }
            if (topTask && topTask.length) {
                topTask = topTask.map((t) => {
                    t.spmId = `\${spmAPos}.\${spmBPos}.c58532.d120953`;
                    let { creativeId, sellerId } = t;
                    t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                    return t;
                });
            }
            commit("pageOnLoad", Object.assign(Object.assign({}, curpage), { page,
                examine, layoutOrder: layoutOrder, backClass,
                topTask,
                newUser,
                gifZone,
                flashsaleZone,
                liveList,
                brandList }));
            dispatch('preLoadAction');
            console.timeEnd('time-pageOnNextLoad');
        },
        async preLoadAction({ state, dispatch, commit, getters }) {
            console.log("time", +Date.now());
            my.showLoading({ content: "加载中...", delay: 500 });
            updateMtop({ state, dispatch, commit, getters });
            await getUserId();
            dispatch('$service:preheatRedBagShow');
            let layoutOrder = state.getIn(["layoutOrder"], []);
            let userTaskList = state.getIn(["backClass"], []);
            userTaskList = userTaskList.map((t) => { return t.taskId; });
            userTaskList && userTaskList.length && dispatch('$service:getTaskState', { userTaskList });
            dispatch('$service:getInitiationLimitList');
            if (layoutOrder.indexOf('shopTaskZone') > -1) {
                let shopTaskZone = state.getIn(["shopTaskZone"], []);
                let storeTaskList = shopTaskZone.map((t) => { return t.sellerId; });
                storeTaskList && storeTaskList.length && dispatch('$service:getStoreTaskState', { storeTaskList });
                dispatch('$service:getStoreLimitList');
            }
            if (layoutOrder.indexOf('gifZone') > -1) {
                let activityId = defaultActivityId;
                dispatch('$service:getEntityPrizeList', { activityId });
            }
            my.hideLoading();
        },
        getEntityPrizeList({ state, dispatch, commit, getters }) {
            console.log("time", +Date.now());
            let activityId = defaultActivityId;
            dispatch('$service:getEntityPrizeList', { activityId });
        },
        getTaskState({ state, dispatch, commit, getters }) {
            console.log("time", +Date.now());
            let userTaskList = state.getIn(["backClass"], []);
            userTaskList = userTaskList.map((t) => { return t.taskId; });
            userTaskList && userTaskList.length && dispatch('$service:getTaskState', { userTaskList });
        },
        async updateGoShopList({ state, dispatch, commit, getters }) {
            console.log("time", +Date.now());
            let shopTaskZone = state.getIn(['shopTaskZone'], []);
            let globalData = getApp().globalData;
            shopTaskZone = shopTaskZone.map((item) => {
                let { sellerId } = item;
                let res = globalData.getIn(`goshop-${sellerId || '-'}`);
                item.state = res || item.state || 0;
                return item;
            });
            commit("shopTaskZone", { shopTaskZone: shopTaskZone });
        },
        async updateTaskList({ state, dispatch, commit, getters }) {
            console.log("updateTaskList");
            console.log("time", +Date.now());
            let { globalData } = getApp();
            let taskList2 = [];
            let backClass = state.getIn('backClass', []);
            if (backClass.length == 0) {
                return;
            }
            let getOkTaskList = state.getIn(['$result', 'getTaskState'], []);
            if (getOkTaskList.length == 0) {
                return;
            }
            let getInitiationLimitList = state.getIn(['$result', 'getInitiationLimitList'], []);
            let mtopResult = globalData.mtopResult;
            if (getOkTaskList && getOkTaskList.length) {
                getOkTaskList = getOkTaskList.reduce((p, v) => {
                    let { sellerId: taskId, state } = v;
                    delete v.sellerId;
                    if (taskId)
                        p[taskId] = v;
                    return p;
                }, {});
            }
            else {
                getOkTaskList = {};
            }
            if (getInitiationLimitList && getInitiationLimitList.length) {
                getInitiationLimitList = getInitiationLimitList.reduce((p, v) => {
                    let taskId = v;
                    if (taskId)
                        p[taskId] = { taskId, limit: true };
                    return p;
                }, {});
            }
            else {
                getInitiationLimitList = {};
            }
            if (mtopResult && mtopResult.length) {
                mtopResult = mtopResult.reduce((p, v) => {
                    let { taskId, sellerId } = v;
                    taskId = taskId || sellerId;
                    if (taskId)
                        p[taskId] = v;
                    return p;
                }, {});
            }
            else {
                mtopResult = {};
            }
            backClass = backClass.map((element) => {
                let { taskId, sellerId, taskType } = element;
                element.taskType = taskType || "member";
                taskId = taskId || sellerId;
                element.taskId = taskId;
                let obj = getOkTaskList[taskId];
                if (obj) {
                    element = Object.assign(Object.assign({}, element), obj);
                }
                obj = getInitiationLimitList[taskId];
                if (obj) {
                    element = Object.assign(Object.assign({ limit: true }, element), obj);
                }
                obj = mtopResult[taskId];
                if (obj) {
                    element = Object.assign(Object.assign({}, element), obj);
                }
                return element;
            });
            let completeCount = 0;
            let backClass2 = backClass.filter((t) => {
                if (t.state == 1)
                    completeCount++;
                if ((!t.state) && t.isMember) {
                    return false;
                }
                return true;
            });
            taskList2 = backClass2.filter((t) => {
                if (t.limit)
                    return false;
                return t.state != 1;
            });
            let taskList3 = taskList2.slice(0, 3);
            let app = getApp();
            app.Tracker && app.Tracker.setData("completeTaskCount", completeCount);
            let loadReady = state.getIn(['loadReady']);
            let loading = (!globalData.mtopEnd) || (!loadReady);
            if (taskList3 && taskList3.length) {
                taskList3 = taskList3.map((t, index) => {
                    t.spmId = `\${spmAPos}.\${spmBPos}.c58532.d120952_${index + 1}`;
                    let { creativeId, sellerId } = t;
                    t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                    return t;
                });
            }
            commit("taskList", { completeCount, backClass, taskList2, taskList3, mtopResult, loading, getInitiationLimitList, mtopEnd: globalData.mtopEnd });
            console.log("updateTaskList end");
        } })
});
async function updateMtop({ state, dispatch, commit, getters }) {
    try {
        console.log("time", +Date.now());
        let globalData = getApp().globalData;
        let mtopResult = [];
        globalData.mtopResult = mtopResult;
        globalData.mtopEnd = false;
        let backClass = state.getIn('backClass', []);
        let firstTask = false;
        backClass && backClass.length && backClass.forEach((element, index) => {
            let { taskType } = element;
            taskType = taskType || 'member';
            if (taskType == 'member') {
                common.isMember(element).then((ret) => {
                    console.log("isMember", index, ret);
                    mtopResult.push(ret);
                    if (firstTask == false && ret.isMember) {
                        firstTask = true;
                        dispatch("updateTaskList");
                        console.log("updateMtop firstTask");
                    }
                    else if (mtopResult.length == backClass.length) {
                        globalData.mtopEnd = true;
                        dispatch("updateTaskList");
                        console.log("updateMtop end");
                    }
                });
            }
            else if (taskType == 'follow') {
                common.isFollow(element).then((ret) => {
                    console.log("isFollow", index, ret);
                    mtopResult.push(ret);
                    if (mtopResult.length == backClass.length) {
                        globalData.mtopEnd = true;
                        dispatch("updateTaskList");
                    }
                });
            }
            else {
                mtopResult.push({});
            }
        });
    }
    catch (err) {
        console.warn(err);
    }
}

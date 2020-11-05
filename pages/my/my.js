import tamllshop from "../../services/tmallshop";
import store from './store';
import common from '../../utils/common';
const createPage = function (options) {
    return Page(store.register(options));
};
createPage({
    data: {
        debug: false,
        remove: false
    },
    onLoad(query) {
        let { env } = getApp().globalData;
        if (query) {
            this.setData(Object.assign({ debug: env == 'sit', remove: env == 'sit' }, query));
        }
        else {
            this.setData({ debug: env == 'sit', remove: env == 'sit' });
        }
        this.dispatch("pageOnLoad");
        my.call('addNotifyListener', {
            name: 'NEBULANOTIFY_XLIGHT_TASK_SUCCESS',
            success: (result) => {
                console.log('NEBULANOTIFY_XLIGHT_TASK_SUCCESS success ', result, new Date().getTime());
                my.showToast({ content: "NEBULANOTIFY_XLIGHT_TASK_SUCCESS success " + JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('NEBULANOTIFY_XLIGHT_TASK_SUCCESS fail ', result, new Date().getTime());
                my.showToast({ content: "NEBULANOTIFY_XLIGHT_TASK_SUCCESS fail " + JSON.stringify(result) });
                this.setData({ failMsg: "NEBULANOTIFY_XLIGHT_TASK_SUCCESS  fail " + JSON.stringify(result) + new Date() });
            }
        }, (result) => {
            console.log('NEBULANOTIFY_XLIGHT_TASK_SUCCESS cb ', result, new Date().getTime());
            my.showToast({ content: "NEBULANOTIFY_XLIGHT_TASK_SUCCESS cb " + JSON.stringify(result) });
            this.setData({ notification: JSON.stringify(result) });
        });
    },
    onGetUserInfo() {
        my.call('mtop', {
            apiName: 'mtop.user.getusersimple',
            apiVersion: "1.0",
            success: (result) => {
                console.log('mtop success ', result, new Date().getTime());
                this.setData({ userInfo: JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('mtop fail ', result, new Date().getTime());
                my.showToast({ content: "mtop fail " + JSON.stringify(result) });
            }
        });
        my.call('mtop', {
            apiName: 'mtop.taobao.seattle.memberinfo.get',
            apiVersion: "2.0",
            data: {
                "sellerId": "688187172"
            },
            success: (result) => {
                console.log('mtop success ', result, new Date().getTime());
                this.setData({ memberinfo: JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('mtop fail ', result, new Date().getTime());
                my.showToast({ content: "mtop fail " + JSON.stringify(result) });
            }
        });
    },
    onGoTmall() {
        let obj = tamllshop.goShopTask({
            sellerId: "688187172", appId: "2019081966289614",
            taskUrlType: "miniapp", taskUrl: "",
            exInfo: JSON.stringify({ "autoExit": 1, "notifyParam": { "userId": "688187172", "sellerId": "688187172" } }),
            opType: "com.alipay.adexchange.common.trigger", opParam: JSON.stringify({
                "event": "conversion",
                "contentJson": "1.0|JNiq74uMcTUY1FO99CDopGXGfNYf9atnxjB6LIsEr3mIqIUGnFhOsf7xDYoVjFm0RD6I0IynLKpLN9JzpgHRXfPlm19NEZLeJPyqMzdO7x/3B1WN573+XVSibkN9GzpqfqiO/jkD8IgUROfle+dHH/2KttTiGL6+5DMtkUdRZDtzWaBVwz/0VTB7L2riWqD5G4qdfpAl4+JuGBepuxe4wZLTD8vdBcGZRknTl/LsGQTQ2rXvzJfUoW0vLnhFf9IT2T5ttXV9FsWXmGIcEeozmjVYxeeYEHaXdZIHfoReYY8WFjqt4kUMWWvIY94i7FUbRi3kyFvwNCbirSeJT6fLmGUZh+Vf90nsV8WlNdmuOk859Q16EByBKQ4d/GcWruuqWR7E+4MFop2+1BucVnIdOYINq3gyQYQpDmkutU37pyDsK12h3X3U"
            })
        });
        my.ap.navigateToAlipayPage({
            path: obj.url,
            success: (res) => {
                my.alert({ content: '系统信息' + JSON.stringify(res) });
            },
            fail: (error) => {
                my.alert({ content: '系统信息' + JSON.stringify(error) });
            }
        });
    },
    onMtopTest() {
        my.call('mtop', {
            apiName: 'mtop.koubei.circle.common.item.recommend.list',
            apiVersion: "1.0",
            data: {
                dataSetId: "alipay_tongkaliancheng",
                start: 0,
                pageSize: 10,
                longitude: "120.100124",
                latitude: "30.258762",
                "displayChannel": "ALIPAY_APP"
            },
            success: (result) => {
                console.log('mtop success ', result, new Date().getTime());
                my.showToast({ content: "member success " + JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('mtop fail ', result, new Date().getTime());
            }
        });
    },
    onMtopBindMember() {
        my.call('mtop', {
            apiName: 'mtop.taobao.seattle.member.bind',
            apiVersion: "2.0",
            data: {
                sellerId: "688187172"
            },
            success: (result) => {
                console.log('mtop success ', result, new Date().getTime());
                my.showToast({ content: "member success " + JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('mtop fail ', result, new Date().getTime());
            }
        });
    },
    onShowResult() {
        this.setData({ drawResult: true, awardPrizes: { win: true, prizeName: "测试测试", image: "xx" } });
    },
    onResultClose() {
        this.setData({ drawResult: false });
    },
    onResultClick() {
        this.setData({ drawResult: false });
    },
    onBannerClick() {
        this.setData({ drawResult: false });
    },
    onBannerTap(e) {
        let { currentTarget: { dataset } } = e;
        let { obj } = dataset;
        common.handleNavigate(obj);
    },
    onGoodsTap(e) {
        let { currentTarget: { dataset } } = e;
        let { obj } = dataset;
        common.handleNavigate(obj);
    },
    onClearAll() {
        my.clearStorage();
    },
    onShowTask() {
        this.setData({ showTasklist: true });
    },
    onTaskClose(e) {
        this.setData({ showTasklist: false });
    },
    onGoTask() { },
    onTap() {
        my.pageScrollTo({
            selector: '.brandtopics1',
            success: () => {
                console.log("success");
            }
        });
    }
});

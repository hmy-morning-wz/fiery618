import common from "../../utils/common";
export default {
    actionPereheatRedBagPopup({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'pereheatRedBagPopup'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'pereheatRedBagPopup'], {});
            console.log("pereheatRedBagPopup success", res);
            let redBagDouble = state.getIn(['redBagDouble'], {});
            let currentTask = state.getIn(['currentTask'], {});
            redBagDouble = Object.assign(Object.assign({}, redBagDouble), res);
            let amount = redBagDouble.doubleAmount;
            let progressBar = redBagDouble.progressBar;
            let count = redBagDouble.count;
            if (count && progressBar && amount) {
                let showPopInfo = {
                    isShowPop: true,
                    showPop: "taskPop2",
                    redEnvelopeAmount: amount,
                    taskTotalCount: progressBar,
                    taskCompleteCount: progressBar - (count || 0),
                    logoUrl: currentTask.icon_img
                };
                commit("redBagDouble", { showPopInfo, redBagDouble });
            }
        }
        else {
            my.showToast({ content: "亲，系统开小差了，请稍后再试" });
        }
    },
    actionGetStoreTaskState({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getStoreTaskState'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getStoreTaskState'], {});
            console.log("getStoreTaskState success", res);
            let globalData = getApp().globalData;
            res && res.length && res.forEach((element) => {
                let { sellerId, state } = element;
                if (sellerId && state == 1) {
                    globalData.set(`goshop-${sellerId}`, 2);
                }
            });
            dispatch("updateGoShopList");
        }
    },
    actionGetShareRecordList({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getShareRecordList'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getShareRecordList'], {});
            console.log("getShareRecordList success", res);
            let showPopInfo = {
                isShowPop: true,
                showPop: "share",
                redEnvelopeAmount: res.amountMoney || 0,
                shareList: res.list && res.list.lenght ? (res.list.map((t) => {
                    let { sharedUserId: userName, shareMoney: amount, state: completetStatus } = t;
                    return { userName, amount, completetStatus };
                })) : []
            };
            commit("SHOW_POP_INFO", showPopInfo);
        }
    },
    actionPreheatRedBagShow({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'preheatRedBagShow'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'preheatRedBagShow'], {});
            console.log("preheatRedBagShow success", res);
            let reachMoney = state.getIn(['reachMoney']);
            res.amount = res.amount || 0;
            res.sumAmount = res.sumAmount || 0;
            let count = res.count;
            let app = getApp();
            if (app.Tracker) {
                app.Tracker.setData("redBagAmount", res.amount);
                app.Tracker.setData("redBagSumAmount", res.sumAmount);
            }
            let gifReach = (reachMoney && ((+res.sumAmount) >= +reachMoney)) || false;
            commit("redBag", { redBag: res, gifReach });
            dispatch("actionGetEntityPrizeList");
        }
    },
    actionPreheatRedBagDouble({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'preheatRedBagDouble'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'preheatRedBagDouble'], {});
            console.log("preheatRedBagDouble success", res);
            let redBagDouble = state.getIn(['redBagDouble'], {});
            redBagDouble = Object.assign(Object.assign({}, redBagDouble), res);
            commit("preheatRedBagDouble", { redBagDouble });
        }
    },
    actionPreheatRedBagSend({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'preheatRedBagSend'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'preheatRedBagSend'], {});
            let mysticalGif = state.getIn(['mysticalGif'], {});
            let { amount } = res;
            console.log("preheatRedBagSend success", res);
            let showPopInfo = {
                isShowPop: true,
                showPop: amount ? "redPacket3" : "notWinning",
                redEnvelopeAmount: amount,
                giftTitle: mysticalGif.title,
            };
            commit("SHOW_POP_INFO", showPopInfo);
        }
        else {
            my.showToast({ content: "亲，系统开小差了，请稍后再试" });
        }
    },
    actionGetStoreLimitList({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getStoreLimitList'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getStoreLimitList'], {});
            console.log("getStoreLimitList success", res);
        }
    },
    actionPreheatRedBagRandom({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'preheatRedBagRandom'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'preheatRedBagRandom',], {});
            console.log("preheatRedBagRandom success", res);
            let showPopInfo = {
                isShowPop: true,
                showPop: res.amount ? "award2" : "notWinning",
                awardName: res.amount
            };
            commit("SHOW_POP_INFO", showPopInfo);
            let globalData = getApp().globalData;
            let sellerId = state.getIn(['$loading', 'preheatRedBagRandom', 'request', 'data', 'sellerId'], {});
            if (sellerId) {
                globalData.set(`goshop-${sellerId}`, 2);
                dispatch("updateGoShopList");
            }
        }
    },
    actionPreheatRedBagList({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'preheatRedBagList'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'preheatRedBagList'], []);
            let recordList = res;
            commit("recordList", { recordList });
            console.log("preheatRedBagList success", res);
        }
        else {
            console.log("preheatRedBagList fail");
        }
    },
    actionGetEntityPrizeList({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getEntityPrizeList'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getEntityPrizeList'], []);
            console.log("getEntityPrizeList success", res);
            let gifReach = state.getIn(['gifReach']);
            let gifZone = state.getIn(['gifZone'], []);
            if (gifZone && gifZone.length && res && res.length) {
                gifZone = gifZone.map((item, index) => {
                    item.index = index;
                    return item;
                });
                gifZone = common.mergeArray(gifZone, res, { byKey: 'prizeId' });
                let gifZoneA = gifZone.filter((a) => a.status != 1);
                let gifZoneB = gifZone.filter((a) => a.status == 1);
                gifZone = gifZoneA.concat(gifZoneB);
                let gifZone2 = [];
                gifZone && gifZone.length && gifZone.forEach((element, index) => {
                    let g;
                    let key = parseInt("" + (index / 3));
                    if (index % 3 == 0) {
                        g = [];
                        gifZone2.push(g);
                    }
                    else {
                        g = gifZone2[key];
                    }
                    g.push(element);
                    gifZone2[key] = g;
                });
                let sellerIdList = state.getIn(['sellerIdList'], []);
                let goodsCoupon = state.getIn(['goodsCoupon'], []);
                let flashsaleZone = state.getIn(['flashsaleZone'], []);
                let gifZone3 = [];
                if (sellerIdList && sellerIdList.length) {
                    gifZone3 = sellerIdList.map((item) => {
                        let { sellerId } = item;
                        return Object.assign(Object.assign({}, item), { gifZone: gifZone.filter((t) => t.sellerId == sellerId).map((t, index) => {
                                let { creativeId, sellerId, status } = t;
                                if (status != 1) {
                                    let d = (gifReach ? 'd120958' : 'd120957');
                                    t.spmId = `\${spmAPos}.\${spmBPos}.c58534.${d}_${index + 1}`;
                                    t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                                }
                                else {
                                    delete t.spmId;
                                    delete t.scm;
                                }
                                return t;
                            }), goodsCoupon: goodsCoupon.filter((t) => t.sellerId == sellerId).map((t, index) => {
                                t.spmId = `\${spmAPos}.\${spmBPos}.c58534.d120959_${index + 1}`;
                                let { creativeId, sellerId } = t;
                                t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                                return t;
                            }), flashsaleZone: flashsaleZone.filter((t) => t.sellerId == sellerId).map((t, index) => {
                                t.spmId = `\${spmAPos}.\${spmBPos}.c58534.d120960_${index + 1}`;
                                let { creativeId, sellerId } = t;
                                t.scm = `\${system}.\${subsystem}.creative.${creativeId || '-'}.\${traceId}.${sellerId || '-'}`;
                                return t;
                            }) });
                    });
                }
                commit("gifZone", { gifZone, gifZone2, gifZone3 });
            }
        }
    },
    actionGetEntityPrize({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getEntityPrize'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getEntityPrize'], {});
            console.log("getEntityPrize success", res);
            let { prizeId, picture, winStatus, gameRecordId, sendLastVoucherList } = res;
            let gifZone = state.getIn(['gifZone'], []);
            if (winStatus == 1) {
                let gifs = gifZone.filter((a) => a.prizeId == prizeId);
                let gif = gifs.pop();
                let { title, image } = gif;
                let showPopInfo = {
                    isShowPop: true,
                    showPop: "award1",
                    awardName: title,
                    awardPicUrl: image
                };
                commit("SHOW_POP_INFO", showPopInfo);
            }
            else if (winStatus == 2) {
                let showPopInfo = {
                    isShowPop: true,
                    showPop: sendLastVoucherList && sendLastVoucherList.length ? "inviolableRights" : "notWinning",
                    inviolableRightsList: sendLastVoucherList && sendLastVoucherList.length && sendLastVoucherList.map((t) => {
                        let { prizeName, prizeAmount, url } = t;
                        return {
                            itemId: "",
                            itemTitle: prizeName || prizeAmount,
                            itemIcon: "https://images.allcitygo.com/image/double202011/icon_gift.png?x-oss-process=image/format,webp",
                            isShowBtn: !!url,
                            url,
                            itemDesc: "",
                        };
                    })
                };
                commit("SHOW_POP_INFO", showPopInfo);
            }
            else {
                let showPopInfo = {
                    isShowPop: true,
                    showPop: "notWinning",
                };
                commit("SHOW_POP_INFO", showPopInfo);
            }
        }
    },
    actionAddPrizeAddress({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'addPrizeAddress'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'addPrizeAddress'], {});
            console.log("addPrizeAddress success", res);
            my.showToast({ content: "提交成功" });
            let showPopInfo = {
                isShowPop: false,
            };
            commit("SHOW_POP_INFO", showPopInfo);
        }
    },
    actionGetIndustryVoucher({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'getIndustryVoucher'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'getIndustryVoucher'], {});
            let travelButtonText = state.getIn(['jumpObj', 'buttonText'], '');
            console.log("getIndustryVoucher success", res);
            let { prizeName, prizeAmount } = res;
            let showPopInfo = {
                isShowPop: true,
                showPop: (prizeName || prizeAmount) ? "travelVoucher" : "notWinning",
                travelVoucher: prizeName,
                travelButtonText,
                prizeAmount
            };
            commit("SHOW_POP_INFO", showPopInfo);
        }
    },
    actionSendVoucher({ state, dispatch, commit, getters }) {
        let result = state.getIn(['$loading', 'sendVoucher'], {});
        if ((!result.isLoading) && result.type === 'SUCCESS' && result.code == '20000') {
            let res = state.getIn(['$result', 'sendVoucher'], {});
            console.log("sendVoucher success", res);
            let inviolableRightsList = res && res.list || [];
            if (inviolableRightsList && inviolableRightsList.length) {
                let showPopInfo = {
                    isShowPop: true,
                    showPop: (inviolableRightsList && inviolableRightsList.length) ? "inviolableRights" : "notWinning",
                    inviolableRightsList: inviolableRightsList.map((item) => {
                        let { prizeName, prizeAmount, url } = item;
                        return {
                            itemId: "",
                            itemTitle: prizeName || prizeAmount,
                            itemIcon: "https://images.allcitygo.com/image/double202011/icon_redbag.png?x-oss-process=image/format,webp",
                            isShowBtn: !!url,
                            url,
                            itemDesc: "",
                        };
                    })
                };
                commit("SHOW_POP_INFO", showPopInfo);
            }
            else {
                my.showToast({ content: "任务已做完" });
            }
        }
    },
};

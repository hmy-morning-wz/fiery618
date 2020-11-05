## 国庆+双11 活动 预热
产品原型
https://app.mockplus.cn/app/4PweHfXlz/prototype/os7r5V97-P6
UI  
https://app.mockplus.cn/app/4PweHfXlz/specs/design/XkuUNpsIU
配置json
https://doc.allcitygo.com/pages/viewpage.action?pageId=40305994

接口
http://yapi.unservice.net/project/23/interface/api/cat_596

## 618
https://ls1i4i.axshare.com/
http://yapi.unservice.net/project/23/interface/api/2365


alipays://platformapi/startapp?appId=2019091867543618&page=pages/live-room/live-room&query=userId%3d69226163

测试
 "url":"https://pages.tmall.com/wow/pegasus/test-site/742948/k6ZG97"

生产
https://tarpa.tmall.com/wow/pegasus/subject/tarpa/tr2lx5z2zubi0/10544319

活动结束页面
https://render.alipay.com/p/c/tr-17fufu9ml4ow

### H5跳转直播
https://images.allcitygo.com/miniapp/live.html?sellerId=69226163


### 千叶获得昵称
https://pages.tmall.com/wow/pegasus/test-site/687205/y02468

### sit
{
  "extEnable": true,
  "ext": {
    "env":"sit",
    "appId": "2019121169870354",
    "title":  "支付宝绿色出行日",
    "cityInfo": {
       "cityName":"",
       "cityCode":""
    },
     "url":"https://pages.tmall.com/wow/pegasus/test-site/742948/k6ZG97"
  }
    
}

### prd
{
  "extEnable": true,
  "ext": {
    "env":"prd",
    "appId": "2019121169870354",
    "title":  "支付宝绿色出行日",
    "cityInfo": {
       "cityName":"",
       "cityCode":""
    },
     "url":"https://tarpa.tmall.com/wow/pegasus/subject/tarpa/tr2lx5z2zubi0/10544319"
  }
    
}

# 功能点
## 渠道配置
query里bizScenario字段
和  referrerInfo.extraData里的bizScenario字段



##  搜索入口直接跳转指定页面
投放配置页面地址和开关
>测试搜索
alipays://platformapi/startapp?appId=2019121169870354&query=scene%3D1005

## 跳转直播间
通过?sellerId=xxxx 跳转淘宝小程序直播间
alipays://platformapi/startapp?appId=2019121169870354&page=pages%2Findex%2Findex%3FsellerId%3D69226163&query=bizScenario%3Dtestbannner

## 直接打开页面
通过?url=xxxx 跳转知道页面
alipays://platformapi/startapp?appId=2019121169870354&page=pages%2Fwebview%2Fwebview%3Furl%3Dhttps%3A%2F%2Fmain.m.taobao.com%2F&query=bizScenario%3Dtestbannner


## 直播插件
"plugins": {
    "livePlugin": {
      "version": "*",
      "provider": "2021001127628117"
    }
  },


插件对接文档：https://www.yuque.com/u582158/kb/zn8mi6
插件订购链接（白名单开放，请勿外传） https://fw.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=AM010401000000052645
# 直播卡片插件使用文档

<a name="c1b697da"></a>
#### 1、app.json声明插件引用

```
{
  ...
  "plugins": {
    "myPlugin": {
      "version": "*", 
      "provider": "2021001127628117"
    }
  }
}
```

<a name="3995a3b2"></a>
#### 2、页面.json文件插件组件注册

```
{
  "usingComponents": {
    "tblive-card": "plugin://myPlugin/tblive-card"
  }
}
```

<a name="e8ff8779"></a>
#### 3、插件组件sellerId「userId」、path传参

```
<tblive-card sellerId="{{2114*****}}" path="/index/index" />
```

参数解释：

- sellerId：number类型，商家id，也是淘宝id，如上`2114*****`是商家id
- path：string类型，当前使用插件的小程序的页面path，订阅提醒成功后，「服务通知」的消息提醒点击后会跳转到设置的path小程序地址，PS**：**path="/index/index"仅为参考，以自己小程序里的app.json pages字段声明为准
- disableLivePre：boolean类型，预告状态下的直播不展示
- disableLiveing：boolean类型，直播状态下的直播不展示
- disableLiveBack：boolean类型，回放状态下的直播不展示





## 跳转天猫轻店
     tamllshop.goShopTask({
            sellerId:"688187172", appId:"2019041063857386", 
            exInfo:JSON.stringify({ "autoExit": 1, "notifyParam" : {"userId": "xxx","sellerId":"yyy" } }), 
            opType:"com.alipay.adexchange.common.trigger", opParam:JSON.stringify({
              "event": "conversion",
              "contentJson": "1.0|JNiq74uMcTUY1FO99CDopGXGfNYf9atnxjB6LIsEr3mIqIUGnFhOsf7xDYoVjFm0RD6I0IynLKpLN9JzpgHRXfPlm19NEZLeJPyqMzdO7x/3B1WN573+XVSibkN9GzpqfqiO/jkD8IgUROfle+dHH/2KttTiGL6+5DMtkUdRZDtzWaBVwz/0VTB7L2riWqD5G4qdfpAl4+JuGBepuxe4wZLTD8vdBcGZRknTl/LsGQTQ2rXvzJfUoW0vLnhFf9IT2T5ttXV9FsWXmGIcEeozmjVYxeeYEHaXdZIHfoReYY8WFjqt4kUMWWvIY94i7FUbRi3kyFvwNCbirSeJT6fLmGUZh+Vf90nsV8WlNdmuOk859Q16EByBKQ4d/GcWruuqWR7E+4MFop2+1BucVnIdOYINq3gyQYQpDmkutU37pyDsK12h3X3U"})})
   
   
   
    let url = `alipays://platformapi/startapp?appId=${appId}&page=${encodeURIComponent(`plugin-private://2021000196667377/pages/index/index?${(`source=QDmember&sellerId=${sellerId}&extraInfo=${encodeURIComponent(`{"QDSource":"AlipayAd","Client":"Alipay"}`)}`)}`)}&query=${encodeURIComponent(`source=AlipayAd&behavior=notify&exInfo=${encodeURIComponent(`${exInfo}`)}&opType=${opType}&opParam =${encodeURIComponent(`${opParam}`)}`)}`
  

## 单元测试
### jest
  "devDependencies": {
    "@types/jest": "^25.2.1",
    "@types/mocha": "^7.0.2",
    "jest": "^26.0.1",
    "less": "^3.11.1",
    "ts-jest": "^25.5.1",
    "typescript": "^3.8.3"
  },  
### ts-mocha  
>remember to install mocha if you don't have it already (npm i -D mocha)  
npm i -D ts-mocha
>install recent Mocha and Expect @types packages for best DX
npm i -D @types/mocha @types/expect  

  "devDependencies": {
    "@types/expect": "^24.3.0",
    "@types/mocha": "^7.0.2",
    "mocha": "^7.2.0",
    "ts-mocha": "^7.0.0",
    "typescript": "^3.9.3"
  }


 ### mtop
 /*
       my.call('mtop', {
            apiName: 'mtop.user.getusersimple', 
            apiVersion:"1.0",
                       
            success: (result:any) => { 
             console.log('mtop success ', result, new Date().getTime());
          },
          fail:(result:any)=>{
              console.log('mtop fail ', result, new Date().getTime());
          }
          })
*/
/*
     my.call('mtop', {
            apiName: 'mtop.taobao.seattle.memberinfo.get', 
            apiVersion:"2.0",
            data:{
              "sellerId":"92686194"
            },           
            success: (result:any) => { 
             console.log('mtop success ', result, new Date().getTime());
          },
          fail:(result:any)=>{
              console.log('mtop fail ', result, new Date().getTime());
          }
          })
*/ 

### 
https://images.allcitygo.com/miniapp/follow.html?code=SUCCESS&tbid={userNumId}&nickname={nick}&sellerId={sellerId}&taskId={taskId}&userId={userId}
https://images.allcitygo.com/miniapp/bind.html?code=SUCCESS&tbid={userNumId}&nickname={nick}&sellerId={sellerId}&taskId={taskId}&userId={userId}
https://pages.tmall.com/wow/pegasus/test-site/687205/y02468?sellerId=xxxxxx

生产
https://tarpa.tmall.com/wow/pegasus/subject/tarpa/tr2lx5z2zubi0/10544319?followId=1234



淘宝关注页面
https://h5.m.taobao.com/smart-interaction/follow.html?type=tb&id=424353450&back=encodeURIComponent(https://images.allcitygo.com/miniapp/follow.html?followedId=424353450)


清缓存
alipays://platformapi/startapp?appId=2019121169870354&page=pages%2fmy%2fmy%3fremove%3d1



百草味 2021001127634133 
宝洁 2019081966289614 
MAOGEPING毛戈平 2021001164602172 
百雀羚 2021001140642873 
三生花 2021001135666988



## 生活圈mtop 接口
/**
{
   "__eagleeye_traceid__": "0b144cb915929015998671309e3c3b",
    "api": "mtop.koubei.circle.common.item.recommend.list",
    "data": {
        "data": {
            "data": [
                {
                    "aoiInfo": {
                        "aoiId": "2e06e40294b7ad8edc538fdf0eeeb545",
                        "aoiName": "杭州西湖风景名胜区",
                        "aoiTag": "杭州西湖风景名胜区",
                        "tribeId": ""
                    },
                    "discount": "8.8",
                    "itemCover": "https://img.alicdn.com/i3/2200798399739/O1CN010tXj4x2LoVtIPiN03_!!2200798399739-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D619820716072%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "619820716072",
                    "itemLabel": "新品",
                    "itemName": "【618秒杀】荠菜鲜肉馄饨",
                    "itemStoreDTO": {
                        "brandName": "如意馄饨",
                        "categoryName": "美食,快餐小吃,地方特色小吃",
                        "storeAddress": "外东山弄86号 东山农贸市场61号摊位",
                        "storeId": "238152410",
                        "storeLogo": "https://img.alicdn.com/i2/2200798399739/O1CN0100H81Y2LoVqPQA9HY_!!2200798399739-0-koubei.jpg",
                        "storeName": "如意馄饨(东山弄店)"
                    },
                    "originalPrice": "16",
                    "salesInfo": "已售1.4万份",
                    "savedMoney": "2",
                    "savedMoneyInfo": "节省2元",
                    "sellPrice": "14",
                    "soldQuantity": "14022",
                    "storeId": "238152410"
                },
                {
                    "aoiInfo": {
                        "aoiId": "2e06e40294b7ad8edc538fdf0eeeb545",
                        "aoiName": "杭州西湖风景名胜区",
                        "aoiTag": "杭州西湖风景名胜区",
                        "tribeId": ""
                    },
                    "discount": "8.5",
                    "itemCover": "https://img.alicdn.com/i3/2200789490293/O1CN01RpwT9K1E2EZ1U1Fue_!!2200789490293-2-koubei.png",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D594279018219%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "594279018219",
                    "itemLabel": "",
                    "itemName": "精品蓝莓一盒（125g）",
                    "itemStoreDTO": {
                        "brandName": "舒婷果业",
                        "categoryName": "美食,水果",
                        "storeAddress": "外东山弄32幢1楼",
                        "storeId": "223612437",
                        "storeLogo": "https://img.alicdn.com/i1/2200789490293/O1CN01j4bkE21E2EaIufpz6_!!2200789490293-0-koubei.jpg",
                        "storeName": "舒婷果业(东山弄店)"
                    },
                    "originalPrice": "10",
                    "salesInfo": "已售4174份",
                    "savedMoney": "1.5",
                    "savedMoneyInfo": "节省1.5元",
                    "sellPrice": "8.5",
                    "soldQuantity": "4174",
                    "storeId": "223612437"
                },
                {
                    "aoiInfo": {
                        "aoiId": "69a8c0ad3c500ee9ec6f878f94d6b3b1",
                        "aoiName": "印象城西溪店",
                        "aoiTag": "印象城西溪店",
                        "tribeId": "20200409880000000000000001975065"
                    },
                    "discount": "9.5",
                    "itemCover": "https://img.alicdn.com/i4/2200796739415/O1CN01dCTLpM2JQ7YsxL5kM_!!2200796739415-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D601761600551%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "601761600551",
                    "itemLabel": "爆品",
                    "itemName": "【618五折】100元代金券【请提前加入购物车抢购】",
                    "itemStoreDTO": {
                        "brandName": "川城印象",
                        "categoryName": "美食,中餐,川菜",
                        "storeAddress": "访溪路1号西溪印象城2楼",
                        "storeId": "226984298",
                        "storeLogo": "https://img.alicdn.com/i3/2200796739415/O1CN014cyoYX2JQ7TTYAfii_!!2200796739415-0-koubei.jpg",
                        "storeName": "川城(西溪印象城店)"
                    },
                    "originalPrice": "100",
                    "salesInfo": "已售1.0万份",
                    "savedMoney": "5",
                    "savedMoneyInfo": "节省5元",
                    "sellPrice": "95",
                    "soldQuantity": "10605",
                    "storeId": "226984298"
                },
                {
                    "aoiInfo": {
                        "aoiId": "57d7799f017817e0bd31a39b9d163b64",
                        "aoiName": "嘉绿景苑东西园",
                        "aoiTag": "浙江省莲花街,距办公园区1.3km",
                        "tribeId": "20200320880000000000000001955069"
                    },
                    "discount": "0.9",
                    "itemCover": "https://img.alicdn.com/i2/2200799312615/O1CN01f2MfUS1VBiJnhksFi_!!2200799312615-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D619231971834%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "619231971834",
                    "itemLabel": "",
                    "itemName": "[新客专享]奢养放松舒缓SPA套餐(4选1）",
                    "itemStoreDTO": {
                        "brandName": "克丽缇娜",
                        "categoryName": "美发/美容/美甲,SPA/美容/美体",
                        "storeAddress": "莲花街314号-320号",
                        "storeId": "309369282",
                        "storeLogo": "https://img.alicdn.com/i3/2200799312615/O1CN01KBphPW1VBiJLTT1z0_!!2200799312615-0-koubei.jpg",
                        "storeName": "克丽缇娜(莲花街门店)"
                    },
                    "originalPrice": "698",
                    "salesInfo": "已售7152份",
                    "savedMoney": "636.2",
                    "savedMoneyInfo": "节省636.2元",
                    "sellPrice": "61.8",
                    "soldQuantity": "7152",
                    "storeId": "309369282"
                },
                {
                    "aoiInfo": {
                        "aoiId": "9c46ddda523030614c65e04ad433fd3c",
                        "aoiName": "湖滨步行街",
                        "aoiTag": "湖滨步行街",
                        "tribeId": "20200527880000000000000003685023"
                    },
                    "discount": "6.3",
                    "itemCover": "https://img.alicdn.com/i3/2200799366346/O1CN01cJhXyK1wkW2BTbxwp_!!2200799366346-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D608427084455%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "608427084455",
                    "itemLabel": "",
                    "itemName": "3份【次卡】加料（不可单点）",
                    "itemStoreDTO": {
                        "brandName": "满记甜品",
                        "categoryName": "美食,休闲茶饮,饮品/甜点",
                        "storeAddress": "邮电路98号",
                        "storeId": "219573480",
                        "storeLogo": "https://img.alicdn.com/i2/2200799366346/O1CN01QTu0LQ1wkVwr3wgnj_!!2200799366346-0-koubei.jpg",
                        "storeName": "满记甜品(杭州湖滨店)"
                    },
                    "originalPrice": "30",
                    "salesInfo": "已售7397份",
                    "savedMoney": "11",
                    "savedMoneyInfo": "节省11元",
                    "sellPrice": "19",
                    "soldQuantity": "7397",
                    "storeId": "219573480"
                },
                {
                    "aoiInfo": {
                        "aoiId": "9c46ddda523030614c65e04ad433fd3c",
                        "aoiName": "湖滨步行街",
                        "aoiTag": "湖滨步行街",
                        "tribeId": "20200527880000000000000003685023"
                    },
                    "discount": "0.3",
                    "itemCover": "https://img.alicdn.com/i2/2200796059561/O1CN01pxWGAL2KUzMKKIw8p_!!2200796059561-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D616412460346%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "616412460346",
                    "itemLabel": "爆品",
                    "itemName": "【必抢】30元超值代金券",
                    "itemStoreDTO": {
                        "brandName": "小肥羊",
                        "categoryName": "美食,火锅,豆捞",
                        "storeAddress": "延安路255号湖滨银泰in77B区龙翔里2好楼104",
                        "storeId": "220176460",
                        "storeLogo": "https://img.alicdn.com/i4/2200796059561/O1CN019gTDjF2KUzIf3Icsv_!!2200796059561-0-koubei.jpg",
                        "storeName": "小肥羊(杭州湖滨银泰店)"
                    },
                    "originalPrice": "30",
                    "salesInfo": "已售6621份",
                    "savedMoney": "29",
                    "savedMoneyInfo": "节省29元",
                    "sellPrice": "1",
                    "soldQuantity": "6621",
                    "storeId": "220176460"
                },
                {
                    "aoiInfo": {
                        "aoiId": "0cd58490dbacf9b5ec07a8574dd030aa",
                        "aoiName": "城西银泰城",
                        "aoiTag": "城西银泰城",
                        "tribeId": "20200331880000000000000001855026"
                    },
                    "discount": "6.0",
                    "itemCover": "https://img.alicdn.com/i1/2200798920387/O1CN01qzEjAU1EjHsitwG2a_!!2200798920387-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D619738005282%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "619738005282",
                    "itemLabel": "新品",
                    "itemName": "50枚神采飞扬币",
                    "itemStoreDTO": {
                        "brandName": "木马王国",
                        "categoryName": "亲子,亲子游乐,儿童乐园",
                        "storeAddress": "萍水西街银泰城2F",
                        "storeId": "222987253",
                        "storeLogo": "https://img.alicdn.com/i3/2200798920387/O1CN01SBYc011EjHnDSjVov_!!2200798920387-0-koubei.jpg",
                        "storeName": "木马王国(城西银泰店)"
                    },
                    "originalPrice": "50",
                    "salesInfo": "已售2927份",
                    "savedMoney": "20.1",
                    "savedMoneyInfo": "节省20.1元",
                    "sellPrice": "29.9",
                    "soldQuantity": "2927",
                    "storeId": "222987253"
                },
                {
                    "aoiInfo": {
                        "aoiId": "69a8c0ad3c500ee9ec6f878f94d6b3b1",
                        "aoiName": "印象城西溪店",
                        "aoiTag": "印象城西溪店",
                        "tribeId": "20200409880000000000000001975065"
                    },
                    "discount": "8.0",
                    "itemCover": "https://img.alicdn.com/i4/2200789590187/O1CN01c6tyEX1DFgejp5E0W_!!2200789590187-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D594180293338%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "594180293338",
                    "itemLabel": "",
                    "itemName": "鸭脖(甜辣味）（154g）",
                    "itemStoreDTO": {
                        "brandName": "良品铺子",
                        "categoryName": "美食,休闲食品,零食",
                        "storeAddress": "五常大道1号西溪印象城商场",
                        "storeId": "239627415",
                        "storeLogo": "https://img.alicdn.com/i1/2200789590187/O1CN01DvcNdC1DFgZvY682t_!!2200789590187-0-koubei.jpg",
                        "storeName": "良品铺子(杭州西溪印象城店)"
                    },
                    "originalPrice": "14.9",
                    "salesInfo": "已售2.7万份",
                    "savedMoney": "3",
                    "savedMoneyInfo": "节省3元",
                    "sellPrice": "11.9",
                    "soldQuantity": "27976",
                    "storeId": "239627415"
                },
                {
                    "aoiInfo": {
                        "aoiId": "0cd58490dbacf9b5ec07a8574dd030aa",
                        "aoiName": "城西银泰城",
                        "aoiTag": "城西银泰城",
                        "tribeId": "20200331880000000000000001855026"
                    },
                    "discount": "3.0",
                    "itemCover": "https://img.alicdn.com/i1/2200789362522/O1CN01rZNBUm1UV7TjnMDnz_!!2200789362522-0-koubei.jpg",
                    "itemDetailUrl": "alipays://platformapi/startapp?appId=77700272&startMultApp=YES&query=itemId%3D608678328607%26channel%3DALL%26sourceFrom%3DITEM_DETAIL_BASE_INFO&url=%2Findex.html%23pages%2Findex%2Findex&chInfo=ch_tribeopen__chsub_tklc",
                    "itemId": "608678328607",
                    "itemLabel": "",
                    "itemName": "【年中特惠】2-3人餐",
                    "itemStoreDTO": {
                        "brandName": "其它品牌",
                        "categoryName": "美食,烧烤,铁板烧",
                        "storeAddress": "萍水街城西银泰城B134",
                        "storeId": "220545321",
                        "storeLogo": "https://img.alicdn.com/i2/2200789362522/O1CN01GCIOHX1UV7PnHikFE_!!2200789362522-0-koubei.jpg",
                        "storeName": "喜多有约(城西银泰店)"
                    },
                    "originalPrice": "554",
                    "salesInfo": "已售3927份",
                    "savedMoney": "386",
                    "savedMoneyInfo": "节省386元",
                    "sellPrice": "168",
                    "soldQuantity": "3927",
                    "storeId": "220545321"
                }
            ],
            "hasMore": "true",
            "nextStart": "10",
            "pageSize": "10"
        },
        "result": "true",
        "traceId": "0b144cb915929015998671309e3c3b"
    },
    "ret": [
        "SUCCESS::调用成功"
    ],
    "v": "1.0"
} 
     */
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
                console.log('mtop success ', result, new Date().getTime(),JSON.stringify(result));
                my.showToast({ content: "member success " + JSON.stringify(result) });
            },
            fail: (result) => {
                console.log('mtop fail ', result, new Date().getTime());
            }
        });
    },



###  SPMID
https://www.yuque.com/docs/share/3098481b-496f-4611-8da7-3b1b965e3ae3?#91Lx
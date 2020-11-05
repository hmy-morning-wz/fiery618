# 数据定义
## 红包列表  red packet list
  > 红包位置(第几格)  position   
    红包类型 type   
    抽奖活动id, drawId   
    提示文案 text   
    红包图案 image   
    奖励概率 probability   

"redPacketList":[{
  "position":"红包位置(第几格)",
  "type":"红包类型",
  "drawId":"抽奖活动id",
  "text":"提示文案",
  "image":"红包图案",
  "probability":"奖励概率"
}]

## 场景列表 scene list
  >   背景图片 image

"sceneList" = [{"image":"背景图片"}]
## 街景店铺列表 street shop list
  >  店铺类型 type  话题 到店 直播   
  店铺图标 image   
  店铺宣传语 text  
  店铺商家id sellerId   
  店铺位置  position   
  店铺跳转地址  path   
  店铺跳转类型  type   

"streetShopList" = [{
  "type":"店铺类型",
  "image":"店铺图标",
  "text":"店铺宣传语",
  "sellerId":"店铺商家id",
  "position":"店铺位置",
  "path":"店铺跳转地址",
  "type":"店铺跳转类型",
  }]

## 首页板块顺序 layout order
 "layoutOrder"="首页板块顺序"
## 直播板块标题  live title
 "liveTitle"="直播板块标题"
## 直播列表   live list
  >    直播sellerId 
       直播间名称 name

   "liveList"= [{"sellerId ":"背景图片","name":"直播间名称"}]
## 话题板块标题   topic title 
 "topicTitle"="话题板块标题"
## 品牌话题列表 topic list
  >  话题热度初始值 init hot value  
     话题id标识 topicId  
     话题图片 image  
     品牌列表 brand list   

     "topicList"= [{
       "initHotValue":"话题热度初始值",
       "topicId":"话题id标识",
       "topicId":"话题图片",
       "brandList":"品牌列表"
        }]
## 话题聚合页面 topic page
  > 页面背景图片 image 
    海景房Id列表  brand list 
    商品ID列表  goodsId 

     "topicPage"= [{
       "image":"页面背景图片",
       "brandList":"海景房Id列表",
       "goodsId":"商品ID列表"      
        }]
## 品牌列表 brand list
  >  商家sellerId   
     店铺名称 name 
     店铺图片 image 
     店铺logo logo 
     营销文字 text   

      "brandList"= [{
       "sellerId":"商家sellerId",
       "name":"店铺名称",
       "logo":"店铺logo",
       "text":"营销文字"      
        }]    
## 商品列表 goodsList
   > 商家id sellerId  
     商品id goodsId 
     商品名称 name 
     商品图片 image 
    营销文字 text   

 "goodsList"= [{
       "sellerId":"商家sellerId",
       "goodsId":"商品id",
       "name":"商品名称",
        "image":"商品图片",
       "text":"营销文字"      
        }]    

  ~~~
  {
  "redPacketList": [
    {
      "position": "红包位置(第几格)",
      "type": "红包类型",
      "drawId": "抽奖活动id",
      "text": "提示文案",
      "image": "红包图案",
      "probability": "奖励概率"
    }
  ],
  "sceneList": [
    {
      "name":"场景名称",
      "image": "背景图片"
    }
  ],
  "streetShopList": [
    {
      "type": "店铺类型",
      "image": "店铺图标",
      "text": "店铺宣传语",
      "sellerId": "店铺商家id",
      "position": "店铺位置",
      "url_path": "店铺跳转地址",
      "url_type": "店铺跳转类型"
    }
  ],
  "layoutOrder": "首页板块顺序",
  "liveTitle": "直播板块标题",
  "liveList": [
    {
      "sellerId ": "背景图片",
      "name": "直播间名称"
    }
  ],
  "topicTitle": "话题板块标题",
  "topicList": [
    {
      "initHotValue": "话题热度初始值",
      "topicId": "话题id标识",
      "image": "话题图片",
      "brandList": "品牌列表"
    }
  ],
  "topicPage": [
    {
      "image": "页面背景图片",
      "brandList": "海景房Id列表",
      "goodsId": "商品ID列表"
    }
  ],
  "brandList": [
    {
      "sellerId": "商家sellerId",
      "name": "店铺名称",
      "logo": "店铺logo",
      "text": "营销文字"
    }
  ],
  "goodsList": [
    {
      "sellerId": "商家sellerId",
      "goodsId": "商品id",
      "name": "商品名称",
      "image": "商品图片",
      "text": "营销文字"
    }
  ]
}
~~~





{
  "auditminiapp":"(审核版本)2.1.0",
  "newUser":"(*新手任务开关)ON",
  "newUserDrawId":"(*新手任务抽奖ID)9999",
  "newUser2":"(*新版新手任务开关)ON",
  "newUserDrawId2":"(*新版新手任务抽奖ID)9999", 
  "whiteList":"(白名单)2088302313827690,2088302313827691",
  "newUserInfo":[{
    "bizScenario":"(渠道)default",
    "image":"(新手任务背景图片)https://images.allcitygo.com/miniapp/202006/new_userbg1.png",
    "newUserDrawBt":"(新手任务按钮图片)https://images.allcitygo.com/miniapp/202006/buttonbig1.png",
     "closeShow":"(显示关闭按钮)ON",
     "_remark":"新手任务弹框背景"	
  }],
  "myPrizeType":"h5",
  "activityDate": "(活动日期)4月10日-4月30日",
  "activityTheme": "",
  "redPacketList2":[
     {
      "position": "(排序)1",
      "type": "(*类型)startup_packet",
      "drawId": "(*奖池id)1",
      "text": "(说明)出行红包",
      "image": "(图标)/images/icon1.png",
      "_remark":"老虎机红包列表"	  
    },
      {
      "position": "2",
      "type": "startup_packet",
      "drawId": "1",
      "text": "出行红包",
      "image": "/images/icon1.png"     
    },  {
      "position": "3",
      "type": "startup_packet",
      "drawId": "1",
      "text": "出行红包",
      "image": "/images/icon1.png"     
    }
  ],
  "redPacketList": [
    {
      "position": "(*排序)1",
      "type": "(*类型)startup_packet",
      "drawId": "(*奖池id)1",
      "text": "(说明)出行红包",
      "image": "(*图标)/images/icon1.png",
      "probability": "",
      "_remark":"红包列表"	  

    },
    {
      "position": "2",
      "type": "reward",
      "drawId": "抽奖活动id",
      "text": "增加概率",
      "image": "/images/icon1.png",
      "probability": "5%"
    },
    {
      "position": "3",
      "type": "redpacket",
      "drawId": "抽奖活动id",
      "text": "店铺优惠券",
      "image": "/images/icon1.png",
      "probability": ""
    },
    {
      "position": "4",
      "type": "redpacket",
      "drawId": "抽奖活动id",
      "text": "店铺优惠券",
      "image": "/images/icon1.png",
      "probability": ""
    },
    {
      "position": "5",
      "type": "redpacket",
      "drawId": "抽奖活动id",
      "text": "店铺优惠券",
      "image": "/images/icon1.png",
      "probability": ""
    },
    {
      "position": "6",
      "type": "bigpacket",
      "drawId": "抽奖活动id",
      "text": "抽华为手机",
      "image": "/images/phone.png",
      "probability": ""
    }
  ],
  "sceneList2": [
     {
      "name": "第一个场景标题",
     "image": "(*背景)",
      "_remark":"老虎机场景背景"	  
    }
  ],
  "sceneList": [
     {
      "name": "第一个场景标题",
     "image": "(*背景)",
      "_remark":"场景背景"	  
    }
  ],
  "streetShopList": [
    {
      "type": "(*类型)shop",
      "image": "(*LOGO)",
      "text": "(宣传语)店铺宣传语",
      "sellerId": "(店铺商家id)店铺商家id",
      "position": "1",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""	  ,
      "_remark":"街景商铺列表"	  
    },
    {
      "type": "topic",
      "image": "",
      "text": "店铺宣传语",
      "sellerId": "1234",
      "position": "2",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "type": "topic",
      "image": "",
      "text": "店铺宣传语",
      "sellerId": "12345",
      "position": "3",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "type": "shop",
      "image": "",
      "text": "店铺宣传语",
      "sellerId": "店铺商家id",
      "position": "4",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "type": "live",
      "image": "",
      "text": "店铺宣传语",
      "sellerId": "69226163",
      "position": "5",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "type": "shop",
      "image": "",
      "text": "店铺宣传语",
      "sellerId": "店铺商家id",
      "position": "6",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    }
  ],
  "taskTitle":"(*任务列表大标题)任务列表大标题",
  "backClass": [
      { 
      "shopType":"(店铺类型)miniapp",
      "shopAppId":"(*轻店appId)2019081966289614",
      "sellerId": "(*商家sellerId)688187172",
      "icon_img": "(商家图片)https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "(任务类型)shop",
      "name": "(*任务名称)八马\n测试",
      "text1":"(任务副标题)副标题",
      "drawNum":"(奖励次数)1",
      "bizScenario":"(渠道)不配默认展示，渠道匹配展示",
      "id": "(id)688187172",
      "taskUrlType":"(*任务跳转类型)h5",
      "taskUrl": "(*任务跳转地址)https://www.taobao.com"	  ,
      "_remark":"任务列表"	  
    },
    { 
      "shopType":"miniapp",
      "shopAppId":"2019081966289614",
      "sellerId": "92686194",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "member",
      "name": "飞利浦",
       "text1":"副标题",
      "id": "92686194",
      "taskUrlType":"miniapp",
      "taskUrl": ""
    },
     { 
      "shopType":"miniapp",
      "shopAppId":"2019081966289614",
      "sellerId": "2424298091",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "member",
      "name": "2424298091",
       "text1":"副标题",
      "id": "2424298091",
      "taskUrlType":"miniapp",
      "taskUrl": ""
    },
    {

      "shopAppId":"2019081966289614",
      "shopType":"miniapp",
      "sellerId": "2424298091",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "follow",
      "name": "follow(关注任务1)",
      "id": "2424298091",
       "text1":"副标题",
      "taskUrlType":"h5",
      "taskUrl": ""
    },
    {

      "sellerId": "217101303",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",

      "taskType": "member",
      "name": "宝洁官方旗舰店(关注任务2)",
      "text1":"副标题",
      "notice": "完成入会获得奖励",
      "id": "217101303",
      "taskUrlType":"h5",
      "taskUrl": ""
    },
    {

      "sellerId": "628189716",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "shop",
      "name": "百草味旗舰店(关注任务3)",
       "text1":"副标题",
      "id": "628189716",
      "taskUrlType":"h5",
      "taskUrl": "https://www.taobao.com"
    },
    {
      "sellerId": "1637212566",
      "icon_img": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "taskType": "shop",
      "notice": "完成入会获得奖励",
      "name": "alipays(测试)",
      "text1":"副标题",
      "id": "1637212566",
      "taskUrlType":"alipays",
      "taskUrl": "alipays://platformapi/startapp?appId=20000160"
    }
  ],
  "ruleText": "(*规则)1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/n1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；\n2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；\n3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。\n（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋\n（3）测试规则文字较长情况XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "layoutOrder": "(*首页板块排序),game,l_ive,b_anner,brandtopics",
  "banner":{
    "image": "(*图片)https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
    "url_type":"selfWebview",
    "url_path":"https://www.taobao.com",
    "url_data":"",
    "url_remark":"",
	"_remark":"广告"
  },
  "liveTitle": "(*直播板块标题)直播板块标题",
  "liveTitle2": "(*直播板块副标题)直播板块副标题",
  "liveList": [
    {
      "sellerId": "(*sellerId)69226163",
      "name": "(直播间名称)直播间名称",
      "_remark":"直播间"	  
    },
     {
      "sellerId": "69226163",
      "name": "直播间名称"
    }
  ],
  "topicTitle": "(话题板块标题)话题板块标题",
  "topicTitle2": "(话题板块副标题)话题板块副标题",
  "topicList": [
    {
      "topicId": "(*话题topicId)1234",
      "name":"(*话题名称)#夏天还只穿防晒衣？",
      "goodsList": "(*商品列表)2000001,2000002,2000003,2000004,2000005,2000006",
      "_remark":"首页话题列表"	  
    },
     {
      "topicId": "12345",
      "name":"#谁说带娃不能逛吃逛吃？",  
      "goodsList": "2000001,2000002,2000003"
    },    
     {
      "topicId": "123456",
      "name":"#谁说带娃不能逛吃逛吃？",
      "goodsList": "2000001,2000002,2000003,2000004"
    }
  ],
  "topicPageLayoutOrder":"(话题二级页面板块),goodsList,brandList",
  "topicPage": [
    {
      "initHotValue": "(*热度初始值)9999",
      "topicId": "(*话题topicId)1234",
      "image":"(*图片)https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",    
      "brandList": "(*品牌列表)100001,100002,100003,100004,100005,100006",
      "goodsId": "(*商品列表)2000001,2000003,2000004,2000002,2000005,2000006",
      "goodsMainTitle": "(*商品区标题)商品区",
      "goodsSubTitle": "(*商品区副标题)啦啦啦啦啦",
      "brandMainTitle": "(*海景房标题)海景房",
      "brandSubTitle": "(*海景房副标题)啦啦啦啦",
      "showBrand": "(*海景房开关)是",
      "showGoods": "(*商品区开关)是",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":"",
      "_remark":"二级话题页面"	  
    },
     {
      "initHotValue": "9999",
      "topicId": "12345",
      "image":"https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",    
      "brandList": "100001,100002",
      "goodsId": "2000001,2000003",
      "goodsMainTitle": "商品区",
      "goodsSubTitle": "啦啦啦啦啦",
      "brandMainTitle": "海景房",
      "brandSubTitle": "啦啦啦啦",
      "showBrand": "是",
      "showGoods": "否",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
     {
      "initHotValue": "9999",
      "topicId": "12346",
      "image":"https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",    
      "brandList": "100001,100002",
      "goodsId": "2000001,2000003",
      "goodsMainTitle": "商品区",
      "goodsSubTitle": "啦啦啦啦啦",
      "brandMainTitle": "海景房",
      "brandSubTitle": "啦啦啦啦",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":"",
      "showBrand": "否",
      "showGoods": "是"
    }
  ],
  "brandList": [
    {
      "sellerId": "(*sellerId)100001",
      "name": "(*店铺名称)店铺名称1",
      "text":"(*文案)",
      "image": "(*图片)https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":"",
      "_remark":"品牌列表"	  
    },
     {
      "sellerId": "100002",
      "name": "店铺名称2",
      "text":"",
      "image": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "sellerId": "100003",
      "name": "店铺名称1",
      "image": "https://images.allcitygo.com/20200521174120746iQfel7.PNG",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
     {
      "sellerId": "100004",
      "name": "店铺名称2",
      "image": "https://images.allcitygo.com/20200521174120746iQfel7.PNG",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
    {
      "sellerId": "100005",
      "name": "店铺名称1",
      "image": "https://images.allcitygo.com/20200521174120746iQfel7.PNG",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },
     {
      "sellerId": "100006",
      "name": "店铺名称2",
      "image": "https://images.allcitygo.com/20200521174120746iQfel7.PNG",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    }
  ],
  "goodsList": [
    {
      "sellerId": "(*商家sellerId)100001",
      "goodsId": "(*商品goodsId)2000001",
      "name": "(*商品名称)商品名称1",     
      "image": "(*图片)https://images.allcitygo.com/202005211832591828qAFUv.PNG",
      "text": "(营销文字)营销文字",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":"",
      "_remark":"商品列表"	  
    },{
      "sellerId": "100001",
      "goodsId": "2000002",
      "name": "商品名称2",       
      "image":"https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "text": "营销文字",
      "link": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },{
      "sellerId": "100001",
      "goodsId": "2000003",
      "name": "商品名称3",     
      "image": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "text": "营销文字",
      "link": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },{
      "sellerId": "100001",
      "goodsId": "2000004",
      "name": "商品名称3",
      "image": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "text": "营销文字",
      "link": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },{
      "sellerId": "100001",
      "goodsId": "2000005",
      "name": "商品名称3",
      "image": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "text": "营销文字",
      "link": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    },{
      "sellerId": "100001",
      "goodsId": "2000006",
      "name": "商品名称3",
      "image": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "text": "营销文字",
      "link": "https://gw.alicdn.com/tfs/TB1Az7iXG5s3KVjSZFNXXcD3FXa-350-150.png",
      "url_type":"selfWebview",
      "url_path":"https://www.taobao.com",
      "url_data":"",
      "url_remark":""
    }
  ]
}
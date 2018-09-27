/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> configs -> interface.js
3. 作者：zhaohuagang@lifang.com
4. 备注：由于很多应用只是把数据接口当做model层，而不是直接接触数据库，本文件提供数据接口配置
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "encoding": "utf-8",
    "json" : true,
    "timeout": 60 * 1000,  //超时请求时间，单位：毫秒
    "successCode": 1,  //restfulAPI返回的状态码status多少代表成功
    "sessionExpireCode" : 1502,   //restfulAPI返回的状态码status多少代表session失效
    "providerMail": "zhaohuagang@lifang.com;42547335@qq.com",  //当接口不通的时候发邮件给TA
    "prefix": {
        "default" : {
            "dev" : "http://10.0.90.105:8080" ,
            "test" : "https://wechattest.yfyk365.com",
            // "test" : "http://10.0.90.105:8080",
            "sim" : "https://wechatsim.yfyk365.com" ,
            "prod" : "https://wechat.yfyk365.com"
        }    
    } ,    
    "suffix" : { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要        
        "common" : {
            "city" : "business/provinceCities" ,
            "town" : "business/regionTowns"
        } ,
        "member" : {
            "phoneAuthCode" : "business/getVerificationCode",//获取手机号验证码
            "bindSuccess" : "business/checkDynamicPhoneCode",//绑定手机号
            "profileEdit" : "personal/addInfo", // 手机号码注册之后的完善资料
            "profile": "personal/getInfo",  // 获取个人资料
            "profileUpdate": "personal/updateInfo",  // 更新个人资料
            "articlePublishAccount": "/article/check",//判断文章地址,是否抓取超过次数;
            "articlePublishSuccess": "article/gather",//抓取文章是否成功
            "articleInfo" : "article/sharing",//获取文章详情
            "articleTitle":"/article/update",//更改文章标题;
            "articleList" : "article/list",//文章列表
        }
    }
} ;

/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> configs -> app.js
3. 作者：zhaohuagang@lifang.com
4. 备注：整个应用的一些全局配置项，适用于那些零散的配置项，如数据库配置等一项多参数的配置就专门用一个配置文件来处理
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "appName" : "有房有客微信" ,
    "version" : "1.3" ,  //这个版本号将跟着项目管理规定的版本号走 ，为了cdn不缓存上一版本
    "appType" : "mobile" ,  //应用类型，可以是：pc | mobile 分别表示pc端应用和移动端应用，在模板head区域meta元素会体现不同
    "viewEnginee" : "ejs" ,   //应用系统使用的模板引擎，可以是：ejs | jade | hbs，当然前提条件是npm install了相应模板引擎模块
    "homeRouter" : "home" ,  //域名根路径，也就是首页使用哪个路由进行注册
    "dubbo" : false  //是否需要执行 dubbo连接，如果需要，在bootstrap的时候将连接zookeeper注册中心方便dubbo接口调用    
} ;
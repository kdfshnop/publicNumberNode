/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> configs -> log.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统日志处理配置，系统用log4js模块来处理
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "appLogDirName" : "yf2wechat_node" ,
    "appenders" : [
        {
            "type" : "console"
        } ,
        {
            "category" : "info" ,
            "type" : "dateFile" ,
            "filename" : "../logs/yf2wechat_node/info/" ,
            "pattern" : "yyyy-MM-dd.log" ,
            "alwaysIncludePattern" : true ,
            "maxLogSize" : 1024
        } ,
        {
            "category" : "warn" ,
            "type" : "dateFile" ,
            "filename" : "../logs/yf2wechat_node/warn/" ,
            "pattern" : "yyyy-MM-dd.log" ,
            "alwaysIncludePattern" : true ,
            "maxLogSize" : 1024
        } ,
        {
            "category" : "error" ,
            "type" : "dateFile" ,
            "filename" : "../logs/yf2wechat_node/error/" ,
            "pattern" : "yyyy-MM-dd.log" ,
            "alwaysIncludePattern" : true ,
            "maxLogSize" : 1024
        }
    ]
} ;
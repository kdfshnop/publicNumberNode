/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> configs -> cors.js
3. 作者：zhaohuagang@lifang.com
4. 备注：跨域白名单配置，主要用于向外提供restful接口
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "dev" : "*" ,
    "test" : "*" ,
    "sim" : "*" ,
    "prod" : [
        "http://m.wkzf.com"        
    ]
} ;
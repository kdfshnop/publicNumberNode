/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> configs -> session.js
3. 作者：zhaohuagang@lifang.com
4. 备注：session的使用配置
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
    "secret" : "yf2wechat" ,
    "expires" : 30 * 60 * 60 ,  //失效时间，单位：秒
    "prefix" : "yf2wechat_sess:"  //session前缀
} ;
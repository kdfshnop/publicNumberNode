/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> system -> core -> controllers -> renderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统核心 -> renderer类型控制器基类
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import SystemControllerBasic from "./basic" ;
class SystemRendererControllerBasic extends SystemControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        this.templateData = {} ;
        this.ua = this.getUserAgent() ; //userAgent信息       
    }
    /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    用templateData渲染指定模板，模板路径从views下一层开始写
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    render(template) {
        this.res.render(template , this.templateData) ; 
    }
    /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    加载语言配置文件
    @path : 相对根目录下languages目录的路径，如languages目录下的example.json，就写example，不需要写.json
    @lang : 语言种类，比如：cn | en 等
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    loadLangConf({ path , lang}) {
        let langObject = require("../../../../languages/" + lang + "/" + path + ".json") ;         
        /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        最后把处理好的整个对象扩展到this.templateData.lang下
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        Object.assign(this.templateData, { "lang" : langObject }) ;
    }
    /*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   取得userAgent信息
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    getUserAgent() {
        let ua = this.req.headers["user-agent"] ;
        let uaObj = {
            "mobile" : false ,
            "ios" : false ,
            "iphone" : false ,
            "ipad" : false ,
            "android" : false ,
            "webos" : false ,
            "mac" : false ,
            "windows" : false
        } ;
        if (/mobile/i.test(ua)) uaObj.mobile = true ;  //判断是否移动端
        if (/like Mac OS X/.test(ua)) {  
            uaObj.ios = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.') ; //是否ios系统
            uaObj.iphone = /iPhone/.test(ua) ;  //是否iphone
            uaObj.ipad = /iPad/.test(ua) ;  //是否ipad
        }
        if (/Android/.test(ua))  uaObj.android = /Android ([0-9\.]+)[\);]/.exec(ua)[1] ;
        if (/webOS\//.test(ua))  uaObj.webos = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1] ;
        if (/(Intel|PPC) Mac OS X/.test(ua))  uaObj.mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true ; 
        if (/Windows NT/.test(ua)) uaObj.windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1] ;
        return uaObj ;
    }

}

export default SystemRendererControllerBasic ;
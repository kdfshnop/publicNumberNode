/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> profileEditRenderer.js
3. 作者：zhaohuagang@lifang.com
4. 备注：个人中心-> 编辑个人资料
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppRendererControllerBasic from "../renderer" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个渲染器实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class Renderer extends AppRendererControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        渲染页面
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/  
        this.renders() ;        
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders() {
        let modulePathArray = [ "member" , "profileEdit" ] ;       
        try {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            page这个key的template
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData.page , {            
                "matchStylesheetPath" : modulePathArray.join("/") ,  //这里也可以是false或者null                    
                "controllerJavascriptPath" : modulePathArray.join("/")    //这里也可以是false或者null 
            }) ;
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            获取省份城市清单数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let provinceCityList = await this.adf.request({ "apiPath" : "common.city" }) ;            
            provinceCityList = provinceCityList.data ; 
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            汇总apiData
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            // console.log("agentId",this.getCache("agentId"), "openId",this.getCache("openId"))
            Object.assign(this.templateData , {
                "apiData" : {
                    "openId": this.getCache("openId") || this.req.query.openId,
                    "agentId" : this.getCache("agentId") || this.req.query.agentId,    // 编辑资料的时候后台需要
                    "state" : this.getCache("state") || this.req.query.state,    // 编辑资料的时候后台需要
                    "provinceCityList" : provinceCityList
                }
            }) ;            
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            渲染模板
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/              
            this.render(modulePathArray.join("/")) ; 
        }
        catch(ex) {
            this.next(ex) ;
        }
    }

}
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
最后将render暴露出去
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default Renderer ;
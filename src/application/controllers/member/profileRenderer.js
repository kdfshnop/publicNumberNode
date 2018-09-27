/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> member -> profileRenderer.js
3. 作者：tll
4. 备注：个人中心-> 个人资料
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
        数据类型：是mock数据还是接口真实数据
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        this.mock = true ;    
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        渲染页面
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/  
        this.renders() ;        
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    渲染页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async renders() {
        let modulePathArray = [ "member" , "profile" ] ;       
        try {
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            扩展模板常规数据
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData, {
                "page": {
                    "matchStylesheetPath": modulePathArray.join("/"),
                    "controllerJavascriptPath" : modulePathArray.join("/")
                }
            })
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            profile页面数据模拟
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            let profileData;
            let res = await this.adf.request({
                "apiPath": "member.profile",
                "data": {
                    openId: this.getCache("openId") || "okfUe1swZWVZ415syYmzCoNtmKr4"   // 测试数据
                },
                "method":"get",
                "contentType":"application/json"
            });
            res.status == 1 ? profileData = res.data : (console.log("获取接口menber/profile数据失败"));
            if(!profileData.pic) profileData.pic = this.templateData.app.appStaticPrefix + "/images/touxiang.png";
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            汇总apiData
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            Object.assign(this.templateData , {
                "apiData" : {
                    "profileData": profileData
                }
            }) ; 
            // console.log("this.templateData", this.templateData)         
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
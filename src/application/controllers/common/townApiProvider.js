/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> controllers -> common -> townApiProvider.js
3. 作者：zhaohuagang@lifang.com
4. 备注：城市区域及板块异步接口
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载配置及工具
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import AppApiControllerBasic from "../api" ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
创建一个apiProvider实例
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
class RestfulApi extends AppApiControllerBasic {
    constructor(req, res, next) {
        super(req, res, next) ;
        this.mock = false ;
        this.outputs() ;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    输出数据
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    async outputs() {
        try {
            if(this.mock) this.jsonObject = require("../../../../mock/town.json") ;
            else this.jsonObject = await this.adf.request({ "apiPath" : "common.town" , "data" : this.req.query  }) ;       
            /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
            输出内容
            -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
            this.output() ;
        }
        catch(ex){
            this.next(ex) ;
        }
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        结束
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    }
}

export default RestfulApi ;
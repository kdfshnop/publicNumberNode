/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> application -> routers -> common.js
3. 作者：zhaohuagang@lifang.com
4. 备注：通用路由器
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
加载相关资源
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import express from "express" ;
import TownApiProvider from "../controllers/common/townApiProvider" ;
let router = express.Router() ;
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
首页路由规则，openId是通过queryString参数来进行传递的
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
router.get("/api/common/town", function( req , res , next ) {   
    new TownApiProvider( req , res , next ) ;  
}) ;

export default router ;
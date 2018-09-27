/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：Aggregator标准框架
2. 文件名：src -> system -> libraries -> captcha.js
3. 作者：zhaohuagang@lifang.com
4. 备注：系统工具库 -> 生成验证码的类
            使用范例：不需要实例化类：
            Captcha.generate({ req , res }) ;
            注意这里使用的颜色值中alpha=255的时候才是百分百不透明
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
import captchapng from "captchapng" ;
class Captcha {
    constructor() {
        
    }
    static generate({ req , res , width = 80 , height = 25 , sessionKey = "captcha" , backColor = { "red" : 0 , "green" : 0 , "blue" : 0 , "alpha" : 0 } , foreColor = { "red" : 0 , "green" : 0 , "blue" : 0 , "alpha" : 255 }  }) {
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        设置验证码文本并记录到session中
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        let text = parseInt(Math.random()*9000+1000) ;
        req.session[sessionKey] = text ;            
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        设置验证码参数：
        @width : 80px ;
        @height : 25 ;
        @text : parseInt(Math.random()*9000+1000)
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        let p = new captchapng( width , height , text) ; 
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        设置验证码背景色
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        p.color( backColor.red , backColor.green , backColor.blue , backColor.alpha ) ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        设置验证码前景色
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        p.color( foreColor.red , foreColor.green , foreColor.blue , foreColor.alpha ) ;
        /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        绘制并输出
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
        let img = p.getBase64() ;
        let imgbase64 = new Buffer( img , "base64" ) ;
        res.writeHead( 200 , {
            "Content-Type" : "image/png"
        }) ;
        res.end(imgbase64) ;
    }
    
}

export default Captcha ;

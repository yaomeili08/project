$(function(){
     //是否同意协议
      $("#read .agreen").click(function(){
      	 //console.log(this);
      	  $("#read").addClass("read");
      })
     //正则表达式
     let regname = /^[A-Za-z0-9]{1,8}$/;
     let regphone = /^1[3-9]\d{9}$/;
     let regpsw= /^[a-zA-Z0-9]{6,16}$/;
     let regemail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    
     let username = $(".res_msg .userName");
     let phone = $(".res_msg .userphone");
     let email = $(".res_msg .useremail");
     let password1 = $(".res_msg .userpsw1");
     let password2 = $(".res_msg .userpsw2");
     let imgcode1 = $(".res_msg .imgcode");
      //提交按钮
     let sub = $(".res_msg .submit");
     //判断开关
     let isok1 = false;
     let isok2 = false;
     let isok3 = false;
     let isok4 = false;
     let isok5 = false;
     let isok6 = false;
     //输入框内容
     let nametex = "";
     let phonetex = "";
     let psw1tex = "";
     let pws2tex = "";
     let emailtex = "";
     let imgtex1 = ""; //图片验证码
     let imgtex2 = "";//生成的随机码
     
     
     //图片验证码插件
	 (new Captcha({ fontSize: 20 })).draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码1');
        imgtex2 = r;
        //自动触发标签失去焦点事件
        imgcode1.trigger("blur");
    });
        
   
    //console.log(username,phone,email,password1,password2,imgcode2,imgcode1,sub);
     
     //验证用户名
      username.blur(function(e){
      	 let text = $.trim($(this).val());
      	 nametex = text;
      	 //console.log(text);
      	 let msg = $(this).next();
      	 if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("用户名不能为空");
      	 	isok1 = false;
      	 }else if(!regname.test(text)){
      	 	msg.addClass("ierror");
      	 	msg.html("用户名不符合规范！");
      	 	isok1 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("用户名通过");
      	 	isok1 = true;     	 	 
      	 } 
      })
     
     //验证手机号
     phone.blur(function(e){
     	 let text = $.trim($(this).val());
      	 phonetex = text;
      	  let msg = $(this).next();
      	 if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("手机号不能为空");
      	 	isok2 = false;
      	 }else if(!regphone.test(text)){
      	 	msg.addClass("ierror");
      	 	msg.html("手机号码不正确！");
      	 	isok2 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("手机号码通过");
      	 	isok2 = true;
      	 }
      	// console.log(phonetex,isok2);
     })
     
     //验证邮箱
     email.blur(function(e){
     	 let text = $.trim($(this).val());
      	 emailtex = text;
      	  let msg = $(this).next();
      	 if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("邮箱不能为空");
      	 	isok3 = false;
      	 }else if(!regemail.test(text)){
      	 	msg.addClass("ierror");
      	 	msg.html("邮箱不正确！");
      	 	isok3 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("邮箱通过");
      	 	isok3 = true;
      	 }
      	// console.log(emailtex,isok3);
     })
     
     //图片验证码
     imgcode1.blur(function(e){
     	 let text = $.trim($(this).val());
      	 imgtex1 = text;
      	 let msg = $(this).nextAll("i");
      	  if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("验证不能为空");
      	 	isok4 = false;
      	 }else if((text).toLowerCase() != (imgtex2).toLowerCase()){
      	 	msg.addClass("ierror");
      	 	msg.html("验证码不正确！");
      	 	isok4 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("验证通过");
      	 	isok4 = true;
      	 }
      	// console.log(imgtex1,isok4);
     })
     
     //密码验证
     password1.blur(function(e){
     	 let text = $.trim($(this).val());
      	 psw1tex = text;
      	  let msg = $(this).next();
      	 if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("密码不能为空");
      	 	isok5 = false;
      	 }else if(!regpsw.test(text)){
      	 	msg.addClass("ierror");
      	 	msg.html("密码规范！");
      	 	isok5 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("密码通过");
      	 	isok5 = true;
      	 }
      	 //console.log(psw1tex,isok5);
     })
     
     //密码验证
     password2.blur(function(e){
     	 let text = $.trim($(this).val());
      	 psw2tex = text;
      	  let msg = $(this).next();
      	 if(text.length == 0){
      	 	msg.addClass("ierror");
      	 	msg.html("密码不能为空");
      	 	isok6 = false;
      	 }else if(psw1tex != psw2tex){
      	 	msg.addClass("ierror");
      	 	msg.html("密码前后不一致！");
      	 	isok6 = false;
      	 }else{
      	 	msg.addClass("itrue").removeClass("ierror");
      	 	msg.html("密码通过");
      	 	isok6 = true;
      	 }
      	 //console.log(psw2tex,isok6);
     })
      
      //判断表单是否验证通过
      //sub提交表单按钮
      sub.click(function(){
      	
//    	 if(nametex.lenght != 0 && phonetex.lenght != 0 && psw1tex.length != 0 &&
//    	    pws2tex.length != 0 && emailtex != 0 && imgtex != 0)
//          {
//          	
//          }
        //测试
//      nametex = "aa";
//      psw1tex = "123456";
//      phonetex = "13245678901";
//      emailtex = "123@1.com";
//      isok1 = true ; isok2 = true ; isok3 = true ; isok4 = true ; isok5 = true ; isok6 = true;
            if(isok1 && isok2  && isok3 && isok4 && isok5 && isok6 ){
            	console.log("ok");
            	$.ajax({
            		type: "post",
            		url :"../php/resgister.php",
            		dataType:"json",
            		data:`username=${nametex}&password=${psw1tex}&phone=${phonetex}&email=${emailtex}`,
            		success:function(response){
            			console.log(response);
            			if(response.status == "success"){
            				alert(response.msg);
            				window.location.href = "../indexgome.html";
            			}else{
            				alert(response.msg);
            			}
            			
            		}
            	});
            }
      })
})


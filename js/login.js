$(function(){
	   
	   	 //发送请求封装
	   function sendLogin(str){
	   	 
	 	 $.ajax({
	 	   type:"post",
	 	   url:"../php/login.php",
	 	   data: str,
	 	   dataType:"json",
	 	   success:function(response){ 
	 	     if(response.status == "success"){
	 	     	  //console.log(response.msg,"00");
            		alert(response.msg); 
            		 var user = Cookie.getItem("username");
            	   window.location.href = `../indexgome.html?usename=${user}`;
               }else{ 
               	    
            		alert(response.msg);
            		//清空存取的cookie
            		removeItem("username");
            		removeItem("password");
            	 }
 	 	     }
          })
         }
	    
	 //检查当前页面中是否存在cookie值
	 let queryAuto = "";
	 let tex1 =  Cookie.hasItem("username");
	 let tex2 =  Cookie.hasItem("password");
	 console.log(tex1,tex2);
	 if(tex1 && tex2){	 	    
	 	 let userName = Cookie.getItem("username");
	 	 let  pass  = Cookie.getItem("password"); 
	 	//console.log(userName,pass);
	 	  queryAuto = `username=${userName}&password=${pass}`;
	 	  sendLogin(queryAuto); 
	   }
	     //输入密码登陆
	 else{
	  
	  $(".logbox .submit").click(function(){
	 	//获取数据
	 	var user = $.trim($(".logbox .user").val());
	 	var psw =$.trim($(".logbox .pwd").val());
	 	var auto = $("#autoLog").is(":checked");
	 	
	 	//非空判断
	 	 if(user.length == 0  || psw == 0 ){
	 	 	  alert("用户名以及密码不能为空！"); 
	 	}
	 	else{ 
	 	  //判断自动登陆按钮是否选中 将用户名及密码存入cookie
	 	  if(auto){
	 	 	  Cookie.setItem("username",user,7,"/project/");
	 	 	  Cookie.setItem("password",psw,7,"/project/"); 	 	   
	 	  }
	 	 queryAuto = `username=${user}&password=${psw}`;
	 	 	//发送请求
	 	
	 	  sendLogin(queryAuto);	
	 	 
	 	 
	 	}
	  })
	  
	} 
})

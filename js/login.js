$(function(){
	 $(".logbox .submit").click(function(){
	 	//获取数据
	 	var user = $(".logbox .user").val();
	 	var psw =$(".logbox .pwd").val();
	 	 //console.log(user,psw);
	 	//发送请求
	 	$.ajax({
	 	   type:"post",
	 	   url:"../php/login.php",
	 	   data:`username=${user}&password=${psw}`,
	 	   datatype:"json",
	 	   success:function(response){
	 	     if(response.status == "success"){
            		alert(response.msg);
            	   window.location.href = "../indexgome.html";
               }else{
            		alert(response.msg);
            	 }
	 	   }
	 	})
	 	
	 })
})

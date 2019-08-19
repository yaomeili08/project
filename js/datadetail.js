$(function(){
		//顶部导航数据渲染
	            function creHeadNav(data){
	            	var headnav = data;
	            	//console.log(data);
	            	var str = "";
	            	 str = headnav.map((ele,index)=>{
	            		var str1 = `<dt><a href="#">${ele.title}</a></dt>`;
	            		var str2 = "";
	            		 
	            		str2 = ele.nav.map((item,i)=>{
	            			var str3 = "";
	            			str3 = item.map((ele)=>{
	            			  return `<li><a href="#">${ele}</a></li>`;
	            			}).join("");
	            			str3 = `<ul>${str3}</ul>`;
	            			return str3;
	            		}).join("");
	            		str2 = `<dd>${str2}</dd>`; 
	            		str1 =  `<dl>${str1}${str2}</dl>`; 
	            		return str1;
	            	}).join("");
	            	
	            	$("#topbody .hidebox4").html(str);
	            	
	            }
	            //获取数据并初始化
	            $.getJSON("../json/headnav.json", json =>(creHeadNav(json)));
				//顶部导航
				//li hover下拉菜单出现
				let li1 = $("#topbody .lis");				
			     li1.hover(function(){
			     	$(this).css("background","white");
			     	$(this).children("a").css("color","red");
			     	$(this).children(".hide").css("display","block");			  
			     },
			     function(){
			     	$(this).css("background","none");
			     	$(this).children("a").css("color","#888");
			     	$(this).children(".hide").css("display","none");			     	
			     }
			     )
			     $("#topbody .hidebox a").hover(function(){
			     	 $(this).toggleClass("activeA");			   
			     })
			
			
			//获取跳转后传送的信息
			var inf = decodeURI(location.search); 
		 	inf = inf.slice(1);
		 	 // 字符串转对象函数
			 function strToObj(str){
			 	var arr = str.split('&');
			 	var obj = {};
			 	arr.forEach(function(item){
			 		var html = item.split('=');
			 		obj[html[0]] = html[1];
			 	});
			 	return obj;
			 }
			var data = strToObj(inf);
		   //商品在数据库中的ID  可根据ID 发送请求数据库
		   var goodgit = data.git;
		   
		   //发送请求获取数据		  
		    
		     	 $.ajax({
	 	   type:"post",
	 	   url:"../php/dataDetailGet.php",
	 	   data: `goodgit=${goodgit}`,
	 	   dataType:"json",
	 	   success:function(response){ 
	 	       dataA = response[0];
	 	         createHtml(dataA);
	 	        }
 	 	     })
		    
          	
           //渲染标签并产生事件
           function createHtml(data){
		    //获取数据 
			 var dataA = data;	
			//小图列表拼接 
			var imglist = JSON.parse(dataA.imglist);
			var strImg = imglist.map((item)=>{
				return `<img src="${item}" >`;
			}).join("");
		  
			 //数据渲染
			 var html = `
			<div class="left">
            <article class="wrapper">
             <div class="smail">
               <div class="smail_box">
                <img src="${dataA.bigimg}" />
                <i class="icon"><img src="../img/mimor.PNG"/></i>
                <div class="make">              	
                </div>
              </div>
             <p class="leftimg"><</p>
             <div class="list">
                   <ul>
                    <img src="${dataA.bigimg}" >
                       ${strImg}           
                  </ul>
             </div>
            <p class="rightimg">></p>
           </div>        
            <div class="big">
            <img src="${dataA.bigimg}" >
           </div>
           </article>

			<div class='productTex'>
					<p>商品编号：1710343037</p>		
			</div>
			</div>
			<div class="right">
				<div class='product'>
					<div class='title'>
					    <p><span class='time'></span></p>
						<h3>${data.title}</h3>
						<p>${data.title}</p>					
					</div>
					<img src="../img/datadetail.jpg" alt="" />
					<h4> 
						<p class="price"><label>国美价</label>&yen<span>${(dataA.price).slice(1,)}</span></p><br>
						<p><label>领劵</label><i>满500-100</i><i>满2999-300</i></p> 
					</h4>
					<h5><span>配送至</span><p>广东省广州市<i>></i></p></h5>
					<h5><span>服务</span><p>由国美提供并提供保障监管。</p></h5>
					<h5 class="size  color"><span>颜色</span><p>幻彩紫</p><p>梦幻蓝</p><p>深空灰</p></h5>
					<h5  class='size  vis'><span>版本</span><p>6GB+12GB</p><p>8GB+128GB</p><p>8GB+256GB</p></h5>
					<h5  class='size types'><span>网络制式</span><p>全网通</p><p>4G版</p></h5>
					<h5 class='count'><span>数量</span>
						<li><em class="add">+</em><span>1</span><em class="sub">-</em></li>
					</h5>
				
					<button data-index =${dataA.git} class='submit'><i></i>加入购物车</button>
				</div>
			</div>		
			`;
			 $(".detail").append(html);
			 //放大镜
			  minor();
			
			
			//小图片选项卡
			
			$(".list").on('mouseenter',"img",function(){
				let index = $(this.index);
				$(".smail_box ").children("img").attr("src", this.src);
				$(this).addClass("actimg").siblings().removeClass("actimg");		  
			})
			// 商品详情选项
			$(".right h5").on("click",'p',function(){
				   //console.log(this);
			 $(this).addClass("pactive").siblings().removeClass("pactive");
			})
			
			//点击数量增减
			$(".count .add").click(function(){
				var num =  $(this).next().html();
				  num ++;
				 $(this).next().html(num); 
			})
			
			$(".count .sub").click(function(){
				var num =  $(this).prev().html();
				  num --;
				  if(num <= 1){
				  	num = "1";
				  }
				 $(this).prev().html(num);
			})
						  	   
			  var goodlist = Cookie.get('goodlist');
			  if(goodlist.length != 0){
			  	 goodlist = JSON.parse(goodlist);
			  }
			  else{
			  	goodlist = [];
			  }		
			    
			  	var itemNum = Cookie.get("goodnum");
			   //改变侧栏购物车商品数
			    $("#carItem").text(itemNum);
			
			   
			   $("#carItem").mouseenter(function(){
			   	    $(this).css("color","red");
			   })
			  $("#carItem").mouseenter(function(){
			   	    $(this).css("color","white")
			   })
			  
			//点击加入购物车存入cookie数据库
			$(".detail").on("click" ,".submit",function(){	
				 //先判断cookie中是否存在商品		 
				// 当前商品的git
				 let git  = data.git;
				 console.log(git,"当前商品git");
				//判断该商品是否已加入过购物车
				 let curgood = goodlist.filter(function(g){ 
				 	   return g.git == git;
				 })
				 if(curgood.length > 0){
				 	//存在
				 	curgood[0].count++;
				 }
				 else{
				 	//商品不存在
				 	//需要存入购物车数据
				 var o ={};
				 var detail = $(this).parents(".detail");
				  o.git = git;
				  o.count = detail.find(".count li span").text();
				  o.check = 1; //选中状态
				  o.price = detail.find(".price span").text();
				  o.img = detail.find(".smail_box img").attr("src"); 
				  o.title = detail.find(".title h3").text();
				  o.color = detail.find(".color .pactive").text();
				  o.vis =   detail.find(".vis .pactive").text();
				  o.types = detail.find(".types .pactive").text();				 
				 // console.log(o.price,o.color,o.vis,o.type,o.count);
                   goodlist.push(o); 
				 }
				 itemNum = goodlist.length;
                 //存入cookie
                 $("#carItem").text(itemNum);
				 Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
				 Cookie.set("goodnum",goodlist.length,{path:"/project/"});
                })	
      }
     
  })
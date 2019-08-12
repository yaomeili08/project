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
			     $("#topbody .hide a").hover(function(){ 
			     	      $(this).toggleClass("activeA");
			     })
			     
	          
		 	   let totle = 0; //总价
		 	   let totleNum = 0;  //商品数量
	           
		 	 //根据cookie数据进行渲染 
		 	 function creatItem(){
		 	 	//获取cookie值并转为数组
		 	  var goodlist = JSON.parse(Cookie.get("goodlist"))|| [] ;
		 	     console.log(goodlist);
		 	    let totle = 0; //总价
		 	    let totleNum = 0;  //商品数量
		 	 	let html = "" ; //渲染商品 
		 	 	html = goodlist.map((item,index)=>{
		 	 		//如果商品check为1选中状态，则计算价格，否则不计算
		 	 		 if(item.check){
		 	 		 	totle += item.price * item.count;
		 	 		 	totleNum += item.count - 0; 
		 	 		 } 
		 	 		var mintol = item.price *item.count; 
		 	 		return `
		 	 		<div class="item" data-git =${item.git}>
					<input class="check" type="checkbox" ${item.check ? 'checked = checked' : ''}/>
					<a href="#"><img src="${item.img}" alt="" /></a>
					<p class="title">${item.title}<br>
						<i></i>&nbsp;&nbsp;<i></i>
					</p>
					<p class="size">颜色 ：${item.color}<br>版本 ：${item.vis}</p>
					<p class="price">&yen;<b class="itemPrice">${item.price}</b></p>
					<p class="num"><em class="add">+</em><span>${item.count}</span><em class="sub">-</em></p>
					<p class="itotal">&yen;<b>${mintol}</b></p>
					<p class="del"><input type="text" value="删除" /></p>
				</div>		
		 	 		`; 
		 	 	}).join("");
		 	 	   //console.log(html);
		       	 $(".carMain  .carContain").html(html);
		       	 $(".carBtm .tolPrice").text(totle);
		 	 	 $(".carBtm .addCount").text(totleNum);
		 	   }
		 	    //初始化渲染
		 	 	   creatItem();
		 	 	  
		 	 	//获取cookie值并转为数组
		   var goodlist = JSON.parse(Cookie.get("goodlist"))||[] ; 
		         console.log(goodlist);
		 	     		 	    		 	     		 	 	 		 	 	 		 	 	 		 	 	 
		 	 	 //点击加减框改变数量
		 	 	 $(".carContain").on("click",".item em",function(){
		 	 	 	     event.preventDefault();
		 	 	 	    //存取其class名
		 	 	 	    var type = $(this).attr("class");
		 	 	 	    var num = 0 ; //商品数量
		 	 	 	    var git = 0 ; //商品id
		 	 	 	    if(type == "add"){
		 	 	 	        num= $(this).next("span").text(); 
		 	 	 	       $(this).next("span").text(++num) ; 
		 	 	 	      git = $(this).parents(".item").data("git");//父节点git 
		 	 	 	    }else if(type == "sub"){
		 	 	 	     num = $(this).prev("span").text(); 
		 	 	 	            --num;
		 	 	 	          if(num <= 1){ num = 1; }
		 	 	 	      $(this).prev("span").text(num) ; 
		 	 	 	     git = $(this).parents(".item").data("git");//父节点git 
		 	 	 	    }
		 	 	 	    //修改goodlist，重新存入cookie
		 	 	 	    for(i = 0 ; i < goodlist.length ; i++){
	 	    		 	     if(goodlist[i].git == git){
	 	    		 	 	   goodlist[i].count = num;
	 	    		 	 	 Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
	 	    		 	       creatItem();//重新渲染
	 	    		 	   }
	 	    		     } 
		 	 	   })
		 	 	 
		 	 	     //点击点击全选反选
		 	 	  $(".carBtm .choose , .carNav .choose").click(function(){
		 	 	  	   //单选框的选中状态
		 	 	  	   var check = 0;
		 	 	  	  if(this.checked){
		 	 	  	  	 check = 1;
		 	 	  	   $(".carContain .item .check").prop("checked",true);
		 	 	  	   $(this).siblings().prop("checked",true);
		 	 	  	  }else{ 
		 	 	  	   $(this).siblings().prop("checked",false);
		 	 	  	   $(".carContain .item .check").prop("checked",false);
		 	 	  	  }
		 	 	  	   //改变goodlist item 的check
		 	 	  	   for(i = 0 ; i < goodlist.length ; i++){ 
	 	    		 	 	     goodlist[i].check = check; 
	 	    		     } 
	 	    		     //修改cookie并重新渲染
	 	    		     Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
	 	    		 	      creatItem();//重新渲染 
		 	 	  })
		 	 	 
		 	 	 //点击删除按钮删除对应商品
		 	 	 $(".carContain").on("click",".item .del",function(){
		 	 	 	    //商品id
		 	 	 	    var git = 0;
		 	 	 	    git = $(this).parents(".item").data("git"); 
                        console.log(git);
                         //修改goodlist，重新存入cookie
		 	 	 	    for(i = 0 ; i < goodlist.length ; i++){
	 	    		 	     if(goodlist[i].git == git){
	 	    		 	 	      goodlist.splice(i,1); //删除对应数据 
	 	    		 	 	       break;
	 	    		 	    }
	 	    		     } 
	 	    		     //更新cookie数据 重新渲染
	 	    		     var num = goodlist.length;
	 	    		     Cookie.set("goodnum",num,{path:"/project/"});//加入购物车的数量
                         Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
	 	    		 	       creatItem();//重新渲染 
		 	 	 })
		 	 	 
		 	 	 //改变商品的选中状态改变总价
		 	 	 $(".carContain").on("click",".item .check",function(){
		 	 	 	     //商品id
		 	 	 	    var git = 0;
		 	 	 	    var check = Number(this.checked);//将选中状态转化为数字
		 	 	 	     console.log(check);
		 	 	 	    git = $(this).parents(".item").data("git"); 
		 	 	 	      //修改goodlist，重新存入cookie
		 	 	 	    for(i = 0 ; i < goodlist.length ; i++){
	 	    		 	     if(goodlist[i].git == git){
	 	    		 	 	     goodlist[i].check = check;
	 	    		 	 	       break;
	 	    		 	    }
	 	    		     } 
		 	 	 	    Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
	 	    		 	       creatItem();//重新渲染 
		 	 	 })
		 	 	 
		 	 	 //点击清空购物车
		 	 	 $(".carBtm .carBtmNav .delAll").click(function(){
		 	 	 	    goodlist = [];
		 	 	 	   Cookie.set("goodlist",JSON.stringify(goodlist),{path:"/project/"});
		 	 	 	   //商品数量清零
		 	 	 	   Cookie.set("goodnum",0,{path:"/project/"});
	 	    		 	       creatItem();//重新渲染 
		 	 	 })
		 	 	 
})

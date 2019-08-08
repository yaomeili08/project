$(function(){
	
	var goodlist = Cookie.get("goodlist") ||[] ;
		 	if(goodlist){
	 	  	 goodlist = JSON.parse(goodlist); 
	 	  	// console.log(goodlist);
	 	    }
	 	    else{
	    	 goodlist = [];	 	  	
	 	    }
		 	
		 	//根据cookie数据进行渲染
		 	   let totle = 0; //总价
		 	   let totleNum = 0;  //商品数量
		 	   
		 	 function creatItem(){
		 	 	let html = "" ; //渲染商品
		 	 	html = goodlist.map((item,index)=>{
		 	 		totle += item.price * item.count;
		 	 		totleNum += item.count - 0; 
		 	 		var mintol = item.price *item.count; 
		 	 		return `
		 	 		<div class="item" data-git =${item.git}>
					<input class="check" type="checkbox" checked = "check"/>
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
		       	 $(".carMain  .carContain").append(html);
		       	 $(".carBtm .tolPrice").text(totle);
		 	 	 $(".carBtm .addCount").text(totleNum);
		 	   }
		 	    //初始化渲染
		 	 	   creatItem();
		 	 	   
		 	 	   
		 	    //计算商品价及数量函数
		 	     function sumAadNum(){
		 	     	 var sum = 0;
		 	     	 var num = 0;	     	 
		 	     	$(".carMain .carContain .item").each(function(i,ele){
		 	     		 
		 	     		 if(($(this).find(".check")[0].checked)){
		 	     		 	 var price1 = $(this).find(".itotal b").text();
		 	     		 	 var num1 = $(this).find(".num span").text();		 	     		 	
		 	     		 	
		 	     		 	 sum +=  price1 - 0 ;
		 	     		 	 num += num1 - 0 ;
		 	     		 }
		 	     	})	
		 	     	//全局变量赋值
		 	     	totle = sum ; totleNum = num;
		 	     	 $(".carBtm .tolPrice").text(totle);
		 	 	     $(".carBtm .addCount").text(totleNum);
		 	     }
		 	     
		 	     //改变商品数量改变小计及总价和总数
		 	     $(".carMain .carContain .item").each(function(i,ele){
		 	     	  var mintotle = $(this).find()
		 	     })
		 	     
		 	     
		 	 	  //初始化设置	默认全选	 	 	   
		 	 	 $("input").attr("checked",true);
		 	 	 
		 	 	 
		 	 	  //点击点击全选反选
		 	 	  $(".carBtm .choose , .carNav .choose").click(function(){ 
		 	 	  	  if(this.checked){
		 	 	  	  	console.log(true); 
		 	 	  	   $(".carContain .item .check").prop("checked",true);
		 	 	  	   $(this).siblings().prop("checked",true);
		 	 	  	   $(".carBtm .tolPrice").text(totle);
		 	 	       $(".carBtm .addCount").text(totleNum);
		 	 	  	  }else{ 
		 	 	  	  $(this).siblings().prop("checked",false);
		 	 	  	  $(".carContain .item .check").prop("checked",false);
		 	 	  	  $(".carBtm .tolPrice").text(0);
		 	 	      $(".carBtm .addCount").text(0.00);
		 	 	  	  }
		 	 	  	  //重新计算价格
		 	 	  	   sumAadNum();
		 	 	  })
		 	 	 //点击商品选中状态改变数量以及总价
		 	 	 $(".carMain .carContain .item").on('click',".check",function(){
		 	 	 	      sumAadNum();
                  })
		 	 	 
		 	 	 //点击加减框改变数量
		 	 	 $(".carContain .item").on("click","em",function(){
		 	 	 	     event.preventDefault();
		 	 	 	    //存取其class名
		 	 	 	    var type = $(this).attr("class");
		 	 	 	    var num1 = 0 ;
		 	 	 	    if(type == "add"){
		 	 	 	       num= $(this).next("span").text(); 
		 	 	 	      $(this).next("span").text(++num) ; 
		 	 	 	       var git = $(this.git);
		 	 	 	       for(i = 0 ; i < goodlist.length ; i++){
	 	    		 	 if(goodlist[i].git == git){
	 	    		 	 	 goodlist[i].count = num;
	 	    		 	 	 
	 	    		 	      creatItem();
	 	    		 	   }
	 	    		      }
		 	 	 	    }else if(type == "sub"){
		 	 	 	    var num = $(this).prev("span").text(); 
		 	 	 	          --num;
		 	 	 	          if(num <= 1){ num = 1; }
		 	 	 	      $(this).prev("span").text(num) ;
		 	 	 	         num1 = num;
		 	 	 	    }
		 	 	 	   
		 	 	 })
		 	 	 
})

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
			     

//tag数据渲染

    function tagHtml(data){
       var str = "";
  	  str = data.map((ele,index)=>{  	  	
  	  	 var stra = '';
  	  	stra =  ele.tex.map((item,i)=>{
  	  	 	  return `<a href="#">${item}</a>`;
  	  	 }).join("");
  	  	   stra = `<ul>${stra}</ul>`; 	  	  
  	  	  return `<h3>
  	  	  <span>${ele.title}:</span>
		  	     ${stra}
		  	 <p>+多选</p></h3>`;
  	  }).join("");
  	  // console.log(str);
  	    $(".tag").html(str);
  }
     //调用tag渲染
    tagHtml(datatag);
   
    
    //数据请求
     /* 请求页码生成页码标签 */
    $.ajax({
        type: "get",
        url: "../php/goodGetPage.php",
        dataType: "json",
        success: function(response) {
            if (response.status == "error") {
                alert("网络繁忙，请检查网络连接");
            } else {
            	
               // console.log("count", response.data.count);
                // 创建页码标签显示在页面中
                //console.log($("#page"));
                $("#page").empty();
                for (var i = 0; i < response.data.count; i++) {
                   $("#page").append(`<span>${i + 1}</span>`);
                }
                $("#page").children("span:first").addClass("active");
            }
        }
    });
    //请求数据渲染
    let getList = (page,type) =>{
       
        $.ajax({
            type: "post",
            url: "../php/goodlistGet.php",
            data: `page=${page}&type=${type}`,
            dataType: "json",
            
            success: function(response) {
                 // console.log(response,"000");
                 var num = 0;
                    // console.log(response[18].imglist);
                var res = response.map((ele,index) => {
 
                     //小图拼接
                     // console.log(ele, num++ );
                     var minimgs = JSON.parse(ele.imglist) || []; 
                       //console.log(minimgs,++num);
                   var strimg = minimgs.map((item)=>{
                    	
                     	return `<img src="${item}"/>`;
                     	 console.log(item);
                     }).join(""); 
                     
                    return `
                     <li class="item" data-git = ${ele.git}>
	    				<a class="bigimg" href="#"><img src="${ele.bigimg}"/></a>
	    				<p class="imgbox" > ${strimg}</p>
	    				<h3 class="price">&yen${ele.price}</h3>
	    				<h4><a href="#">${ele.title}</a></h4>
	    				<span class="sp1">已有</span><i class="count">13666</i><span >人评价</span><br>
	    				<p class="stop">
	    				 <span>自营</span>
	    				 <i>${ele.shop}</i>
	    				</p>
	    			<h5 class="juan">${ele.juan ? ele.juan :""}</h5> 				
	    			</li>
                    `;
                }).join("");
                $(".gooditems").html(res);
            }
        });     
    }
    
   //初始化
   var orderType = ["default", "low", "hight"];
   var type = "default";
   getList(0,type);
    //点击相应页面渲染
   $("#page").on("click","span",function(){
   	   getList($(this).index(),type);
   	    $(this).addClass("spanact").siblings().removeClass("spanact");
   })
    //点击排序
    $(".filter span").click(function(){
    	  type = orderType[$(this).index()];
    	   getList(0,type);   	  
      $("#page").children("a").eq(0).addClass("spclick").siblings().removeClass("spclick");
    })
   
   
   
		//小图标选项卡
       
    $(".gooditems ").on("mouseenter",".imgbox img ",function(){
    	   var curimg = this.src;
    	   var bigimg = $(this).parents(".item").find(".bigimg img");
    	    bigimg.attr("src",curimg);
    	 
    	 
       })	 		
   
          //点击商品列表跳转到详情页
         function objToStr(obj){
                	var str = '';
                	for(var key in  obj){
                		str += key + '=' + obj[key] + '&';
                	}
                	return str.slice(0,-1);
               }
       
			 		$(".gooditems ").on("click",".item",function(){
			 			 event.preventDefault();
			              var o ={};
			             o.git = $(this).data("git");
			 			 o.bigimg = $(this).find('.bigimg img')[0].src;
			 			 o.price = $(this).find(".price").html();
			 			 o.title = $(this).find("h4 a").html();			 	
			 			 var  arr = $(this).find(".imgbox img");
			 			 var strimg = "";
			 		        arr.each((index,ele)=>{
			 		      	    strimg += (ele.src + "$$$$");
			 		      });
			 		    o.imglist =  (strimg).substring(0,strimg.length-4);
			 		    //console.log(o.imglist);
			 			let str = self.objToStr(o);				 			
			 			location.href = `../html/商品详情页.html?` + str;
			 		})
			
			//侧边栏购物车数量
			
			
        
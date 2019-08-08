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
                var res = response.map((ele,index) => {
                    //console.log(ele.price);
                    // console.log(ele.imglist);
                     //小图拼接
                     var minimgs = JSON.parse(ele.imglist);                                    
                    var strimg = minimgs.map((item)=>{
                    	//console.log(item);
                     	return `<img src="${item}"  />`;
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
			 			console.log(this);
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
			 			//console.log(o,str);
			 						 			
			 			//console.log(str);
			 			location.href = '../html/商品详情页.html?' + str;
			 		})
			
			
        
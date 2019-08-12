//头部
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
	            $.getJSON("json/headnav.json", json =>(creHeadNav(json)));
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
			     
			    //顶部搜索框
			    
			    $(".searchdown").hover(function(){      
			    	$(this).children("ul").toggleClass("ulactive");
			    })
			    
			    //购物车
			    $(".shop").hover(function(){
			        $(this).toggleClass("shopac");
			    	$(".shop .hideshop").toggleClass("shopshow");
			    })
			    
			    //导航选项
			    //左边
			   function creNavl(data){			   	
			   	   var  str = '';
			   	  str = data.navl.map(function(ele){
			   	  	  var str1 = '';
			   	  	 str1 = ele.map(function(item){
			   	  	 	return `<a href="#">${item}</a>`;
			   	  	 }).join('');			   	  	 
			   	  	return `<li>${str1}</li>`;
			   	  }).join("");			   	  
			   	 
			   	  str = `<ul class="navbox">${str}</ul>`;
			   	  //插入到catelnav
			   	  let a = $(".cateleft .catelnav");
			   	    a.prepend(str);
			   }
			   //左边发送请求并渲染
		     $.getJSON("json/nav.json", json =>(creNavl(json)));
		        //右边
		     	function creatTagr(data){
		 		 
		 		var html = "";
		 		 html = data.navr.map((ele)=>{
		 		   //文字部分 lnav
		 		   var strTil = "";
		 		  strTil =  ele.title.map((item)=>{
		 		   	 return `<a href="#">${item} &gt;</a>`;
		 		   }).join("");
		 		  //title
		 		  strTil = `<h3 class="title">${ strTil}</h3>`;
		 		  
		 		  var strcon = ""; 
		 		  strcon = ele.h2tex.map((item)=>{
		 		  	  //拼接a标签
		 		  	   var stra = "";
		 		  	   stra = item.atex.map((ele)=>{
		 		  	   	   return `<a href="html/商品列表.html">${ele}</a>`;
		 		  	   }).join("");
		 		  	    
		 		  	   //整个h3 
		 		       return `<h3>
		 						 <span>${item.title}</span>
		 						 <p>${stra}</p>
		 					   </h3>`;	 		  	   
		 		  }).join("");
		 		  //contex
		 		  strcon = `<div class="contex">${strcon}</div>`;
		 		  
		 		  //整个左边文字部分
		 	     var strl = `<div class="lnav">${strTil}${strcon}</div>`;
		 		  
		 		  //右边图片
		 		   var strR = '';
		 		   var adtag = ele.img1.map((ele)=>{
		 		   	    return `<a href="#"> <img src="${ele}" /></a>`;
		 		   }).join("");
		 		   //小图部分
		 		   adtag = `<ul class="adtag">${adtag}</ul>`;
		 		   //整个右边
		 		   strR= `<div class="rnav">${adtag} 
		 					<a href="#"><img src='${ele.img2} '/></a>
		 					</div>`;
		 			return `<div class="hidenav hideNav">${strl}${strR}</div>`; 
		 		}).join(''); 
		 	   //插入
		 	   $(".cateleft .catelnav").append(html);
	       }
		    //右边
		   $.getJSON("json/nav.json", json =>(creatTagr(json)) );
		  
		     
		     //切换选项卡		   
		    //移入对应li
		   $(" .cateleft ").on("mouseenter",".navbox li ",function(){
		   	      $(this).addClass('liact').siblings().removeClass('liact');
		   	      $(this).children("a").addClass("Aact");
		   	      let index = $(this).index();	
		   	      $(".hidenav").eq(index).addClass("hideact"); 
		      })
		    $(".cateleft ").on("mouseleave",".navbox li ",function(){
		   	      $(this).removeClass('liact');
		   	      $(this).children("a").removeClass("Aact");
		   	      let index = $(this).index();		   	      
		   	      $(".hidenav").eq(index).removeClass("hideact");
		   })	
//		 
		    $(".catelnav").on("mouseenter",".hidenav",function(){
		    	  $(this).addClass("hideact");
		            let index = $(this).index()-1;
		          $(" .cateleft .navbox li").eq(index).addClass("liact");
		          var curli = $(" .cateleft .navbox li").eq(index); 
		          curli.find("a").addClass("Aact");
		    })
		    
		    $(".catelnav").on("mouseleave",".hidenav",function(){
		    	  $(this).removeClass("hideact");
		            let index = $(this).index()-1;
		          $(" .cateleft .navbox li").eq(index).removeClass("liact");
		          var curli = $(" .cateleft .navbox li").eq(index); 
		          curli.find("a").removeClass("Aact");
		    })
            $(".catelnav").on("mouseenter",".contex a",function(){
            	 $(this).css("color","red"); 
            })
		     $(".catelnav").on("mouseleave",".contex a",function(){
            	 $(this).css("color","#333"); 
            })
		     
		   //youlike
		   function createYl(data){ 
		   	 var html = ""; 
		   	 data.forEach((item,index)=>{ 
		   	 	 html +=` <li>
             	 <a href="html/商品列表页.html">
             	 	<img src="${item.img}"  />
             	 	<p>${item.price}</p>
             	 	<h3>${item.title}元</h3>
             	 </a>
             	 </li>`;
             	 if((index + 1) % 6 == 0 && index != 0){ 
		   	 	  $(".yl_box .yl_ulbox ").append(`<ul class="yl_nav">${html}</ul>`);
		   	 	      html = "";
		   	 	} 
		   	 })
		   	 //事件绑定
		   	      var l = 1220;
		   	 	   var i = 0;
		   	 	   var lw = 0;
		   	 $(".yl_title ").on("click","i",function(){
		   	 	  var iclass = this.className; 
		   	 	  if(iclass == "ylprev"){ 
		   	 	  	   i -- ;
		   	 	  	 if(i < 0){
		   	 	  	 	i = 2;
		   	 	  	 } 
		   	 	  	  lw =  l * i ;
		   	 	  	$(".yl_box .yl_ulbox").css("left",-lw +"px");
		   	 	  }else if(iclass == 'ylnext'){ 
		   	 	  	   i ++;
		   	 	  	 if(i >= 3){
		   	 	  	 	i = 0;
		   	 	  	 } 
		   	 	  	 lw =  i * l ; 
		   	 	  	$(".yl_box .yl_ulbox").css("left",-lw +"px");
		   	 	  }
		   	 })
		   	 
		   }
		   
//		   $.getJSON("json/youlike.json", json =>(createYl(json)) );
           //发送请求获取数据
             $.ajax({
            type: "post",
            url: "php/ylget.php", 
            dataType: "json",
            success:function(response){
            	createYl(response);
            }
          })
		    //banner
		   //背景图数据
		  var  libg = ["rgb(226, 0, 50)",'rgb(224, 32, 9)',"rgb(99, 161, 234)","green",
		   "rgb(102, 30, 114)",'rgb(172,112, 247)','pink'];
		     class Banner{
		     	constructor(){		     		
		     		this.index = 0;
		     		this.lis = $(".bannerbox ul li");
		     		this.i = $(".imgbox ol i"); //焦点
		     		this.box = $(".bannerbox"); //
		     		this.length = this.lis.length;		     		
		     	}
		     	init(){
		     		this.auto();
		     		this.mouevent();
		     	}
		     	auto(){
		     		this.timer = setInterval(()=>{
                       this.next();
		     		
                     },2000)
		     	}
		     	next(){
		     		 this.index ++;
		     		if(this.index >= this.length){
		     			this.index = 0;}
		     		this.lis.eq(this.index).fadeIn().siblings().fadeOut();
		     		this.lis.css("background",libg[this.index]);
		     		this.i.eq(this.index).addClass("bani").siblings().removeClass('bani');
		     		
		     	}
		     	prev(){
		     		this.index --;
		     		if(this.index < 0 ){
		     		this.index = this.length;}
		     		this.lis.eq(this.index).fadeIn().siblings().fadeOut();
		     		this.lis.css("background",libg[this.index]);
		     		this.i.eq(this.index).addClass("bani").siblings().removeClass('bani');		    		
		     	}
		     	mouevent(){
		     		//移入停止		     		
		     		$(".bannerbox , .catelnav").hover(()=>{
		     			clearInterval(this.timer);
		     		},()=>{
                          this.auto();
                     }) 
		     		// 点击按钮next	
		     		$(".imgbox .next").click(()=>{
		     			this.next();
		     		  $(".imgbox .next").toggleClass("banbtn");
		     		})
		     	    //点击按钮prev
		     	    $(".imgbox .prev").click(()=>{
		     			this.prev();
		     		$(".imgbox .prev").toggleClass("banbtn");
		     		})
		     	    
		     	    //焦点跟随
		     	     var self = this;
		     	    this.i.hover(function(){
		     	    	let index = $(this).index();
		     	    	$(this).addClass("bani").siblings().removeClass('bani');
		     	    	 self.lis.eq(index).stop().fadeIn().siblings().fadeOut();
		     	    	 self.lis.css("background",libg[index]);
		     	    	 self.index = index;
		     	    })
		     	}
		     	
		     } 
		       
		       //大轮播图实例化
		       let banner = new Banner();  
		         banner.init();
		       
		       //楼层数据渲染hide部分
		     
		        function createLou(data){ 
		        	var dat = data[0]; 
		        	var tag = dat.nav; 
		            //拼接nav
		        	var strtag = tag.map((item)=>{ 
		        	  return`<li><span>${item}</span></li>`;
		        	}).join("");
		            strtag = ` <ul class="tag">${strtag}</lu>`; 
		            //拼接subtemp
		            //subleft
		            var strp = '';
		            strp = dat.ptex.map((item)=>{
		            	return `<a href="#">${item}</a><em>/</em>`;
		            }).join("");
		            strp = `<p>${strp}<p>`;
		        	
		        }

		        //hidebox
		        function createHide(data,phone,num){
		        	var hide = data[num];
		        	var strHide = "";
		        	strHide = hide.map((item)=>{
		        		var strul = "";
		        		 strul =  item.map((ele)=>{
		        		  	 return `<li class="hideli">
       	     		                  <a href="html/商品列表.html">
       	     			              <img src="${ele.img}" />
       	     			              <p>${ele.title}</p>
       	     			              <span>${ele.price}</span>
       	     		                  </a> 
       	     	                     </li>`;
		        		  }).join("");
		        		 return strul = `<div class="subright">
       	 	                        <div class="tempad">
       	 	                        ${strul}
       	 	                         </div>
       	                             </div>`; 
		        	}).join("");
		        	
		        	$(`.${phone} .subtemp`).append(strHide);
		        	$(".lou .subtemp").on("mouseenter",".hideli p , .hideli span",function(){
		        		   $(this).css("color","red");
		        	})
		        	$(".lou .subtemp").on("mouseleave",".hideli p, .hideli span",function(){
		        		   $(this).css("color","#333");
		        	})
		        }
                //发送请求获取数据
              $.getJSON("json/louhide.json", json =>(createHide(json,"phone",0)) );
              $.getJSON("json/louhide.json", json =>(createHide(json,"computer",1)) );
		      $.getJSON("json/louhide.json", json =>(createHide(json,"home",2)) );
		      $.getJSON("json/louhide.json", json =>(createHide(json,"kitchen",3)) );
		      $.getJSON("json/louhide.json", json =>(createHide(json,"market",4)) );
		      $.getJSON("json/louhide.json", json =>(createHide(json,"household",5)) );
		      $.getJSON("json/louhide.json", json =>(createHide(json,"cartool",6)) );
		        //小轮播图
		      //循环绑定轮播
		       let minban = $(".minbanner");
		        minban.each(function(){
		        	var lis = $(this).children("ul").children("li");
		        	var length = lis.length; 
		        	var is = $(this).children("p").children("i");
		        	var nextli = $(this).children(".btnnext");
		        	var prevli = $(this).children('.btnprev');
		        	var timer;
		        	index = 0;
		        	//自动轮播
		            //全局
		            
		        	function auto(index){
		        		
		        	  timer = setInterval(()=>{
                          index = next(index); 		
                     },2000);
		        	}		        	
		        	function next(index){
		        		index ++;
		        		if(index >= length){
		        			index = 0;
		        		} 
		        	    lis.eq(index).stop().fadeIn().siblings().fadeOut();
		        	    is.eq(index).addClass("acti").siblings().removeClass("acti");
		        	      return index;
		        	}
		        	function prev(index){
		        		index--;
		        		if(index < 0){
		        			index = index = length;
		        		}
		        		lis.eq(index).stop().fadeIn().siblings().fadeOut();
		        		is.eq(index).addClass("acti").siblings().removeClass("acti");
		        	     return index;
		        	}
		        	
		        	//鼠标移入
		        	$(this).hover(()=>{
		        		clearInterval(timer);	
		        		nextli.addClass("actspan");
		        		prevli.addClass("actspan");
		        	},()=>{
		        		auto(index);
		        		nextli.removeClass("actspan");
		        		prevli.removeClass("actspan");
		        	})
		        	
		        	is.mouseenter(function(){      		
		        		index = $(this).index(); 
		        	  $(this).addClass("acti").siblings().removeClass("acti");	
		        	  lis.eq(index).stop().fadeIn().siblings().fadeOut();
		        	})
		        	prevli.click(function(){
		        		index = prev(index);		        		
		        	})
		        	nextli.click(function(){
		        		 index = next(index);		       
		        	})
		        	//调用函数
		        	 auto(index);
		        })
		        //楼层选项卡		       
		        $(".lou .tag").on("mouseenter","li",function(){
		        	      var index = $(this).index();		
		        	      var subright = $(this).parents(".lou").children().children(".subright");
		        	      subright.eq(index).addClass("subshow").siblings().removeClass("subshow");		        	     
		        })
		        
		        
		       // 楼层跳跃
		     function addClass(eles, index, lastClass, curClass) {
                    Array.from(eles).forEach((item) => {
                        item.className = lastClass;
                    })
                    eles[index].className = curClass;
                }
		    
		     function louEvent(){
		      var lous = document.getElementsByClassName('lou');		      
			  var fnav = document.getElementsByClassName('elevator')[0];
			  var  tag = fnav.getElementsByTagName('li');
			  var bottom =  document.getElementsByClassName("bottomnav")[0]; 		
			   Array.from(tag).forEach((item,index)=>{
			   	  //鼠标点击事件  点击跳到相应楼层
			        	 item.onclick = () =>{
			        	  //获取相应楼层距离屏幕的高度
			        	  var h = 0;
			        	  h = lous[index].offsetTop;
			        	  // 跳转
			        	  window.scrollTo(0,h);
			        	  }
			   	        // 移入高亮
			   	       $(item).hover(()=>{
			   	       	  $(item).toggleClass("eleli1");
			   	       })
			   	       		   	      
			   	       //屏幕滚动时浮动框跟随楼层高亮
			        	  //获取一层自身高度
			        	   var self = this;
			   	      var lou1 = lous[0].offsetTop - 800;				   	     			   	      
			   	      var loubt = bottom.offsetTop ;
			   	  
			   	       window.onscroll = function(ev){
			        	 var t = window.scrollY ;		        		 	
			       //屏幕距离小于一楼的距离时隐藏  超过第一层浮动导航显示 到达底部隐藏
		   	   	     	 if(t < lou1 || t > loubt - 200){ 
		   	   	     		fnav.style.display = 'none';
		   	   	     	 }
		   	   	     	else{
		   	   	     		fnav.style.display = 'block';
		   	   	     	  }
	   	   	     	    //屏幕滚动到相应楼层对应浮动导航高亮
		   	   	     	Array.from(lous).forEach((item,index)=>{
		   	   	     		//存在 小误差值
		   	   	     		var tmax = lous[index].offsetHeight + lous[index].offsetTop - 180;
		   	   	     		var tmin = lous[index].offsetTop - 180;
			        	    if( t >= tmin && t < tmax){
			        	    	addClass(tag,index,'','eleli2');	
			        	    	$(tag).eq(index).addClass("elel2").siblings().removeClass("elel2");
			        	    }
			        	    
			              })
                       }			   	    	      
			       })
		        }
		         //调用
		            louEvent();
		          
		      //$(".elevator").css("display","block");
		      
		      //侧边广告
		      $(".asidead ul li").mouseenter(function(){
		      	  $(this).addClass("asideli").siblings().removeClass("asideli");	
		      	  $(this).find(".asideshow").css("display","block");	      	  
		      })
		      
		     $(".asidead ul li").mouseleave(function(){
		     	$(this).removeClass("asideli")
		        $(this).find(".asideshow").css("display","none");
		        });
		      $(".adshow").show(2000);
		        
			});
			
			//购物车数量显示
//			var carnum = Cookie.getItem("goodnum") || "0"; 
//			$(".#carNum").text(carnum);
//			$(" #carNum").hover(function(){
//				console.log("0000");
//			})
			

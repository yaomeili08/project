//头部
$(function(){
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
			   	  str = data.map(function(ele){
			   	  	  var str1 = '';
			   	  	 str1 = ele.map(function(item){
			   	  	 	return `<a href="#">${item}</a>`;
			   	  	 }).join('');			   	  	 
			   	  	return `<li>${str1}</li>`;
			   	  }).join("");			   	  
			   	  //插入到navbox
			   	  let a = $(".cateleft .navbox");
			   	    a.html(str);
			   }
			   //左边发送请求并渲染
		     $.getJSON("json/nav.json", json =>(creNavl(json)));
		     
		     //切换选项卡		   
		    //移入对应li
		   $(" .cateleft .navbox").on("mouseenter","li",function(){
		   	      $(this).addClass('liact').siblings().removeClass('liact');
		   	      $(this).children("a").css("color","black");
		   	      let index = $(this).index();		   	     
		   	      $(".hidenav").eq(index).addClass("hideact");
		   })
		    $(" .cateleft .navbox").on("mouseleave","li",function(){
		   	      $(this).removeClass('liact');
		   	      $(this).children("a").css("color","white");
		   	      let index = $(this).index();		   	      
		   	      $(" .hidenav").eq(index).removeClass("hideact");
		   })	
		   //移入hidenav
		    $(".catelnav .hidenav").hover(function(){
		           $(this).toggleClass("hideact");
		            let index = $(this).index();
		          $(" .cateleft .navbox li").eq(index).toggleClass("liact");
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
		     		this.box = $(".bannerbox");
//		     		console.log(this.nextimg,this.previmg);
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
		     		$(".bannerbox , .navbox , .hidenav").hover(()=>{
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
		     	    	 self.lis.eq(index).fadeIn().siblings().fadeOut();
		     	    	 self.lis.css("background",libg[index]);
		     	    	 self.index = index;
		     	    })
		     	}
		     	
		     } 
		    
		     
		    
		       
		       //大轮播图实例化
		       let banner = new Banner();  
		         banner.init();
		       
               
		      
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
		        		//console.log(length);
		        		//console.log(index);
		        	    lis.eq(index).fadeIn().siblings().fadeOut();
		        	    is.eq(index).addClass("acti").siblings().removeClass("acti");
		        	      return index;
		        	}
		        	function prev(index){
		        		index--;
		        		if(index < 0){
		        			index = index = length;
		        		}
		        		lis.eq(index).fadeIn().siblings().fadeOut();
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
		        	  lis.eq(index).fadeIn().siblings().fadeOut();
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
		   	   	     	 	console.log("111");  	     	 	
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
		      	  $(this).toggleClass("asideli");	
		      	  $(this).find(".asideshow").css("display","block");	      	  
		      })
		      
		     $(".asidead ul li").mouseleave(function(){
		        $(this).find(".asideshow").css("display","none");
		        });
		      $(".adshow").show(2000);
		        
			});

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
		     
		      //小楼层轮播图
		       class Minbanner{
		       	  constructor(obj){
		       	  	this.index = 0;	
		       	  	this.minban = obj;
		       	  }
		       	  init(){
		       	  	//this.auto();
		     		this.mouevent();
		       	  }
		       	  getEle(){
		       	  
		       	  }
		       	  auto(){
		       	  	this.timer = setInterval(()=>{
                       this.next();
		     		
                     },2000)
		       	  }
		       	  next(){
		       	  	
		       	  }
		       	  mouevent(){
		       	  	 
		       	  }
		       }
		       
		       //大轮播图实例化
		       let banner = new Banner();  
		         banner.init();
		       //楼层轮播图循环实例化
		       
		       
		       let minbanner = new Minbanner();
		           minbanner.init();
		           
		        
			});

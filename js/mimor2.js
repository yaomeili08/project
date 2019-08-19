
function  minor(){
// 小框外层盒子
        var oWrap = document.querySelector('.wrapper');
        var smailbox = document.querySelector(".smail_box");
         // 大图片框节点
        var bigBox = document.querySelector('.big');
          //    大图片节点
        var bigImg = document.querySelector('.big img');
        // 小黄标
        var make = document.querySelector('.make');
        
        smailbox.onmousemove = function(e){
        	
        	var oEvent = e || event;
       var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
       var iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
       var disX = oEvent.clientX + iScrollLeft - make.offsetWidth / 2 - oWrap.offsetLeft;
       var disY = oEvent.clientY + iScrollTop - make.offsetHeight / 2 - oWrap.offsetTop;
           if (disX < 0) {
             disX = 0;
          } else if (disX > smailbox.offsetWidth - make.offsetWidth) {
            disX = smailbox.offsetWidth - make.offsetWidth;
           };
           if (disY < 0) {
             disY = 0;
           } else if (disY > smailbox.offsetHeight - make.offsetHeight) {
             disY = smailbox.offsetHeight - make.offsetHeight;
            };
            
            make.style.left = disX + 'px';
            make.style.top = disY + 'px';
           
		          /*算出move块在X轴的移动距离与总的移动距离的比例*/
		    var _pageX = disX / (smailbox.offsetWidth - make.offsetWidth);
		          /*这是一个0~1之间的数*/
		    /*算出move块在Y轴的移动距离与总的移动距离的比例*/
		    var _pageY = disY / (smailbox.offsetHeight - make.offsetHeight);
		    /*求出大图片在X轴的移动距离*/
		    var mX = _pageX * (bigImg.offsetWidth - bigBox.offsetWidth);
		    /*求出大图片在Y轴的移动距离*/
		    var mY = _pageY * (bigImg.offsetHeight - bigBox.offsetHeight);
		    
		    bigImg.style.left = -mX + 'px';
		    bigImg.style.top = -mY + 'px';
		    
         };
			   //事件引用
			smailbox.onmouseover = function(ev) {
			    bigBox.style.display = 'block';
			    make.style.display = 'block';
			    smailbox.onmousemove(); //兼容IE
			};
			smailbox.onmouseout = function() {
			    bigBox.style.display = 'none';
			    make.style.display = 'none';
			};
		
}
 (function () {
        // 小框外层盒子
        var oWrap = document.querySelector('.wrapper');
        var smail = document.querySelector('.smail');
        // 小图片框节点
        var smailBox = document.querySelector(".smail_box");       
        // 小图节点
        var smailImg = smailBox.children[0];
        // 大图片框节点
        var bigBox = document.querySelector('.big');
        //    大图片节点
        var bigImg = bigBox.children[0];
        // 小黄标
        var make = document.querySelector('.make');
        // 图片列表 
        var list = document.querySelector('.list');
        // 图片列表ul
        var ulNode = list.children[0];

        smail.addEventListener('click', bian);


        // 鼠标进入小图框
        smailBox.addEventListener('mousemove', xian);

        // 鼠标划出小图框
        smailBox.addEventListener('mouseout', cang);


        // 现方法
        function xian(e) {
            // 显示大图框
            bigBox.style.display = 'block';
            // 显示小黄标
            make.style.display = 'block';
            
//           var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//           var iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
//           var x = e.clientX + iScrollLeft - make.offsetWidth / 2 - smailBox.offsetLeft;
//           var y = e.clientY + iScrollTop - make.offsetHeight / 2 - smailBox.offsetTop;
//            if (x < 0) {
//                x = 0;
//            } else if (x > smailBox.offsetWidth - make.offsetWidth) {
//              x = smailBox.offsetWidth - make.offsetWidth;
//             };
//           if (y < 0) {
//               y = 0;
//           } else if (y > smailBox.offsetHeight - make.offsetHeight) {
//              y = smailBox.offsetHeight - make.offsetHeight;
//             };


            let x = e.clientX - smailBox.offsetLeft - make.offsetWidth -90;
            let y = e.clientY - smailBox.offsetTop  - make.offsetHeight - 30;
              console.log(e.clientX,e.clientY);
            x <= 0 ? x = 0 : x;
            x >= smailBox.offsetWidth - make.offsetWidth ? x = smailBox.offsetWidth - make.offsetWidth : x;
            y <= 0 ? y = 0 : y;
            y >= smailBox.offsetHeight - make.offsetHeight ? y = smailBox.offsetHeight - make.offsetHeight : y;
            // 小黄标移动
            make.style.left = x + 'px';
            make.style.top = y + 'px';
            // 大图移动
            let bigX = x * (bigImg.offsetWidth - bigBox.offsetWidth) / (smail.offsetWidth - make.offsetWidth);
            let bigY = y * (bigImg.offsetWidth - bigBox.offsetWidth) / (smail.offsetWidth - make.offsetWidth);
            bigImg.style.marginLeft = -bigX + "px";
            bigImg.style.marginTop = -bigY + "px";
        }

        // 藏方法
        function cang(e) {
            bigBox.style.display = 'none';
            make.style.display = 'none';
        }


        function bian(e) {
            // ul可移动最大距离
            var juLi = parseInt(window.getComputedStyle(list).width) - parseInt(window.getComputedStyle(ulNode)
                .width);
//
            // 左边按钮
            if (e.target.className === "left") {
                let ul_px = parseInt(window.getComputedStyle(ulNode).marginLeft);
                ul_px <= juLi ? ulNode.style.marginLeft = juLi + 'px' : ulNode.style.marginLeft = ul_px - 90 + 'px';
            }
            // 右边按钮
            if (e.target.className === 'right') {
                let ul_px = parseInt(window.getComputedStyle(ulNode).marginLeft);
                ul_px >= 0 ? ulNode.style.marginLeft = '0px' : ulNode.style.marginLeft = ul_px + 90 + 'px';
            }
            // 点击列表图片换大图图
            if (e.target.tagName === "IMG") {
                smailImg.src = e.target.src;
                bigImg.src = e.target.src;
            }

        }
    })()
(function (doc, win) {
	 var docEl = doc.documentElement,
	        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	        recalc = function () {
	            var clientWidth = docEl.clientWidth;
	            if (!clientWidth) return;
	            if(clientWidth>=640){
	                docEl.style.fontSize = '100px';
	            }else if(640<clientWidth&&clientWidth<750){
	                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	            }else if(320<=clientWidth&&clientWidth<=640){
	                docEl.style.fontSize = 25 * (clientWidth / 375) + 'px';
	            }
	        };
	
	    if (!doc.addEventListener) return;
	    win.addEventListener(resizeEvt, recalc, false);
	    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

/*上述js的意思是：

如果页面的宽度超过了640px，那么页面中html的font-size恒为100px，否则，页面中html的font-size的大小为： 100 * (当前页面宽度 / 640)

rem原理：
为什么是640px？
对于手机屏幕来说，640px的页面宽度是一个安全的最大宽度，保证了移动端页面两边不会留白。注意这里的px是css逻辑像素，与设备的物理像素是有区别的。如iPhone 5使用的是Retina视网膜屏幕，使用2px x 2px的 device pixel 代表 1px x 1px 的 css pixel，所以设备像素数为640 x 1136px，而它的CSS逻辑像素数为320 x 568px。
如果要切移动端页面，你可以先把效果图宽度等比例缩放到640px，很好用。
为什么要设置html的font-size？
rem就是根元素（即：html）的字体大小。html中的所有标签样式凡是涉及到尺寸的（如： height,width,padding,margin,font-size。甚至，left,top等）你都可以放心大胆的用rem作单位。
如果你把html的font-size设为20px，前面说过，rem就是html的字体大小，那么1rem = 20px。
px与rem换算：
　一开始把html的font-size设为100px，此时1rem = 100px，那么原网页的宽55px，高37px的元素样式就可以这么设置 ↓

width: 0.55rem;
height: 0.37rem;*/

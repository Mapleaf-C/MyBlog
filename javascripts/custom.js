//@ 插件配置--------------------------------------
$(document).ready(function(){
	/* @group header 顶层容器
	====================================================*/
	//Superfish
	if($.isFunction($.fn.superfish)) {
	    $('#header ul.nav').superfish({ 
	      delay:       500,                             // 回收延迟
	      animation:   {opacity:'show',height:'show'},  // Y轴透明度变化（下拉效果）
	      speed:       'fast',                          // 动画速度
	      autoArrows:  true                      	   // 自动添加箭头
	    });
	}

	//Drop_on_the_left
	$("#header ul.nav > li").drop_on_the_leaf();
	/* @group main 主容器
	====================================================*/
	//sliding_links
	$("#sidebar ul li a").sliding_links();
	//prettyPhoto
	if($.isFunction($.fn.prettyPhoto)){
		$("a[rel^='prettyPhoto']").prettyPhoto({
			animationSpeed:'fast',
			options:0.8,	 //透明度
			overlay_gallery: false,
			theme:'facebook' // light_rounded / dark_rounded / light_square / dark_square / facebook
		});
	}
	//prettyPhoto_overlay
	$(window).load(function(){
		$("a[rel^='prettyPhoto'] img" ).prettyPhoto_overlay();
	});

	//reply_slide
	$(".reply-button").bind("click",function(){
		$(this).reply_slide();
	});

});

//@自定义---------------------------------------
(function($){
	//Drop_on_the_left对于靠右的节点，将下拉菜单显示在左边
	$.fn.drop_on_the_leaf = function(options){
		var defaults = {
			 class_name : "right",
			 node_sum:2
			};
		var options = $.extend(defaults,options);//？？为何要这么组织
		var length = this.size();
		return this.each(function(i){
			if((length - options.node_sum) <= i){
				$(this).addClass(options.class_name);
			}
		});
	};
	//sliding_links 用于实现鼠标动画
	$.fn.sliding_links = function(options){
		var defaults = {
			animation_speed :120,
			animation_distance:5
		}
		var options = $.extend(defaults,options);
		return this.each(function(){
		  	var pl = $(this).css("padding-left");
			var	pr = $(this).css("padding-right");
		  	$(this).hover(
				function(){ 	
				   	$(this).stop(false,true).animate({
					   	paddingLeft:parseInt($(this).css("padding-left").replace("px",""))+options.animation_distance+"px",
					   	paddingRight:parseInt($(this).css("padding-right").replace("px",""))+options.animation_distance+"px"
				   	},options.animation_speed);
			  	},
			  	function(){
			  		$(this).stop(false,true).animate({
			  			paddingLeft:pl,
			  			paddingRight:pr
			  		},options.animation_speed);
			  	}
			  );

		});
	};
	//prettyphoto_overlay 用于实现prettyphoto的入口覆盖效果
	$.fn.prettyPhoto_overlay = function(options){
		var defaults = {
			opacity:0.5,
			animate_speed:200,
			class_name:'prettyPhoto-image'
		};
		var options = $.extend(defaults,options);
		return this.each(function(){
			var img = $(this);//标记使用prettyPhoto的图片
			var link = $(this).parent();//图片所属的a标签
			//在a标签的末尾插入一个span
			var bg = $("<span class='"+options.class_name+"'<span>").appendTo(link);
			link.bind('mouseenter',function(){//设置该span覆盖原图片
				var width = img.width();
				var height = img.height();
				var position = img.position();
				bg.css({width:width,height:height,top:position.top,left:position.left});
			})
			$(this).hover(
				function(){img.stop().animate({opacity:options.opacity},options.animate_speed);},
				function(){img.stop().animate({opacity:1},options.animate_speed)}
			);
		});
	};
	//reply_slide
	$.fn.reply_slide = function(options){
		var defaults = {
			class_name:"active",
			slide_speed:"nomal"
		};
		var options = $.extend(defaults,options);
		var panel = $(this).siblings(".reply-panel");
		return $(this).each(function(){
			var flag = !panel.is("."+options.class_name);
			$(".reply-panel"+"."+options.class_name).removeClass(options.class_name).slideUp(options.slide_speed);	
			if(flag){
				panel.addClass(options.class_name).slideDown(options.slide_speed);
			}								
		});
	};
})(jQuery);


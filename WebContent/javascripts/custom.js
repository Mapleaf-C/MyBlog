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
	$("#main").css("min-height",$(window).height()-225);
	//----------初始化------------------
	$(function(){
		//初始化窗口输入框
		var outer = $(".inputOuter");
		var input = outer.children(".inputStyle");
		var lab = outer.siblings(".inputTips");
		input.attr("value","");
		var text=input.attr("value");
		if(text!= null&& text!= "") lab.css("display","none");
		//初始化背景图片
		$(".lay_bg").resizeBackground({
			bg_class:"lay_bg_img"
		});
	});
	//窗口onResize事件
	$(window).resize(function(){
		$("#main").css("min-height",$(window).height()-225);
		$(".lay_bg").resizeBackground({
			bg_class:"lay_bg_img"
		});
	});
	//sliding_links
	$("#sidebar ul li a" ).sliding_links();
	//prettyPhoto
	if($.isFunction($.fn.prettyPhoto)){
		$("a[rel^='prettyPhoto']").prettyPhoto({
			animationSpeed:'fast',
			options:0.8,	 //透明度
			overlay_gallery: false,
			theme:'facebook' // light_rounded / dark_rounded / light_square / dark_square / facebook
		});
	}
	$(window).load(function(){
		$("a[rel^='prettyPhoto'] img" ).prettyPhoto_overlay();
	});

	//reply_slide
	$(".reply-button").bind("click",function(){
		$(this).reply_slide();
	});
	//pb_addItem
	$(".post-bar").pb_addItem();
	//edit_action1
	$("#portfolio .i-edit").click(function(){
		$(this).edit_action1();
	});
	$("#album .i-edit").click(function(){
		$(this).edit_action1({
			maxlength:15
		});
	});
	//edit_action2
	$("#portfolio .dlbc-edit").dblclick(function(){
		$(this).edit_action2({
			height:"60px",
			maxlength:60
		});
	});
	$("#album .dlbc-edit").dblclick(function(){
		$(this).edit_action2({
			height:"30px",
			maxlength:50
		});
	});
	
	/*@group Active 类添加
	==========================================*/
	//input

	$(".inputOuter .inputStyle").live("focus",function(){
	//使用live绑定事件到现在及未来出现的所有对象
		var outer = $(this).parent(".inputOuter");
		var lab = outer.siblings(".inputTips");
		lab.removeClass("inputTips");
		lab.addClass("inputTips_focus")
		outer.removeClass("inputOuter");
		outer.addClass("inputOuter_focus");
	});
	$(".inputOuter_focus .inputStyle").live("blur",function(){
		var outer = $(this).parent(".inputOuter_focus");
		var lab = outer.siblings(".inputTips_focus");
		var text = $(this).attr("value");
		lab.removeClass("inputTips_focus");
		lab.addClass("inputTips")
		outer.removeClass("inputOuter_focus");
		outer.addClass("inputOuter");
		if(text== null|| text=="") lab.css("display","block");
	});
	$(".inputOuter_focus .inputStyle").live("keydown",function(){
		var outer = $(this).parent(".inputOuter_focus");
		var lab =　outer.siblings(".inputTips_focus");
		lab.css("display","none");
	});
  	$(".inputStyle").live("keyup",function(){
  		var outer = $(this).parent();
		var lab =　outer.siblings();
		var text = $(this).attr("value");
		if(text== null|| text=="") lab.css("display","block");
	});
	/*@group Animate
	===========================================*/
	$("a[class^='i-s-']").hover(
		function(){$(this).stop().animate({opacity:1},200)},
		function(){$(this).stop().animate({opacity:0.3},200)}
	);
	// $(".lay_bg").resizeBackground();

});

//@自定义---------------------------------------
(function($){
	//重设背景尺寸
	$.fn.resizeBackground = function(options){
		var defaults = {
			bg_class:"bg_img"
		};
		var options = $.extend(defaults,options);

		var bg = $(this);
		var bg_img = bg.children("."+options.bg_class);
		var cw = $(window).width();
		var ch = $(window).height();
		var iw = bg_img.width();
		var ih = bg_img.height();
		bg.css({"width":cw,"height":ch});
		bg_img.css({"width":cw,"height":ch});
		if(cw / ch > iw / ih){
			var new_h = cw * ih / iw;
			var imgTop = (ch - new_h) /2;
			bg_img.css({"width":cw,"height":new_h,"top":imgTop,"left":""});
		}else{
			var new_w = ch * iw / ih;
			var imgLeft = (cw - new_w) /2;
			bg_img.css({"width":new_w,"height":ch,"top":"","left":imgLeft});
		}
	}
	//Drop_on_the_left对于靠右的节点，将下拉菜单显示在左边
	$.fn.drop_on_the_leaf = function(options){
		var defaults = {
			 class_name : "right",
			 node_sum:2
			};
		var options = $.extend(defaults,options);
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
				bg.css({"width":width,"height":height,"top":position.top,"left":position.left});
			})
			$(this).hover(
				function(){img.stop().animate({opacity:options.opacity},options.animate_speed);},
				function(){img.stop().animate({opacity:1},options.animate_speed)}
			);
		});
	};
	//reply_slide 回复框toggle
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
	//pb_addItem post-bar动态展示
	$.fn.pb_addItem = function(options){
		var defaults = {
		};
		var options = $.extend(defaults,options);
		var body = $("body");
		return $(this).each(function(){
			var bar = $(this);
			var label = "";
			if(body.hasClass("admin")){
				label = $("<a class=\"i-sign\" title=\"添加到备选\" href=\"#\">XXX</a>"
							+"<a class=\"i-report\" title=\"举报\" href=\"#\">XXX</a>"
							+"<a class=\"i-forward\" title=\"转发\"href=\"#\">XXX</a>"
							+"<a class=\"i-recommend\" title=\"推荐\" href=\"#\">XXX</a>"
							+"<a class=\"i-comment\" title=\"评论\" href=\"#\">XXX</a>");
			}else if(body.hasClass("visitor")){
				label = $("<a class=\"i-report\" title=\"举报\" href=\"#\">XXX</a>"
							+"<a class=\"i-forward\" title=\"转发\"href=\"#\">XXX</a>"
							+"<a class=\"i-recommend\" title=\"推荐\" href=\"#\">XXX</a>"
							+"<a class=\"i-comment\" title=\"评论\" href=\"#\">XXX</a>");			
			}else if(body.hasClass("user")){
				label = $("<a class=\"i-delete\" title=\"删除\" href=\"#\">XXX</a>");
			}
			bar.append(label);
		});

	}
	//edit_action1 定焦target目标进行编辑 失焦后保存为文本
	//*Uncaught SyntaxError
	$.fn.edit_action1 = function(options){
		var defaults = {
			target_class: ".edit-target",
			maxlength:10
		};
		var options = $.extend(defaults,options);
		var target = $(this).siblings(options.target_class);
		return $(this).each(function(){
			var txt = target.text();
			var display = target.css("display");
			var input = $("<input typy='text' maxlength='"+options.maxlength+"'</input>").attr("value",txt);
			target.css("display","none");
			target.before(input);
			$(input)[0].focus();
			/*为输入框添加失焦事件*/
			$(input).blur(function(){
				var newtxt = $(this).attr("value");
				if(newtxt != txt){
					newtxt=newtxt.replace(/\s+/g,"");
					if(newtxt== null||newtxt == "") {
						alert("内容不能为空！");
						$(this)[0].focus();
						return(1);
					}
					//这里提交。。。
					else target.text(newtxt);
				}
				input.remove();
				target.css("display",display);
				return(0);
			});
			
		});
	};
	//edit_action2 双击对目标进行编辑，失焦保存
	$.fn.edit_action2 = function (options) {
		var defaults = {
			width : "98%",
			height: "50px",
			empty:true,
			empty_string:"暂无描述",
			maxlength:100
		};
		var options = $.extend(defaults,options);
		var target = $(this);
		return $(this).each(function(){
			var txt = target.text();
			var display = target.css("display");
			var textarea = $("<textarea maxlength='"+options.maxlength+"'></textarea>").attr("value",txt);
			target.css({"display":"none"});
			textarea.css({"width":options.width,"height":options.height,"resize":"none","overflow":"hidden"});
			//textareaCounter
			target.before(textarea);
			if($.isFunction($.fn.textareaCount)){
				textarea.textareaCount({
					'maxCharacterSize': options.maxlength,
					// 'originalStyle': 'originalTextareaInfo',
 					// 'warningStyle' : 'warningTextareaInfo',
 					'warningNumber': 40,
 					'displayFormat' : '#input/#max'//#input当前、#word词量、#max最大、#left剩余
				});
			}
			
			$(textarea)[0].focus();
			/*为输入框添加失焦事件*/
			$(textarea).blur(function(){
				var newtxt = $(this).attr("value");
				if(newtxt != txt){
					newtxt=newtxt.replace(/\s+/g,"");
					if(newtxt == null||newtxt == "") {
						if(options.empty){
							newtxt = options.empty_string;
						}
						else{
							alert("内容不能为空！");
							$(this)[0].focus();
							return(1);
						}
					}
					//这里提交。。。
					target.text(newtxt);
				}
				target.siblings(".charleft").remove();//textareaCounter自动添加的层
				textarea.remove();

				target.css("display",display);
				return(0);
			});
		});
	};
})(jQuery);


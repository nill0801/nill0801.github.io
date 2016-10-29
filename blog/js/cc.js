// JavaScript Document
$(function(){

	/* 匹配翻页 */
	var index = window.location.href.split('/').length-1;
	var href = window.location.href.split('/')[index];
	//alert(href)
	$('.nav_list li a[href="'+href+'"]').addClass('active')


	/* 导航nav */
	$('.nav_list li').hover(function(){
		$(this).find('.down').stop().slideToggle({duration:1000,easing:'easeOutBounce'})
	});
	// a 捕获li
	$('.nav_list li').delegate('a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		//$(this).children(0).css({color:'#FFF'}).siblings().removeAttr('color')//怎么移出css
	});

	/*登陆按钮*/
	$('.login').click(function(){
		$('.login_box').css('display','block');
	});
	$('.login_close').click(function(){
		$('.login_box').css('display','none');
	})



	/* 搜索框焦点事件 */
	$('.txt').get(0).onfocus = function(){
		$(this).stop().animate({width:178},{duration:1000,easing:'easeOutBounce'})
		if(this.value == '请输入内容'){
			this.value = '';
		}
	};

	$('.txt').get(0).onblur = function(){
		$(this).stop().animate({width:128},{duration:1000,easing:'easeOutBounce'})
		if(this.value == ''){
			this.value = '请输入内容';
		}
	};

	/*$('.nav_list li').hover(function(){
		$(this).find('.down').stop().slideDown()

	},function(){
		$(this).find('.down').stop().slideUp()
	});
	*/

	/* 轮播图 */
	var i = 0;
	var clone = $('.img li').first().clone();
	$('.img').append(clone);
	var size = $('.img li').size();

	//创建圆点
	for(var j=0;j<size-1;j++){
		$('<li>').appendTo($('.num'));
		$('.num li').first().addClass('active');
	};

	//让圆点操作轮播图
	$('.num li').hover(function(){
		var index = $(this).index();
		i = index;
		$('.img').stop().animate({left:i*-1000},500,'swing');
		$(this).addClass('active').siblings().removeClass('active');
	});

	//自动轮播
	var time = setInterval(function(){
		i++;
		move();
	},2000);

	//滑入banner停止自动轮播
	$('.banner').hover(function(){
		clearInterval(time);
	},function(){
		time = setInterval(function(){
			i++;
			move();
		},2000);
	});

	//向左prev按钮
	$('.prev').click(function(){
		i--;
		move();
	});


	//向右next按钮
	$('.next').click(function(){
		i++;
		move();
	});

	//公用部分
	function move(){
		if(i==-1){
			$('.img').css({left:(size-1)*-1000});
			i = size-2;
		};

		if(i==size){
			$('.img').css({left:0});
			i = 1;
		};

		$('.img').stop().animate({left:i*-1000},500,'swing');
		if(i==size-1){
			$('.num li').eq(0).addClass('active').siblings().removeClass('active');
		}else{
			$('.num li').eq(i).addClass('active').siblings().removeClass('active');
		};

	};



	/*多行省略号*/
	(function($){
		$.extend($.fn,{
			doted : function(options){
				return this.each(function(){
					var divH = $(this).height();
					$(this).wrapInner('<p></p>');
					var $p = $("p",$(this)).eq(0);
					while ($p.outerHeight() > divH) {
						$p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
					};
				});
			},
		});
	})(jQuery);

	$(document).ready(function(){
		$(".figcaption").doted();
	});


	/* 封装函数有问题*/
	function tab(obj,index){
		$(obj).parent().prev(".click_nav").find("li").eq(index).addClass('active').siblings().removeClass('active');
		$(obj).eq(index).css({'display':'block'}).siblings().css({'display':'none'})
	}



	/* 选项卡 */
	$('.tab_nav li').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab_list').eq($(this).index()).css({'display':'block'}).siblings().css({'display':'none'})

	});


	/* 点击排行选项卡 */
	$('.click_nav li').mouseover(function(){
		var index = $(this).index();
		tab('.click_list',index)
	})






	/* 返回顶部 */
	$('#backtop').on('click',function(){
		//alert(1)
		$('body,html').stop().animate({scrollTop:0},500)
	})
	$(window).on('scroll',function(){
		var t = $(this).scrollTop();
		if(t>200){
			$('#backtop').fadeIn();
		}else{
			$('#backtop').fadeOut();
		}
	});






});

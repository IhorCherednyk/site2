$(document).ready(function () {
	initJS();
});

function initJS () {
		$(".carousel-equipment").owlCarousel({
		loop:true,
		responsive:{
			0:{
				items:1,
			},
			520:{
				items:1,
			},
			560:{
				items:2,
			},
			768:{
				items:2,
			},
			992:{
				items:3,
			},
			1200:{
				items:4,
			}
		}
	});



	$(".carousel-partners").owlCarousel({
		loop:true,
		margin:10,
		nav:true,
		navText:false,
		responsive:{
			0:{
				items:1,
			},
			520:{
				items:2,
			},
			560:{
				items:3,
			},
			768:{
				items:3,
			},
			992:{
				items:4,
			},
			1200:{
				items:5,
			}
		}
	});
	//Убираем прокрутку карты в стили добавляем pointer-events: none
	var mapMouseLeave = function (event) {
		var th = $(this);

		th.on('click', mapClick);
		th.off('mouseleave', mapMouseLeave);
		th.find('iframe').css("pointer-events", "none");
	}
	var mapClick = function (event) {
		var th  = $(this);
		console.log("hi")
		th.off('click', mapClick);
		th.find('iframe').css("pointer-events", "auto");
		th.on('mouseleave', mapMouseLeave);
	}
	$('.s-contact-map').on('click', mapClick);


	$(".s-equipment").waypoint(function(){
		$(".carousel-item .carousel-wrap").each(function(index) {
			var ths = $(this);
			setInterval(function() {
				ths.removeClass("carousel-wrap-off").addClass("carousel-wrap-on");	
			}, 100*index);
		});

	}, {
		offset: "55%"
	});

	$(".s-direct .item-vertical p").equalHeights();
	$(".carousel-text").equalHeights();
	$(".members-wrap .members-coment p ").equalHeights();

	$(".portfolio-item").each(function(e) {

		var th = $(this);

		th.attr("href", "#portfolio-img-" + e)
		.find(".portfolio-popup")
		.attr("id", "portfolio-img-" + e);

	});




	$(".portfolio-item").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
	});

	// Помещаем в libs.js магнифик джс скрипт конверитруем css в sass  и подключаем в мейн ссылке задаем общий класс для магнифика подключаем код
	$(".mfp-gallery").each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-zoom-in',
			type: 'image',
			tLoading: '',
			gallery:{
				enabled: true,
			},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random(); 
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
				},
				imageLoadComplete: function() { 
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}
			}
		});
	});

	$(".mouse-icon").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-adv").offset().top
		},500)
	});

	// Анимация чисел 1. Подключаем джс 2. http://codepen.io/agragregra/pen/QyNvrN подключаем код 3. Числам доблавляем дадат каунт.4 пишем путь к спанам
	$(".s-adv").waypoint(function(){
		
		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 1200,
			easing: 'swing',
			step: function() {
				$(".s-adv-item h3 span").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".s-adv-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "1.8125em",
				numberStep: comma_separator_number_step},
				1200);
		});
		this.destroy();
	},{
		offset: '70%'
	});

	//Animation
	$(".s-members .members-wrap").animated("bounceInDown")

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});
	

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });


	/*
 * Replace all SVG images with inline SVG Задаем картинку через img даем ей класс и в браузер конверирует распакованый хтмл код для свг задаем ховер через path fill: #444 !important
 */
 $('img.img-svg').each(function(){
 	var $img = $(this);
 	var imgID = $img.attr('id');
 	var imgClass = $img.attr('class');
 	var imgURL = $img.attr('src');

 	$.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = $(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
		if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		}

		// Replace image with new SVG
		$img.replaceWith($svg);

	}, 'xml');

 });


}
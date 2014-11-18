var site = {
	menuHeight: $('nav').height(), 
	//productMenu: $('.productMenu'), 
	// productMenuHeight: $('.productMenu').height(), 
	// productMenuOffset: -(this.productMenuHeight + this.menuHeight), 
	// infoLink: $('li.info a'), 
//	shopLink: $('li.shop a'),
	// brandInfo: $('#about'),
	// brandLink: $('a.about'),
	// infoMenu: $('.infoMenu'),
	//scrollNav: $('ul.categories, ul.brands'),
	page: $('body'),
	doc: $(document),
	win: $(window),
	wrap: $('#wrap'),
	contents: $('#wrap > *'),
	//header: $("header.main"),
	menuDelay: 750,
	ease: 'easeInOutQuint',
	scroll: {
		bottom: false
	},

	bottom: function(){
		//l('bottom fired');
		var dH = $(document).height(), 
			wH = $(window).height();

		if(this.isTouchy() && window.innerWidth < 500) {
			var aboutHeight = $('#about').height() + $('footer').height();
			return dH - (wH + aboutHeight / 2);
		} else {
			return dH - wH;
		}
	},

	isTouchy: function(){

		return 'ontouchstart' in window  || 'onmsgesturechange' in window;
	},

	pageInit: function(){
		FastClick.attach(document.body);
		this.scrollInit();
		this.slickSlider();
		this.dropDown();
		this.backToTop();
		this.brandJump();
	},

	scrollInit: function(){
		$('ul.categories a, ul.brands a').on({
			click: function(e){
				e.preventDefault();
				var anchor = $(this).attr('href');
				site.page.scrollTo(anchor, {
					easing: site.ease,
					offset: -80,
					duration: 1500
				});

			}
		});
	},
	
	dropDown: function(){
		//l('dropdown fired');
		$('.dropdown dt a').on({
			click: function(e) {
				e.preventDefault();
				if ($(".dropdown dd ul").hasClass('active')) {
					$(".dropdown dd ul, .dropdown dt a span").removeClass('active');
				} else {
					$(".dropdown dd ul, .dropdown dt a span").addClass('active');
				}
			}
		});

		$('.dropdown dd ul li a').on({
			click: function(e) {
				e.preventDefault();
			    var text = $(this).html();
			    $(".dropdown dt a span").html(text);
			    $(".dropdown dd ul, .dropdown dt a span").removeClass("active");
			    $("#result").html("Selected value is: " + site.getSelectedValue("sample"));
				$("button").removeClass();
			}
		});
	},
	
	navTouch: function(){
		//l('navTouch fired');
		var shopLink = $('li.shop a');
		var infoLink =  $('li.info a');

		var shopMenu = $('.productMenu');
		var infoMenu = $('.infoMenu');
		var header = $("header.main");
		
		var shopMenuHeight = shopMenu.height();
		var shopMenuOffset = -(shopMenuHeight + this.menuHeight);


		// on touch devices bigger than 700 (tablets)
		if ( this.isTouchy() && window.innerWidth > 700 ) {

			l('MEDIA: TOUCH > 700');
			site.page.addClass('mobile');

			shopLink.on('click', function(e){
				e.preventDefault();
				
				var scrollPos = $('body').scrollTop();
				
				if($(this).hasClass('active')) {
					$(this).removeClass('active');
					shopMenu.removeClass('active');
				} else {
					infoLink.removeClass('active');
					infoMenu.removeClass('active');
					shopMenu.addClass('active');
					$(this).addClass('active');
				}
			});

			site.page.on({
				touchmove: function(){
					l('touchmoved');
					infoMenu.removeClass('active');
					infoLink.removeClass('active');
					shopLink.removeClass('active');
					shopMenu.removeClass('active');
				}
			});

		// on touch devices smaller than 700 (tablets)
		} else if ( this.isTouchy() && window.innerWidth < 700 ) {

			l('MEDIA: TOUCH < 700');
			site.page.on({
				touchmove: function(){
					l('touchmoved');
					infoMenu.removeClass('active');
					infoLink.removeClass('active');
				}
			});

			shopLink.on('click', function(e){
				e.preventDefault();
				l('shoplink clicked');
				var scrollPos = $('body').scrollTop();
				if($(this).hasClass('active')) {

					$(this).removeClass('active');
					shopMenu.removeClass('active');
					site.page.removeClass('locked');

				} else {

					infoLink.removeClass('active');
					infoMenu.removeClass('active');
					shopMenu.addClass('active');
					$(this).addClass('active');
					site.page.addClass('locked');

				}
			});

		// on desktops 
		} else {

			l('MEDIA: DESKTOP');
			shopLink.on('click', function(e){
				e.preventDefault();
				l('shopLink clicked');
				if($(this).hasClass('active')) {

					// l('ifed');
					$(this).removeClass('active');
					shopMenu.removeClass('active');

				} else {

					// l('elsed');
					infoLink.removeClass('active');
					infoMenu.removeClass('active');
					shopMenu.addClass('active');
					$(this).addClass('active');

				}
			});

			site.doc.on({
				scroll: function(){
					//l('scrolled');
					infoMenu.removeClass('active');
					infoLink.removeClass('active');
				}
			});
		}


		infoLink.on('click', function(e){
			l('infoLink click');
			e.preventDefault();
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				infoMenu.removeClass('active');
			} else {

				shopLink.removeClass('active');
				shopMenu.removeClass('active');

				infoMenu.addClass('active');
				$(this).addClass('active');
				site.page.removeClass('locked');
			}	
		});

		header.on({
			mouseleave: function() {
				//l('header mouseleft');
				this.timer = setTimeout(function(){
					if(infoLink.hasClass('active')) {
						infoLink.removeClass('active');
						infoMenu.removeClass('active');
						infoLink.removeClass('active');
					}
					if(shopLink.hasClass('active')) {
						shopLink.removeClass('active');
						shopMenu.removeClass('active');
					}
				}, site.menuDelay);
			},
			mouseenter: function() {
				//l('header mouseenter');
				clearTimeout(this.timer);
			}
		});
	},
	
	backToTop: function(){
		$('#top a').on({
			click: function(e){
				e.preventDefault();
				l(this.ease);
				$('body').animate({ scrollTop: 0 }, { 
					easing: site.ease,
					duration: 1500,
					complete: function(){
						l('scrolled to top');
					}
				});			
			}
		});
	},
	
	getSelectedValue: function(id) {
		l('getSelectedValue fired');
	    return $("#" + id).find("dt a span.value").html();
	},

	slickSlider: function(){
		//l('slickslider fired');
		$('.images').slick({
			arrows: false
		});

		$('.images').on('click', function(e){
			e.preventDefault();
			$(this).slickNext();
		});
	}, 

	brandJump: function(){
		$('a.about').on({
			click: function(e){
				e.preventDefault();

				site.page.animate({ scrollTop: site.bottom() }, { 
					easing: site.ease,
					duration: 1500,
					complete: function(){
						l('scrolled ' + site.bottom() + ' pixels');
					}
				});

			}
		});
	},

	loadContent: function(href){
	
		history.pushState(null, null, href);  
		site.wrap.addClass('hidden').promise().done(function(){
			//l('2 hidden wrap');
			site.page.animate({scrollTop: 0}, {
				duration: 500,
				easing: site.ease,
				complete: function(){
					//l('3 scroll');
					var contents = href + ' #wrap > *';
					site.wrap.load(contents, function(e){
					
					 	//l('4 loaded ' + href);
					 	site.wrap.removeClass('hidden');
						site.pageInit();
					 	site.pageLinkAjax();;
						site.replacePageTitle();
					});
				}
			});

		});
	},
	replacePageTitle: function(){
		
		var wrapTitle = $('#wrap h1').text();
		if(wrapTitle.length) {
			$('title').empty().text('Nowhere - ' + wrapTitle);
		} else {
			$('title').empty().text('Nowhere');
		}
		
	},
	menuLinkAjax: function(){
		$('.productMenu a').on({
			click: function(e) {
				l('menu clicked');
				e.preventDefault();
				$('li.shop a').removeClass('active');
				$('.productMenu').removeClass('active');	

				var link = $(this).attr('href');
				site.loadContent(link);
			}
		});
	},
	pageLinkAjax: function(){
		$('div.products div.product a').on({
			click: function(e) {
				l('page clicked');
				e.preventDefault();
			    var link = $(this).attr('href');
			    site.loadContent(link);
			}
		}); 
	},
	checkBackButton: function(){
		this.win.on('popstate', function(e){
			e.preventDefault();
			link = location.pathname //.replace(/^.*[\\\/]/, ''); //get filename only
			//l('pathname   ' + location.pathname);
			site.loadContent(link);
		});

	} // end
}

var l = function(message){
	console.log(message);
}

site.doc.on({
	scroll: function(e){
		var nearBottom = site.bottom() - 300;
		if ( site.page.scrollTop() > nearBottom ) {
			site.scroll.bottom = true
		} else {
			site.scroll.bottom = false
		}

		if ( site.scroll.bottom ) {
			$('#top').addClass('active');
		} else {
			$('#top').removeClass('active');
		}

	}
});

site.win.load(function(){
	site.page.removeClass('hidden');
});

site.doc.ready(function(){
	site.navTouch();
	site.pageInit();
	site.menuLinkAjax();
	site.pageLinkAjax();
	site.checkBackButton();
});
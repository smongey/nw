var site = {
	menuHeight: $('nav').height(), 
	productMenu: $('.productMenu'), 
	productMenuHeight: $('.productMenu').height(), 
	productMenuOffset: -(this.productMenuHeight + this.menuHeight), 
	infoLink: $('li.info a'), 
	shopLink: $('li.shop a'),
	brandInfo: $('#about'),
	brandLink: $('a.about'),
	infoMenu: $('.infoMenu'),
	scrollNav: $('ul.categories, ul.brands'),
	page: $('body'),
	doc: $(document),
	header: $("header.main"),
	menuDelay: 750,
	ease: 'easeInOutQuint',
	backTop: $('#top a'),
	scroll: {
		bottom: false
	},

	bottom: function(){
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
		this.navTouch();
	},

	scrollInit: function(){
		this.scrollNav.localScroll({
			offset: -80,
			duration: 1500,
			easing: site.ease
		});
	},

	navTouch: function(){
		// on touch devices bigger than 700 (tablets)
		if(site.isTouchy() && window.innerWidth > 700) {

			l('touch bigger than 700');
			site.page.addClass('mobile');

			site.shopLink.on('click', function(e){
				e.preventDefault();
				
				var scrollPos = $('body').scrollTop();
				
				if($(this).hasClass('active')) {
					$(this).removeClass('active');
					site.productMenu.removeClass('active');
				} else {
					site.infoLink.removeClass('active');
					site.infoMenu.removeClass('active');
					site.productMenu.addClass('active');
					$(this).addClass('active');
				}
			});

			site.page.on({
				touchmove: function(){
					l('touchmoved');
					site.infoMenu.removeClass('active');
					site.infoLink.removeClass('active');
					site.shopLink.removeClass('active');
					site.productMenu.removeClass('active');
				}
			});

		// on touch devices smaller than 700 (tablets)
		} else if ( site.isTouchy() && window.innerWidth < 700 ) {

			l('touch smaller than 700');
			site.page.on({
				touchmove: function(){
					l('touchmoved');
					site.infoMenu.removeClass('active');
					site.infoLink.removeClass('active');
				}
			});

			site.shopLink.on('click', function(e){
				e.preventDefault();
				l('shoplink clicked');
				var scrollPos = $('body').scrollTop();
				if($(this).hasClass('active')) {

					$(this).removeClass('active');
					site.productMenu.removeClass('active');
					site.page.removeClass('locked');

				} else {

					site.infoLink.removeClass('active');
					site.infoMenu.removeClass('active');
					site.productMenu.addClass('active');
					$(this).addClass('active');
					site.page.addClass('locked');

				}
			});

		// on desktops 
		} else {
			l('desktop');
			site.shopLink.on('click', function(e){
				e.preventDefault();
				l('shoplink clicked');
				if($(this).hasClass('active')) {

					// l('ifed');
					$(this).removeClass('active');
					site.productMenu.removeClass('active');

				} else {

					// l('elsed');
					site.infoLink.removeClass('active');
					site.infoMenu.removeClass('active');
					site.productMenu.addClass('active');
					$(this).addClass('active');

				}
			});

			site.doc.on({
				scroll: function(){
					//l('scrolled');
					site.infoMenu.removeClass('active');
					site.infoLink.removeClass('active');
				}
			});
		}
	}
	// end
}


var l = function(message){
	console.log(message);
}


site.header.on({
	mouseleave: function() {
		l('header mouseleft');
		this.timer = setTimeout(function(){
			if(site.infoLink.hasClass('active')) {
				site.infoLink.removeClass('active');
				site.infoMenu.removeClass('active');
				site.infoLink.removeClass('active');
			}
			if(site.shopLink.hasClass('active')) {
				site.shopLink.removeClass('active');
				site.productMenu.removeClass('active');
			}
		}, site.menuDelay);
	},
	mouseenter: function() {
		l('header mouseenter');
		clearTimeout(this.timer);
	}
});


site.infoLink.on('click', function(e){
	l('infoLink click');
	e.preventDefault();
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		site.infoMenu.removeClass('active');
	} else {

		site.shopLink.removeClass('active');
		site.productMenu.removeClass('active');

		site.infoMenu.addClass('active');
		$(this).addClass('active');
		site.page.removeClass('locked');
	}	
});


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


site.backTop.on({
	click: function(e){
		e.preventDefault();
		site.page.animate({ scrollTop: 0 }, { 
			easing: site.ease,
			duration: 1500,
			complete: function(){
				l('scrolled to top');
			}
		});			
	}
});


site.brandLink.on({
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


$(document).ready(function(){
	site.pageInit();
});




$('document').ready(function(){

	var menuHeight = $('nav').height(), 
		productMenu = $('.productMenu'), 
		productMenuHeight = $('.productMenu').height(), 
		productMenuOffset = -(productMenuHeight + menuHeight), 
		infoLink = $('li.info a'), 
		shopLink = $('li.shop a'), 
		infoMenu = $('.infoMenu'),
		page = $('body'),
		header = $("header.main"),
		menuDelay = 750;

	header.on({
		mouseleave: function() {
			l('header mouseleft');
			this.timer = setTimeout(function(){
				if(infoLink.hasClass('active')) {
					infoLink.removeClass('active');
					infoMenu.removeClass('active');
					infoLink.removeClass('active');
				}
				if(shopLink.hasClass('active')) {
					shopLink.removeClass('active');
					productMenu.removeClass('active');
				}
			}, menuDelay);
		},
		mouseenter: function() {
			l('header mouseenter');
			clearTimeout(this.timer);
		}
	});

	infoLink.on('click', function(e){
		l('infoLink click');
		e.preventDefault();
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			infoMenu.removeClass('active');
		} else {

			shopLink.removeClass('active');
			productMenu.removeClass('active');

			infoMenu.addClass('active');
			$(this).addClass('active');
			page.removeClass('locked');
		}	
	});


	// on touch devices bigger than 700 (tablets)
	if(isTouchy() && window.innerWidth > 700) {

		l('touch bigger than 700');
		page.addClass('mobile');
		
		shopLink.on('click', function(e){
			e.preventDefault();
			var scrollPos = $('body').scrollTop();
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				productMenu.removeClass('active');
			} else {
				infoLink.removeClass('active');
				infoMenu.removeClass('active');
				productMenu.addClass('active');
				$(this).addClass('active');
			}
		});

		$('body').on({
			touchmove: function(){
				l('touchmoved');
				infoMenu.removeClass('active');
				infoLink.removeClass('active');
				shopLink.removeClass('active');
				productMenu.removeClass('active');
			}
		});

	// on touch devices smaller than 700 (tablets)
	} else if(isTouchy() && window.innerWidth < 700) {

		l('touch smaller than 700');
		page.on({
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
				productMenu.removeClass('active');
				page.removeClass('locked');
			} else {
				infoLink.removeClass('active');
				infoMenu.removeClass('active');
				productMenu.addClass('active');
				$(this).addClass('active');
				page.addClass('locked');
			}
		});

	// on desktops 
	} else {
		l('desktop');
		shopLink.on('click', function(e){
			e.preventDefault();
			l('shoplink clicked');
			if($(this).hasClass('active')) {
				// l('ifed');
				$(this).removeClass('active');
				productMenu.removeClass('active');
			} else {
				// l('elsed');
				infoLink.removeClass('active');
				infoMenu.removeClass('active');
				productMenu.addClass('active');
				$(this).addClass('active');
			}
		});

		$(document).on({
			scroll: function(){
				l('scrolled');
				infoMenu.removeClass('active');
				infoLink.removeClass('active');
			}
		});
	}
});


// device check
function isTouchy() {
  return 'ontouchstart' in window  || 'onmsgesturechange' in window;
};

// Logger
var l = function(message){
	console.log(message);
}





$('document').ready(function(){

	/*
	on mouseover blobs
		show menu
		add class to blob

	on mouseout header
		hide menu after a few seconds
		remove class from blob

	*/

	var menuHeight = $('nav').height(), 
		productMenu = $('.productMenu'), 
		productMenuHeight = $('.productMenu').height(), 
		productMenuOffset = -(productMenuHeight + menuHeight), 
		infoLink = $('li.info a'), 
		shopLink = $('li.shop a'), 
		infoMenu = $('.infoMenu');


	$("header").on({
		mouseleave: function() {
			this.timer = setTimeout(function(){
				if( infoLink.hasClass('active') ) {
					infoLink.removeClass('active');
					infoMenu.removeClass('active');
					infoLink.removeClass('active');
				}

				if(shopLink.hasClass('active')) {
					shopLink.removeClass('active');
					productMenu.removeClass('active');
				}


			}, 1000000);
		},
		mouseenter: function() {
			clearTimeout(this.timer);
		}
	});


	infoLink.on('click', function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			infoMenu.removeClass('active');
		} else {

			shopLink.removeClass('active');
			productMenu.removeClass('active');

			infoMenu.addClass('active');
			$(this).addClass('active');
		}	
	});


	shopLink.on('click', function(){
		
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



});



var l = function(message){
	console.log(message);
}
$(document).ready(function($) {

	$('.input_phone .input__wrap').mask('+7 (000) 000-00-00');


	$('.opening__inputs input').mask('00:00');

	$('.input__wrap_len-11').mask('000-00-00');

	$('.input_date .input__wrap').mask('00.00.2000');

	var personaBtn = $('.persona__toggle'),
			persona = $('.persona');

	personaBtn.click(function(event) {
		persona.toggleClass('persona_open');
		$('.lk-link').removeClass('lk-link_open');
	});

	$('.lk-link__icon').click(function(event) {
		var item = $(this).parents('.lk-link'),
				link = $(this).find('> a'),
				linkValue = link.attr('href'),
				windowWidth = $(window).width();
		
		if (item.hasClass('lk-link_has-hidden')) {
			if (windowWidth > 767) {
				event.preventDefault();
				if (!item.hasClass('lk-link_open')) {
					$('.lk-link').removeClass('lk-link_open');
					item.addClass('lk-link_open');
				} else{
					item.toggleClass('lk-link_open');
				}
				persona.removeClass('persona_open');
			} else{
				window.location.href = linkValue;
			}
		} 

		console.log(linkValue);
		
	});

	function valueElementForm(nameElement) {
		var newNameElement = '.' + nameElement;
			element = $(newNameElement);
		element.each(function(index, el) {
			var elementInput = $(this).find($('input:first-of-type')),
				elementLabel = $(this).find($('label')),
				elementValue = index + 1;
			elementInput.attr('id', nameElement + '-' + elementValue);
			elementLabel.attr('for', nameElement + '-' + elementValue);
		});
		
	}
	valueElementForm('input');
	valueElementForm('checkbox');
	valueElementForm('radio');
	valueElementForm('multi-select__item');
	valueElementForm('opening__item');
	valueElementForm('upload-photos__item');
	valueElementForm('file');
	valueElementForm('profile__upload');
	
	$('.select__wrap').styler();

	$('.multi-select__item label').each(function(index, el) {
		$(this).attr('data-multi-count', index + 1);
	});




	$('.multi-select__area-text').click(function(event) {
		var wrap = $(this).siblings('.multi-select__wrap');
		wrap.toggle();
	});

	$('.multi-select__item label').click(function(event) {
		var item = $(this).parents('.multi-select'),
				wrap = item.find('.multi-select__wrap'),
				input = $(this).prev('input'),
				text = $(this).text(),
				attr = $(this).attr('data-multi-count'),
				labels = item.find('.multi-select__labels');

		// wrap.toggle();
		if (input.is(':not(:checked)')) {
			labels.prepend('<p data-multi-count="' + attr + '"><span class="text">'+ text + '</span></p>');
		} else{
			labels.find('p[data-multi-count = ' + attr + ']').remove();
		}
	});


	$('.input__btn-add').click(function(event) {
		var input = $(this).prev('input'),
				wrap = $(this).parents('.input__case');

		wrap.append('<input class="input__wrap" placeholder="URL страницы" id="input-11" type="text">');
	});



	$('.opening__btn-break').click(function(event) {
		$(this).find('span').toggleClass('span-hidden');
		var breakWrap = $(this).next('.opening__break');
		breakWrap.toggleClass('opening__break_show');
	});

	$('.opening__checkbox label').click(function(event) {
		$(this).toggleClass('check')
		$('.opening__inputs_hours .input').toggleClass('input_disabled');
		if ($(this).hasClass('check')) {
			$('.opening__inputs_hours .input input').attr('disabled', 'disabled');
			$('.opening__inputs_hours .input input').val('');
		} else{
			$('.opening__inputs_hours .input input').removeAttr('disabled');
		}
	});

	var photosList = $('.photos__list'),
			photosNav = $('.photos__control');

	photosList.slick({
		arrows: false,
		asNavFor: photosNav
	})

	photosNav.slick({
		slidesToShow: 4,
		focusOnSelect: true,
		asNavFor: photosList,
		prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="25" viewBox="0 0 14 25"><defs><path id="acu0a" d="M179.6 847l1.4-1.38-11.2-11.12 11.2-11.12-1.4-1.39L167 834.5z"/></defs><g><g transform="translate(-167 -822)"><use xlink:href="#acu0a"/></g></g></svg></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="26" viewBox="0 0 15 26"><defs><path id="hanna" d="M683 821.27l-1.41 1.42 11.3 11.31-11.3 11.31 1.41 1.42L695.73 834z"/></defs><g><g transform="translate(-681 -821)"><use xlink:href="#hanna"/></g></g></svg></button>',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 2
			}
		}]
	})


	$('.product__phone').click(function(event) {
		$(this).find('.product__phone-content p:nth-of-type(1) span').toggleClass('span-hidden');
		var phoneHidden = $(this).find('.phone-hidden'),
				phoneHiddenVal = phoneHidden.attr('data-phone');
		$(this).toggleClass('click');
		if ($(this).hasClass('click')) {
			phoneHidden.html(phoneHiddenVal);
		} else{
			phoneHidden.html("XXX-XX-XX");
		}
	});

	$('.tabs').tabs();

	$('.products').each(function(index, el) {
		var productsWidth = 0,
			productsLength = $(this).find('.products__head .products__item').length;

		$(this).find('.products__head .products__item').each(function(index, elem) {
			var width = $(this).width();
			productsWidth = productsWidth + width;
		});

		var productsWidthSum = productsWidth + (productsLength * 38);

		if (productsWidthSum <= 1170) {
			productsWidthSum = 1170;
		}

		$(this).find('.products__head').width(productsWidthSum);
		$(this).find('.products__line').width(productsWidthSum);
	});
	

	// $('.filter-line .filter-line_checkbox label').click(function(event) {
	// 	var products = $(this).parents('.products'),
	// 			input = $(this).prev('input'),
	// 			inputs = products.find('.products__body .products__item_checkbox input');

	// 	if (input.is(':checked')) {
	// 		inputs.each(function(index, el) {
	// 			$(this).removeAttr('checked');
	// 		});
	// 	} else{
	// 		inputs.each(function(index, el) {
	// 			$(this).attr('checked', 'checked');
	// 		});
	// 	}


		
	// });


	var colLeftHeigth = $('#col-left').height(),
			colRight = $('#col-right .page__block');

	colRight.css('min-height', colLeftHeigth);


	$('.main-slide__tabs').tabs();


	$('.products-wrap__title').click(function(event) {
		var parent = $(this).parents('.products-wrap'),
				body = parent.find('.products-wrap__body');

		parent.toggleClass('products-wrap_open');
		body.slideToggle(300);
	});



	$('.increment__btn').click(function(event) {
		var input = $(this).siblings('.increment__input').find('input'),
				inputVal = Number(input.val());
		if ($(this).hasClass('increment__btn_minus')) {
			if (inputVal != 1) {
				input.val(inputVal - 1);
			}
		} else {
			input.val(inputVal + 1);
		}
	});


	var mobileBtn = $('.panel__mobile-btn'),
			mobileNav = $('.panel__mobile-nav');

	mobileBtn.click(function(event) {
		mobileBtn.toggleClass('panel__mobile-btn_toggle');
		mobileNav.toggleClass('panel__mobile-nav_toggle');
	});


	$('.mobile-profile > a').click(function(event) {
		var ul = $(this).siblings('ul');
		event.preventDefault();
		ul.slideToggle(300);
	});
});

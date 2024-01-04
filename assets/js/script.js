// Preloader js    
$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});
(function ($) {
	'use strict';

	//  Search Form Open
	$('#searchOpen').on('click', function () {
		$('.search-collapsed').addClass('open');
		setTimeout(function () {
			$('.search-collapsed input').focus();
		}, 400);
	});
	$('#searchClose').on('click', function () {
		$('.search-collapsed').removeClass('open');
	});

	// featured post slider
	$('.post-slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true
	});

	var userId = $('#instafeed').attr('data-userId');
	//var accessToken = $('#instafeed').attr('data-accessToken');
	var accessToken = 'IGQWRPZA3N4cHVINHB2';
	accessToken += 'U1AxbWJkUllFdDEyQXA5Um5PdURlN1hrZA2QzVGtnc';
	accessToken += 'WJJeTVyYVROWUo0bkU0MFp1a3F';
	accessToken += 'qRE1BUWpaaFRmYUxWV3NGYjJSRlNBT';
	accessToken += 'jNHcE5jZAGR6ZATFqeUxrWTAya2VtQ1RuZAmJzc1lHMW41bjgZD'

	console.log("TEST");

	async function getData(url, debug=true) {
		const response = await fetch(url);
		const data = await response.json();
		if(debug)
			console.log(data);
		return data;
	}

	async function getPostsMedia(recentPostsIds) {
		for (let i = 0; i < recentPostsIds.length; i++) {
			const data = await getData('https://graph.instagram.com/v18.0/' + recentPostsIds[i].id + '?fields=id,media_type,permalink,media_url,timestamp&access_token=' + accessToken, false);
			//console.log(data);
			$('#instafeed').append('<a href="' + data.permalink + '"><img style="max-width: 100%; padding: 2px" src="' + data.media_url + '" /></a>');
		}
	}

	var postsData;
	var recentPosts;
	if(userId != undefined) {
		getData('https://graph.instagram.com/v18.0/' + userId + '/media?access_token=' + accessToken, false)
				.then(data => {postsData = data; recentPosts = postsData.data.slice(0,6); /*console.log(recentPosts); */getPostsMedia(recentPosts);})
				.catch(error => console.error(error));
	}

	// instafeed
	/*if (($('#instafeed').length) !== 0) {
		var userId = $('#instafeed').attr('data-userId');
		var accessToken = $('#instafeed').attr('data-accessToken');
		var userFeed = new Instafeed({
			get: 'user',
			userId: userId,
			limit: 6,
			resolution: 'thumbnail',
			accessToken: accessToken,
			// for more options, visit http://instafeedjs.com/
			template: '<div class="col-4 px-1 mb-2"><a href="{{link}}" target="_blank"><img class="img-fluid w-100" src="{{image}}" alt="instagram-image"></a></div>'
		});
		userFeed.run();
	}*/



	// tab
	$('.tab-content').find('.tab-pane').each(function (idx, item) {
		var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
			title = $(this).attr('title');
		navTabs.append('<li class="nav-item"><a class="nav-link" href="#">' + title + '</a></li>');
	});

	$('.code-tabs ul.nav-tabs').each(function () {
		$(this).find("li:first").addClass('active');
	})

	$('.code-tabs .tab-content').each(function () {
		$(this).find("div:first").addClass('active');
	});

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		var tab = $(this).parent(),
			tabIndex = tab.index(),
			tabPanel = $(this).closest('.code-tabs'),
			tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
		tabPanel.find('.active').removeClass('active');
		tab.addClass('active');
		tabPane.addClass('active');
	});

	// Accordions
	$('.collapse').on('shown.bs.collapse', function () {
		$(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus');
	}).on('hidden.bs.collapse', function () {
		$(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus');
	});

})(jQuery);
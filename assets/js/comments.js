$(document).ready(function() {
	function apiRequest(uri,type,data,success,error)
	{
		$.ajax({
			url:uri,
			type: type,
			crossDomain: true,
			dataType: 'json',
			data: data,
			xhrFields: {
				withCredentials: true
			},
			success: function(result){
				success(result);
			},
			error: function(result){
				error(result);
			}
		});
	}

	if (name = $.cookie('comment_name')) {
		$('#name').val(name);
	}

	$(".comments_title a").click(function()
	{
		$(".write_comment").toggle();
	});

	$(".comments .sag  a.reply").click(function()
	{
		comment_id = $(this).parent().data("id");
		$(".reply-"+comment_id).toggle();
	});

	$('.Yorum .all-reply-comments + .showall a').click(function()
	{
		var page = $(this).attr('data-page');
		var id = $(this).attr('data-id');
		var site = $(this).attr('data-site');
		getCommentReplies(site, id, page);
	});

	$('.comments form').on('submit', function(event)
	{
		event.preventDefault();
		var data = $(this).serialize();
		var textSuccess = "Mesajınız Gönderildi. Editörlerimiz Onayladıktan Sonra Yayınlanacaktır.";
		var urn = $(this).data('action');
		var uri = apiUrl + urn; console.log(data);
		var element = this;
		apiRequest(uri, 'post', data, function(result){
			$(element).parent().children('form').hide();
			$(element).parent().children('div').css({'height':'40', 'text-align':'center', 'padding-top':'26px'});
			$(element).parent().children('div.msg').fadeIn(250);
			if ($('#name')) {
				var name = $('#name').val();
				$.cookie('comment_name', name, {expires: 999, path: '/'});
			}
			$(element).parent().children('div.msg').text("Mesajınız Gönderildi. Editörlerimiz Onaylandıktan Sonra Yayınlanacaktır.");
		}, function(result){
			$('.comments .comment-form > .commentbox .form > .counter').show();
			var response = JSON.parse(result.responseText);
			$('.write-comments #comment-response').show().addClass('comment-error').delay('2000').fadeOut('slow').text("Hata: "+response.msg);
		});
	});

	$('body').on('click', '.like', function(){
		var self = this;
		var comment_id = $(this).attr('id');
		var uri = apiUrl + 'content/like_comment/' + comment_id;

		apiRequest(uri, 'post', {}, function(){
			var likes = $(self).find('span').html() * 1;
			$(self).find('span').html(likes+1);
			$(self).append('diniz');
		}, function(e){
			var response = JSON.parse(e.responseText);
			alert(response.msg);
		});
	});


	$('li.Yorum').on('click', '.report', function(){
		if ( ! confirm("Bu yorumu şikayet etmek istediğinize emin misiniz?"))
			return false;

		var self = this;
		var comment_id = $(this).attr('id');
		var uri = apiUrl + 'content/report_comment/' + comment_id;

		apiRequest(uri, 'post', {}, function(){
			$(self).append('tiniz');
		}, function(e){
			var response = JSON.parse(e.responseText);
			alert(response.msg);
		});
	});

});


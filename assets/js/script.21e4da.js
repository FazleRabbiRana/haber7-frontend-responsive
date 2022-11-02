function _slideTimerOn() {
	slide_button.attr("data-play", 1),
		(slide_timer = setTimeout(function () {
			$("#slide_show_form").submit();
		}, slide_interval)),
		slide_button.removeClass("slide-show-play"),
		slide_button.addClass("slide-show-pause");
}
function _slideTimerOff() {
	slide_button.attr("data-play", 0),
		clearInterval(slide_timer),
		slide_button.removeClass("slide-show-pause"),
		slide_button.addClass("slide-show-play");
}
function _slideTimerControl() {
	slideShowActive &&
		(total_image <= page_no
			? clearInterval(slide_timer)
			: (slide_button.data("play", 1), _slideTimerOn()));
}
function apiRequest(e, t, a, i, s) {
	$.ajax({
		url: e,
		type: t,
		crossDomain: !0,
		dataType: "json",
		data: a,
		xhrFields: { withCredentials: !0 },
		success: function (e) {
			i(e);
		},
		error: function (e) {
			s(e);
		},
	});
}
var slide_timer,
	slide_interval = 7e3;
var comment_page;
if (
	((comment_page = 2),
	$(".all-comment-visible").click(function () {
		var e = $(".comments-detail-id").data("id"),
			t = $(".comments-detail-id").data("type"),
			a = $(".comments-detail-id").data("link"),
			i = $(".comments-detail-id").data("thumbnail"),
			s = $(".comment-template");
		return (
			$(this).parent().hide(),
			apiRequest(
				"/api/" + t + "/comments/" + e,
				"get",
				{ page: comment_page },
				function (e) {
					for (var t = 0; t < e.length; t++) {
						var o = e[t];
						(likes = ""),
							o.likes > 0 && (likes = " / " + o.likes + " kişi beğenmiş "),
							s.find(".media-heading").html(o.name),
							s
								.find(".create-at")
								.html(
									o.created_at +
										likes +
										' / <a href="javascript:void(0)" class="like" data="comment" id="' +
										o.id +
										'">Yorumu beğen</a>'
								),
							s.find(".comment-body").html(o.body),
							o.image &&
								s
									.find(".image-parent")
									.html(
										'<a class="image" href="' +
											a +
											"/p" +
											o.order +
											'"><img src="' +
											i +
											o.image +
											'" alt=""/><span>' +
											o.order +
											"</span></a>"
									),
							s.show(),
							$(".comments ul:eq(0)").append(s.html()),
							s.hide();
					}
					5 == e.length && $(".all-comment-visible").parent().show();
				}
			),
			comment_page++,
			!1
		);
	}),
	$("#slide_show_form").length > 0)
) {
	var slide_button = $("#gallery-slide-show");
	slide_button.click(function () {
		(play = $(this).attr("data-play")),
			1 == play ? _slideTimerOff() : _slideTimerOn();
	}),
		_slideTimerControl();
}
(function () {
	$(".populars ul").size &&
		$(".populars ul li a").click(function () {
			console.log('clicked populars filter');
			var e;
			return (
				(e = $(".populars ul li a").index(this)),
				$(".populars .galleries").addClass("hide").eq(e).removeClass("hide"),
				$(".populars ul li").removeClass("active").eq(e).addClass("active"),
				!1
			);
		}),
		$(".black .galleries") &&
			$(".black .galleries a").hover(function () {
				return (
					$(".black .hero a").attr("href", $(this).attr("href")),
					$(".black .hero h2").html($(this).attr("title")),
					$(".black .hero h3").html($(this).data("description")),
					$(".black .hero img").attr("src", $(this).data("image"))
				);
			}),
		$("#search-form").submit(function () {
			var e;
			return (
				(e = $(this).find("input").val()) &&
					(window.location.href = "/foto-galeri/search?q=" + e),
				!1
			);
		}),
		$(".paging-form").submit(function () {
			var e, t;
			return (
				(e = 1 * $(".paging-form .text").val()),
				(t = $("link[rel=canonical]").attr("href")),
				e > 0 && (window.location.href = t + "/p" + e),
				!1
			);
		}),
		$(".show-comments").click(function () {
			return (
				$(".comments").css("display", "block"),
				$(".most_read_gallery").css("display", "none"),
				$(this).addClass("active"),
				$(".show_most_read").removeClass("active")
			);
		}),
		$(".comments-social").click(function () {
			return (
				$(".comments").css("display", "block"),
				$(".most_read_gallery").css("display", "none"),
				$(".show-comments").addClass("active"),
				$(".show_most_read").removeClass("active")
			);
		}),
		$(".show_most_read").click(function () {
			return (
				$(".comments").css("display", "none"),
				$(".most_read_gallery").css("display", "block"),
				$(this).addClass("active"),
				$(".show-comments").removeClass("active")
			);
		}),
		$("#gallery").length > 0 &&
			$(document).keydown(function (e) {
				var t, a;
				return (
					(t = $(".header-slider a.next-button").attr("href")),
					(a = $(".header-slider a.prev-button").attr("href")),
					39 === e.keyCode
						? ((window.location.href = t), !1)
						: 37 === e.keyCode
						? ((window.location.href = a), !1)
						: void 0
				);
			});
}.call(this),
	$(document).ready(function () {
		function e() {
			var e = navigator.userAgent.toLowerCase();
			return -1 != e.indexOf("msie") && parseInt(e.split("msie")[1]);
		}
		function t(e) {
			if (e > 0 && e <= total_image) {
				var t = "./p" + e;
				return (
					(o = e > 1 ? g + " sayfa - " + e : g),
					History.pushState({ id: "container-loading", path: t }, o, t),
					!1
				);
			}
		}
		function a() {
			n++, c.infinitescroll("scroll"), n >= total_image && clearInterval(d);
		}
		function i() {
			r++,
				($pageElement = $("#page-" + r)),
				$pageElement.length > 0
					? ($("html,body").animate(
							{ scrollTop: $pageElement.offset().top + 10 },
							2e3
					  ),
					  r >= total_image && $("#slide-button").trigger("click"))
					: (r--, c.infinitescroll("scroll"));
		}
		if ($("#gallery-vertical").length > 0) {
			var s,
				o,
				l = page_no,
				n = page_no,
				r = page_no - 1,
				d = setInterval(function () {
					a();
				}, 500),
				c = $("#container-loading"),
				m = page_no,
				g = ($(".ads-300-frame").attr("src"), $(this).attr("title"));
			window.navigator.userAgent;
			window.history.pushState,
				m <= total_image &&
					(_scrollDown = c.infinitescroll(
						{
							loading: {
								finishedMsg: null,
								img: loading_img,
								msgText: "Yükleniyor...",
								speed: "fast",
							},
							state: {
								isDuringAjax: !1,
								isInvalidPage: !1,
								isDestroyed: !1,
								isDone: !1,
								isPaused: !1,
								currPage: 1,
							},
							binder: $(window),
							navSelector: "a#next-load-link:last",
							nextSelector: "a#next-load-link:last",
							itemSelector: "#gallery-vertical .loading-gallery-box",
							debug: !1,
							dataType: "html",
							animate: !1,
							extraScrollPx: 200,
							maxPage: total_image - page_no + 1,
							bufferPx: 0.5 * $(window).height(),
							path: function (e) {
								return m <= total_image && m++, "./p" + m;
							},
							appendCallback: !0,
						},
						function (e, t, a) {
							if (m % 2) $(e).css("background-color", "#363636");
							else {
								$(e).css("background-color", "#272727");
								var i = "dfp-336-gallery-" + Math.round(1e5 * Math.random()),
									s = "dfp-336-gallery2-" + Math.round(1e5 * Math.random());
								$("#container-loading").append(
									'<div class="bottom-ad"> <div class="container"> <div class="row"> <div class="ad-336 hidden-xs hidden-sm"> <div class="ads text-center"> <div id="' +
										i +
										'"></div> </div> </div> <div class="ad-336 hidden-xs hidden-sm"> <div class="ads text-center"> <div id="' +
										s +
										'"></div> </div> </div> </div> </div> </div>'
								),
									googletag
										.defineSlot(
											"/337185191/yeni_haber7_fotogaleri_336x250_1",
											[336, 280],
											i
										)
										.addService(googletag.pubads()),
									googletag
										.defineSlot(
											"/337185191/yeni_haber7_fotogaleri_336x250_2",
											[336, 280],
											s
										)
										.addService(googletag.pubads()),
									googletag.cmd.push(function () {
										googletag.display(i);
									}),
									googletag.cmd.push(function () {
										googletag.display(s);
									}),
									"block" == $(".stop-mini-button").eq(0).css("display") &&
										$(".stop-mini-button").css("display", "block");
							}
						}
					)),
				$(window).bind("scroll", function () {
					(_windowTop = parseInt($(document).scrollTop())),
						(_windowWidth = parseInt($(document).width())),
						$(".loading-data").each(function () {
							if (
								((_divTop = parseInt($(this).offset().top)),
								(_divBottom =
									parseInt($(this).offset().top) + parseInt($(this).height())),
								_windowTop > _divTop &&
									_windowTop < _divBottom &&
									((dataNewLink = $(this).data("link")),
									dataNewLink != l &&
										(t(dataNewLink),
										(l = dataNewLink),
										r != dataNewLink && (r = dataNewLink),
										ga(
											"send",
											"pageview",
											"/foto-galeri/" +
												gallery_id +
												"-" +
												gallery_sef +
												"/p" +
												l
										),
										"undefined" != typeof analytics_seo_user &&
											(ga("create", analytics_seo_user, "auto", {
												name: "newTracker" + analytics_seo_id,
											}),
											ga(
												"newTracker" + analytics_seo_id + ".send",
												"pageview",
												"/foto-galeri/" +
													gallery_id +
													"-" +
													gallery_sef +
													"/p" +
													l
											)),
										yaCounter14645857.hit(page_media_url + "/" + l, page_title),
										$.getScript(
											"http://api.haber7.com/content/hit/gallery/" + gallery_id
										),
										!(l % 2))))
							) {
								googletag.pubads().refresh([slot_300x250]);
								var e = $(".futured-gallery iframe"),
									a = e.data("link");
								e.attr("src", "").attr("src", a);
							}
						}),
						_windowTop > 320
							? $(".sticky-header").fadeIn(200)
							: $(".sticky-header").hide();
				}),
				$("#click-image-modal").on("show.bs.modal", function (e) {
					var t = $(e.relatedTarget).data("image-src");
					$(this).find(".slide-image").attr("src", t);
				}),
				$(document).on("click", "#slide-button", function (e) {
					return (
						(slideStatus = $(this).attr("data-slide")),
						clearInterval(s),
						"start" == slideStatus
							? ((s = setInterval(function () {
									i();
							  }, 5e3)),
							  $(this).removeClass("slide-button"),
							  $(this).addClass("pause-button"),
							  $(this).attr("data-slide", "stop"),
							  $(".stop-mini-button").css("display", "block"))
							: "stop" == slideStatus &&
							  ($(this).removeClass("pause-button"),
							  $(this).addClass("slide-button"),
							  $(this).attr("data-slide", "start"),
							  $(".stop-mini-button").css("display", "none")),
						0
					);
				}),
				$(document).on("click", ".stop-mini-button", function (e) {
					$("#slide-button").trigger("click");
				}),
				-1 == window.location.href.search("/p([0-9]+)") &&
					((page = page_1_url),
					9 == e() || 8 == e() || 7 == e()
						? (window.location.href = page)
						: History.pushState(
								{ id: "container-loading", path: page },
								g,
								page
						  ));
		}
	}));

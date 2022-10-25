function currencySlideAction() {
  setTimeout(function () {
    $(".currency-box.primary").hide(), $(".currency-box.secondary").fadeIn(200);
  }, 5e3),
    setTimeout(function () {
      $(".currency-box.primary").fadeIn(200),
        $(".currency-box.secondary").hide();
    }, 1e4);
}
function centeredPopup(e, t, i, a) {
  var o = e,
    n = t,
    s = window.screen.availHeight / 2 - n / 2,
    r = window.screen.availWidth / 2 - o / 2;
  return (
    void 0 == a && (a = ""),
    window.open(
      i + a,
      "",
      "width=" + o + ", height=" + n + ", top=" + s + ", left=" + r
    ),
    !1
  );
}
function sliderHoverAction(e, t) {
  e.find(".slick-dots").hover(
    function () {
      e.slick("slickPause");
    },
    function () {
      e.slick("slickPlay");
    }
  ),
    $(document).on("mouseover", t + " .slick-dots li", function () {
      e.slick("goTo", $(this).index());
    });
}
function getWeather(e) {
  $.getJSON("https://www.haber7.com/api/widget/weather/" + e, function (e) {
    var t = e[0][0],
      i = e[0][1],
      a = slug(e[0][1]);
    $(".status-degree").text(t + "°"),
      $(".status-text").text(i),
      $(".weather .icon").attr("class", "icon wi-" + a),
      $("#top-widgets .weather .icon i").attr("title", i);
  });
}
function getPrayer(e) {
  $.get(
    "https://www.haber7.com/api/widget/pray-times/" + e + "?format=json",
    null,
    function (e) {
      var t,
        i,
        a = e[0],
        o = e[1],
        n = e[2],
        s = e[3],
        r = e[4],
        l = e[5],
        c = moment().format("HH:mm"),
        d = $(".prayer_name .name"),
        p = $(".prayer_time");
      c >= a && c <= o
        ? ((t = a), (i = "GÜNEŞ'E"))
        : c >= o && c <= n
        ? ((t = n), (i = "ÖĞLE'YE"))
        : c >= n && c <= s
        ? ((i = "İKİNDİ'YE"), (t = s))
        : c >= s && c <= r
        ? ((t = r), (i = "AKŞAM'A"))
        : c >= r && c <= l
        ? ((t = l), (i = "YATSI'YA"))
        : ((t = a), (i = "İMSAK'A")),
        $(".prayer_name .text").text("KALAN SÜRE"),
        moment(t, "HH:mm").diff(moment(), "seconds") < 0
          ? (d.html(i),
            (t = moment(t, "HH:mm").add("days", 1)),
            (returnHours = moment(t, "HH:mm").diff(moment(), "hours")),
            (returnMinutes = moment(t, "HH:mm").diff(moment(), "minutes")),
            returnMinutes >= 60 &&
              (returnMinutes =
                moment(t, "HH:mm").diff(moment(), "minutes") -
                60 * returnHours),
            returnMinutes < 10
              ? p.html(returnHours + ":0" + returnMinutes)
              : p.html(returnHours + ":" + returnMinutes))
          : (d.html(i),
            (returnHours = moment(t, "HH:mm").diff(moment(), "hours")),
            (returnMinutes = moment(t, "HH:mm").diff(moment(), "minutes")),
            returnMinutes >= 60 &&
              (returnMinutes =
                moment(t, "HH:mm").diff(moment(), "minutes") -
                60 * returnHours),
            returnMinutes < 10
              ? p.html(returnHours + ":0" + returnMinutes)
              : p.html(returnHours + ":" + returnMinutes)),
        $.each($(".prayer-list_item"), function (t, i) {
          $(this).find(".time-value").text(e[t]);
        });
    }
  );
}
function svgdedect() {
  return document.implementation.hasFeature(
    "http://www.w3.org/TR/SVG11/feature#Image",
    "1.1"
  );
}
function fullSliderPushAction() {
  $(".headline-slider-full .headline-slider-item").each(function () {
    if ($(this).is(".slick-active")) {
      var e = $(this).data("slick-index");
      e++,
        history.replaceState("", "", "?manset=" + e),
        nextPageTrackingAction($(this).attr("href") + "?manset=" + e);
    }
  });
}
function replaceBrokenImages(e) {
  for (
    var t = document.getElementsByClassName("js-detail-image"),
      i = 0,
      a = t.length;
    i < a;
    i++
  ) {
    var o = t[i];
    0 === o.naturalWidth && (o.src = e);
  }
}
var subheadSlider = $(".subhead-slider"),
  headlineSlider = $(".headline-slider"),
  headlineFullSlider = $(".headline-slider-full"),
  smallHeadlineSlider = $(".small-headline-slider"),
  secondHeadlineSlider = $(".second-headline-slider"),
  multimediaSlider = $(".multimedia-slider"),
  newspaperSlider = $(".newspaper-slider"),
  categorySlider = $(".category-slider"),
  sportAuthorSlider = $(".sport-author-slider"),
  subFeaturedSlider = $(".sub-featured-list"),
  halkBankSlider = $(".halkbank-slider");
if (
  (subheadSlider.length > 0 &&
    (subheadSlider.slick({
      fade: !0,
      autoplay: !0,
      autoHover: !0,
      speed: 0,
      dots: !0,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      autoplaySpeed: 11e3,
      lazyLoad: "ondemand",
      accessibility: !1,
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(subheadSlider, ".subhead-slider")),
  headlineSlider.length > 0 &&
    (headlineSlider.slick({
      fade: !0,
      autoplay: !0,
      autoHover: !0,
      speed: 0,
      dots: !0,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      autoplaySpeed: 7e3,
      lazyLoad: "ondemand",
      accessibility: !1,
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(headlineSlider, ".headline-slider")),
  headlineSlider.length > 0 &&
    $(".headline-slider .slick-dots").append(
      '<span><a href="/mansetler" title="Tüm Manşetler" target="_blank">T</a></span>'
    ),
  headlineFullSlider.length > 0 &&
    (headlineFullSlider.slick({
      fade: !0,
      autoplay: !0,
      autoHover: !0,
      speed: 0,
      dots: !0,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      autoplaySpeed: 7e3,
      accessibility: !1,
      lazyLoad: "ondemand",
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(headlineFullSlider, ".headline-slider-full")),
  secondHeadlineSlider.length > 0 &&
    (secondHeadlineSlider.slick({
      autoplay: !1,
      autoHover: !0,
      speed: 350,
      dots: !0,
      slidesToShow: 3,
      slidesToScroll: 3,
      variableWidth: !0,
      accessibility: !1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToScroll: 1,
            dots: false,
          }
        }
      ],
      prevArrow:
        '<span class="slider-arrow prev"><i class="zmdi zmdi-chevron-left"></i></span>',
      nextArrow:
        '<span class="slider-arrow next"><i class="zmdi zmdi-chevron-right"></i></span>',
      lazyLoad: "ondemand",
    }),
    setTimeout(function () {
      secondHeadlineSlider.css({ overflow: "visible" });
    }, 300)),
  multimediaSlider.length > 0 &&
    (multimediaSlider.slick({
      fade: !0,
      autoplay: !1,
      autoHover: !0,
      speed: 0,
      dots: !0,
      accessibility: !1,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      lazyLoad: "ondemand",
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(multimediaSlider, ".multimedia-slider")),
  newspaperSlider.length > 0 &&
    (newspaperSlider.slick({
      autoplay: !1,
      autoHover: !0,
      speed: 350,
      dots: !0,
      slidesToShow: 6,
      slidesToScroll: 6,
      accessibility: !1,
      variableWidth: !0,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToScroll: 1,
            dots: false,
          }
        }
      ],
      prevArrow:
        '<span class="slider-arrow prev"><i class="zmdi zmdi-chevron-left"></i></span>',
      nextArrow:
        '<span class="slider-arrow next"><i class="zmdi zmdi-chevron-right"></i></span>',
      lazyLoad: "ondemand",
    }),
    setTimeout(function () {
      newspaperSlider.css({ overflow: "visible" });
    }, 300)),
  $(".guncel-slider").length > 0 &&
    ($(".guncel-slider").slick({
      fade: !0,
      autoplay: !0,
      autoHover: !0,
      speed: 0,
      dots: !0,
      accessibility: !1,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      autoplaySpeed: 4e3,
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction($(".guncel-slider"), ".guncel-slider")),
  smallHeadlineSlider.length > 0 &&
    $(".small-headline-header").on("click", "h3", function () {
      var e = $(this).data("slide");
      $(".small-headline-header h3").removeClass("isActive"),
        $(this).addClass("isActive"),
        $(".small-headline").attr("class", "small-headline " + e),
        $(".small-headline-slider").removeClass("isActive"),
        $("." + e + "-slider").addClass("isActive"),
        $("." + e + "-slider").slick({
          fade: !0,
          autoplay: !0,
          autoHover: !0,
          speed: 0,
          dots: !0,
          accessibility: !1,
          prevArrow: '<span class="slider-arrow prev"></span>',
          nextArrow: '<span class="slider-arrow next"></span>',
          autoplaySpeed: 6e3,
          customPaging: function (e, t) {
            var i = $(e.$slides[t]).attr("href"),
              a = $(e.$slides[t]).attr("title");
            return (
              '<a href="' +
              i +
              '" title="' +
              a +
              '" target="_blank">' +
              (t + 1) +
              "</a>"
            );
          },
        }),
        sliderHoverAction($("." + e + "-slider"), "." + e + "-slider"),
        $(".small-headline-slider").not(".isActive").slick("unslick");
    }),
  categorySlider.length > 0 &&
    (categorySlider.slick({
      fade: !0,
      autoplay: !0,
      autoHover: !0,
      speed: 0,
      dots: !0,
      accessibility: !1,
      prevArrow: '<span class="slider-arrow prev"></span>',
      nextArrow: '<span class="slider-arrow next"></span>',
      autoplaySpeed: 5e3,
      lazyLoad: "ondemand",
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(categorySlider, ".category-slider")),
  halkBankSlider.length > 0 &&
    (halkBankSlider.slick({
      fade: !0,
      autoplay: !1,
      autoHover: !0,
      speed: 0,
      dots: !0,
      prevArrow: "",
      nextArrow: "",
      accessibility: !1,
      lazyLoad: "ondemand",
      customPaging: function (e, t) {
        var i = $(e.$slides[t]).attr("href"),
          a = $(e.$slides[t]).attr("title");
        return (
          '<a href="' +
          i +
          '" title="' +
          a +
          '" target="_blank">' +
          (t + 1) +
          "</a>"
        );
      },
    }),
    sliderHoverAction(halkBankSlider, ".halkbank-slider")),
  sportAuthorSlider.length > 0 &&
    (sportAuthorSlider.slick({
      autoplay: !0,
      autoHover: !0,
      speed: 350,
      arrows: !1,
      dots: !0,
      slidesToShow: 3,
      slidesToScroll: 2,
      variableWidth: !0,
      accessibility: !1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ],
      prevArrow:
        '<span class="slider-arrow prev"><i class="zmdi zmdi-chevron-left"></i></span>',
      nextArrow:
        '<span class="slider-arrow next"><i class="zmdi zmdi-chevron-right"></i></span>',
      autoplaySpeed: 9e3,
      lazyLoad: "ondemand",
    }),
    setTimeout(function () {
      sportAuthorSlider.css({ overflow: "visible" });
    }, 300)),
  subFeaturedSlider.length > 0 &&
    subFeaturedSlider.slick({
      autoplay: !0,
      autoHover: !0,
      speed: 350,
      arrows: !1,
      dots: !0,
      vertical: !0,
      verticalSwiping: !0,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow:
        '<span class="slider-arrow prev"><i class="zmdi zmdi-chevron-left"></i></span>',
      nextArrow:
        '<span class="slider-arrow next"><i class="zmdi zmdi-chevron-right"></i></span>',
      autoplaySpeed: 9e3,
      lazyLoad: "ondemand",
    }),
  $(document).on("click", ".js-share-button", function () {
    var e = $(this).data("popup-width"),
      t = $(this).data("popup-height"),
      i = $(this).data("popup-url"),
      a = $(this).data("popup-url-extra");
    centeredPopup(e, t, i, a);
  }),
  $(".js-sport-widget-item").on("mouseover", function () {
    var e = $(this).attr("data-image");
    "undefined" != typeof e &&
      e !== !1 &&
      ($(this).find(".image img").attr("src", e),
      $(this).removeAttr("data-image")),
      $(this).parent().find(".js-sport-widget-item").removeClass("isActive"),
      $(this).addClass("isActive");
  }),
  $(".site-menu-button").on("click", function () {
    $("body")
      .toggleClass("menu-isActive")
      .removeClass("search-isActive city-isActive");
  }),
  $(".site-search-button").on("click", function () {
    $("body")
      .toggleClass("search-isActive")
      .removeClass("menu-isActive city-isActive"),
      $(".search input").focus();
  }),
  $("body").on("click", function () {
    $(this).removeClass("menu-isActive search-isActive city-isActive");
  }),
  $(
    ".site-menu-button, .mega-menu, .site-search-button, .site-search, .city-name, .city-name-list"
  ).on("click", function (e) {
    e.stopPropagation();
  }),
  $(".tags-item").on("click", function () {
    var e = $(this).find("span").text();
    $(".search input").val(e);
  }),
  $(".city-name").on("click", function () {
    $("body")
      .toggleClass("city-isActive")
      .removeClass("menu-isActive search-isActive"),
      $(".city-name-list input")
        .focus()
        .attr("placeholder", "Şehir ismi girin");
  }),
  $(document).on("keyup", function (e) {
    27 == e.keyCode && $("body").removeClass("search-isActive menu-isActive");
  }),
  $(".header-widgets").length > 0)
) {
  var prayer_country =
      void 0 == Cookies.get("prayer_country")
        ? 34
        : Cookies.get("prayer_country"),
    prayer_country_name =
      void 0 == Cookies.get("prayer_country_name")
        ? "istanbul"
        : Cookies.get("prayer_country_name");
  getWeather(prayer_country),
    getPrayer(prayer_country),
    $(".city-name").text(prayer_country_name),
    $(".header-widgets").one("mouseenter", function (e) {
      $(".city-name-list").append(
        '<select class="city-name-list js-city-list" name="city"><option value="1">Adana</option><option value="2">Adıyaman</option><option value="3">Afyonkarahisar</option><option value="4">Ağrı</option><option value="5">Amasya</option><option value="6">Ankara</option><option value="7">Antalya</option><option value="8">Artvin</option><option value="9">Aydın</option><option value="10">Balıkesir</option><option value="11">Bilecik</option><option value="12">Bingöl</option><option value="13">Bitlis</option><option value="14">Bolu</option><option value="15">Burdur</option><option value="16">Bursa</option><option value="17">Çanakkale</option><option value="18">Çankırı</option><option value="19">Çorum</option><option value="20">Denizli</option><option value="21">Diyarbakır</option><option value="22">Edirne</option><option value="23">Elazığ</option><option value="24">Erzincan</option><option value="25">Erzurum</option><option value="26">Eskişehir</option><option value="27">Gaziantep</option><option value="28">Giresun</option><option value="29">Gümüşhane</option><option value="30">Hakkâri</option><option value="31">Hatay</option><option value="32">Isparta</option><option value="33">Mersin</option><option value="34">istanbul</option><option value="35">izmir</option><option value="36">Kars</option><option value="37">Kastamonu</option><option value="38">Kayseri</option><option value="39">Kırklareli</option><option value="40">Kırşehir</option><option value="41">Kocaeli</option><option value="42">Konya</option><option value="43">Kütahya</option><option value="44">Malatya</option><option value="45">Manisa</option><option value="46">Kahramanmaraş</option><option value="47">Mardin</option><option value="48">Muğla</option><option value="49">Muş</option><option value="50">Nevşehir</option><option value="51">Niğde</option><option value="52">Ordu</option><option value="53">Rize</option><option value="54">Sakarya</option><option value="55">Samsun</option><option value="56">Siirt</option><option value="57">Sinop</option><option value="58">Sivas</option><option value="59">Tekirdağ</option><option value="60">Tokat</option><option value="61">Trabzon</option><option value="62">Tunceli</option><option value="63">Şanlıurfa</option><option value="64">Uşak</option><option value="65">Van</option><option value="66">Yozgat</option><option value="67">Zonguldak</option><option value="68">Aksaray</option><option value="69">Bayburt</option><option value="70">Karaman</option><option value="71">Kırıkkale</option><option value="72">Batman</option><option value="73">Şırnak</option><option value="74">Bartın</option><option value="75">Ardahan</option><option value="76">Iğdır</option><option value="77">Yalova</option><option value="78">Karabük</option><option value="79">Kilis</option><option value="80">Osmaniye</option><option value="81">Düzce</option></select>'
      ),
        $(".js-city-list").zelect({ placeholder: prayer_country_name });
    });
}
$(document).on("change", ".js-city-list", function (e, t) {
  $(".city-name").text($(".zelected").text()),
    $("body").removeClass("city-isActive"),
    getPrayer(t.value),
    getWeather(t.value),
    Cookies.set("prayer_country", t.value, { expires: 9999999, path: "/" }),
    Cookies.set("prayer_country_name", $(".zelected").text(), {
      expires: 9999999,
      path: "/",
    });
});
var topMasthead = {
  open: function () {
    $(".js-top-masthead").stop().css({ height: "250px" }),
      $(".js-top-masthead .content").stop().show(),
      $(".masthead-close").html("Reklamı Kapat"),
      $(".js-top-masthead").addClass("isOpen");
  },
  close: function () {
    $(".js-top-masthead").stop().css({ height: "0px" }),
      $(".js-top-masthead .content").stop().hide(),
      $(".masthead-close").html("Reklamı Aç"),
      $(".js-top-masthead").removeClass("isOpen");
  },
};
$(".masthead-close").on("click", function () {
  $(".js-top-masthead").hasClass("isOpen")
    ? topMasthead.close()
    : topMasthead.open();
}),
  $("img.lazy").length > 0 &&
    $("img.lazy").lazyload({
      effect: "fadeIn",
      skip_invisible: !1,
      failure_limit: 100,
    });
var windowWidth = $(window).width();
if (
  (QueryString.wr &&
    Cookies.set("pref_desktop", 1, {
      expires: 999,
      path: "/",
      domain: "haber7.com",
    }),
  headlineFullSlider.length > 0 &&
    (QueryString.manset &&
      headlineFullSlider
        .addClass("highlight")
        .slick("goTo", QueryString.manset - 1),
    headlineFullSlider.on("beforeChange", function () {
      headlineFullSlider.removeClass("highlight");
    }),
    $(".headline-slider-full .slider-arrow").on("click", function () {
      $(this).hasClass("next")
        ? fullSliderPushAction()
        : $(this).hasClass("prev") && fullSliderPushAction();
    })),
  isMobile.any() &&
    !Cookies.get("ignore_mobile_site") &&
    ($(".mobile-redirect-banner").show(),
    $(".mobile-redirect-banner").on("click", function () {
      Cookies.remove("pref_desktop", { path: "/", domain: "haber7.com" });
    }),
    $(".mobile-redirect-banner-close").click(function () {
      $(".mobile-redirect-banner").fadeOut(250),
        Cookies.set("ignore_mobile_site", 1, { expires: 999, path: "/" });
    })),
  isMobile.any() ||
    navigator.userAgent.indexOf("Safari") == -1 ||
    navigator.userAgent.indexOf("Chrome") != -1 ||
    $("html").css({ "overflow-x": "hidden" }),
  $(".news-comment-write-button").on("click", function () {
    $(this).hide(),
      $(".news-comment-form").show(),
      $(".news-comment-form_textarea").focus();
  }),
  $(document).on("click", ".news-comment-list-content span", function (e) {
    e.preventDefault();
    var t = $(this),
      i = $(this).data("button-name"),
      a = $(this).closest("li"),
      o = $(this).closest("li").attr("data-comment-id"),
      n =
        ($(this).closest("li").attr("data-news-id"),
        $(".form-send-api").attr("data-action"));
    if (
      ($(this).hasClass("active") ||
        "report-button" != i ||
        $.ajax({
          type: "POST",
          url: apiUrl + "content/report_comment/" + o,
          success: function (e) {
            t.text("Şikayet edildi.");
          },
          error: function (e) {
            t.text("Bir hata oluştu.");
          },
        }),
      $(this).hasClass("active") ||
        "like-button" != i ||
        $.ajax({
          type: "POST",
          url: apiUrl + "content/like_comment/" + o,
          success: function (e) {
            t.addClass("success").find("span").text("Beğenildi");
            var i = a.find(".like-count-item");
            i.text(parseInt(i.text()) + 1);
          },
          error: function (e) {
            t.addClass("error").find("span").text("Bir hata oluştu");
          },
        }),
      "reply-button" == i)
    ) {
      $(this).attr("data-action");
      $(this).hasClass("active")
        ? a.find(".write-reply").toggleClass("hide")
        : ($(this).closest(".bottom").append('<div class="write-reply"></div>'),
          a
            .find(".write-reply")
            .append($(".news-comment-form").first().clone()),
          a
            .find(".news-comment-formt input, .comment-content textarea")
            .val(""),
          a.find(".news-comment-form").attr("data-action", n),
          a
            .find("textarea")
            .attr("placeholder", "Bu yorum hakkında ne düşünüyorsunuz?"),
          a
            .find(".write-reply .news-comment-form")
            .append('<input type="hidden" name="parent" value="' + o + '">'));
    }
    $(this).addClass("active");
  }),
  $(document).on("submit", ".news-comment-form", function (e) {
    e.preventDefault();
    var t = $(this),
      i = $(this).parent(".news-comment-info");
    0 === i.length &&
      ($(this).parent().prepend('<div class="news-comment-info"></div>'),
      (i = $(this).prev(".news-comment-info")));
    var a = $(this).attr("data-action");
    $.ajax({
      type: "POST",
      url: apiUrl + a,
      data: $(this).serialize(),
      success: function (e) {
        i.html('<span class="success">' + e.msg + "</span>"),
          t.find("input,textarea").val("");
      },
      error: function (e) {
        i.html('<span class="error">' + e.responseJSON.msg + "</span>");
      },
    }).complete(function (e) {
      i.slideDown(200),
        setTimeout(function () {
          i.slideUp(200);
        }, 7e3);
    });
  }),
  $(".news-share-secondary_item.comment").on("click", function () {
    var e = $(".news-comment-section").offset().top - 200;
    $("html, body").stop().animate({ scrollTop: e }, 600);
  }),
  $(".text-size").on("click", function () {
    var e = $(".news-content p"),
      t = ["18px", "20px", "22px"],
      i = e.css("font-size"),
      a = t.indexOf(i) + 1;
    t.length == a ? e.css("font-size", t[0]) : e.css("font-size", t[a]);
  }),
  $(".news-tags").length > 0 &&
    $(".news-tags").height() > 37 &&
    $(".news-tags a").css({ "margin-bottom": "8px" }),
  $(".inline-image-alt").each(function () {
    var e = $(this).attr("alt"),
      t = '<span class="image-caption-text">' + e + "</span>";
    "" != e && $(this)[0].hasAttribute("alt") && $(this).after(t);
  }),
  (window.onload = function () {
    $(".js-detail-image").length > 0 &&
      replaceBrokenImages(
        "https://i.haber7.net/assets/v3/common/images/broken-photo.jpg"
      );
  }),
  void 0 == Cookies.get("cookie_message") && $(".cookie-message").show(),
  $(".cookie-message-close").on("click", function () {
    $(".cookie-message").hide(),
      Cookies.set("cookie_message", "closed", { expires: 9999999, path: "/" });
  }),
  $(".news-inline-gallery").length > 0)
) {
  var defaultUrl = $("link[rel='canonical']").attr("href");
  $(".news-inline-gallery-item").fancybox({
    minWidth: 700,
    loop: !1,
    topRatio: 0,
    openEffect: "elastic",
    nextEffect: "fade",
    prevEffect: "fade",
    afterLoad: function (e, t) {
      history.replaceState(
        "",
        "",
        this.element.data("href") + "?new-inline-gallery=1"
      ),
        $(".fancy-gallery-title, .fancy-right-container").remove(),
        $(".fancybox-overlay").append(
          '<h3 class="fancy-gallery-title">' +
            $(".news-inline-gallery h4").text() +
            '</h3><div class="fancy-right-container"><span class="fancy-pager js-fancy-count"></span><span class="spot">' +
            this.title +
            '</span><div class="fancy-300x250"><div class="content">' +
            inlineGalleryAds +
            '</div></div><div class="fancy-share"><h4>PAYLAŞ</h4><a data-popup-width="550" data-popup-height="300" data-popup-url="https://www.facebook.com/sharer.php?u=' +
            this.element.data("href") +
            '" data-popup-url-extra="#" class="js-share-button news-share-secondary_item facebook"><i class="zmdi zmdi-facebook"></i></a><a data-popup-width="550" data-popup-height="300" data-popup-url="https://twitter.com/share?text=" data-popup-url-extra="&amp;url=' +
            this.element.data("href") +
            '" class="js-share-button news-share-secondary_item twitter"><i class="zmdi zmdi-twitter"></i></a></div></div>'
        ),
        $(".js-fancy-count").text(this.index + 1 + " / " + this.group.length),
        nextPageTrackingAction(
          window.location.pathname + "?new-inline-gallery=1"
        );
    },
    afterClose: function () {
      history.replaceState("", "", defaultUrl);
    },
    onPlayEnd: function () {
      $.fancybox.close();
    },
    padding: 0,
    margin: [150, 300, 220, 0],
    helpers: { title: null },
  });
}
$(".inline-image-alt").length > 0 &&
  ($(".inline-image-alt").on("click", function () {
    var e = $(this).attr("src");
    $("body").append(
      '<div class="inline-image-popup"><div class="inline-image-popup_close">KAPAT <i class="zmdi zmdi-close-circle"></i></div><img class="inline-image-popup_content" src="' +
        e +
        '"></div>'
    );
  }),
  $(document).on(
    "click",
    ".inline-image-popup, .inline-image-popup_close",
    function () {
      $(".inline-image-popup").remove();
    }
  ),
  $(document).on("click", ".inline-image-popup_content", function (e) {
    e.stopPropagation();
  }),
  $(document).on("keyup", function (e) {
    27 == e.keyCode && $(".inline-image-popup").remove();
  }));
var getPageContentHeight;
$('[data-sticky~="home"]')
  ? ((getPageContentHeight = $(".main-content").height()),
    $(".pageskin-item").css("height", getPageContentHeight))
  : $('[data-sticky~="detail"]') &&
    ((getPageContentHeight = $(".news-detail").height()),
    $(".pageskin-item").css("height", getPageContentHeight)),
  currencySlideAction(),
  setInterval(function () {
    currencySlideAction();
  }, 1e4);
var slug = function (e) {
  (e = e.replace(/^\s+|\s+$/g, "")), (e = e.toLowerCase());
  for (
    var t = "ãàáäâẽèéëêìíïîıõòóöôùúüûñçğş·/_,:;",
      i = "aaaaaeeeeeiiiiiooooouuuuncgs------",
      a = 0,
      o = t.length;
    a < o;
    a++
  )
    e = e.replace(new RegExp(t.charAt(a), "g"), i.charAt(a));
  return (e = e
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-"));
};
if (!svgdedect())
  for (
    var imageElement = document.getElementsByTagName("img"),
      i = 0,
      n = imageElement.length;
    i < n;
    i++
  ) {
    var img = imageElement[i],
      src = img.getAttribute("src");
    src.match(/svgz?$/) &&
      img.setAttribute("src", img.getAttribute("data-svg-fallback"));
  }
$(document).on("click", 'a[href=""], a[href^="#"]', function (e) {
  e.preventDefault();
});

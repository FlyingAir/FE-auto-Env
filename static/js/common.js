// Init App
var_app_history = [];

var myApp = new Framework7({
	modalTitle: 'Gshopper',
	// Enable Material theme
	material: true,
	materialRipple: false
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {

	myApp.showIndicator();
});
$$(document).on('ajaxComplete', function (e) {

	myApp.hideIndicator();
});

myApp.onPageBeforeInit('*', function (page) {
	//alert(page.url)
	//myApp.alert('아이디를 확인해주세요','알림');

});




myApp.onPageInit('member-login', function (page) {

	//myApp.alert('아이디를 확인해주세요','알림');

});

myApp.onPageInit('member-search_idpw', function (page) {

	if (page.query.type == "1") {
		//기본 접속
	} else if (page.query.type == "2") {
		$$(".member_search_idpw").attr("class", "member_search_idpw show_tab2");
		$$(".sub_tab a").removeClass("tab_active");
		$$(".sub_tab a").eq(1).addClass("tab_active");
	} else {
		//myApp.alert('알지못함.','알림');
	}

	$$(".sub_tab a").each(function () {
		$$(this).click(function () {
			$$(".member_search_idpw").attr("class", "member_search_idpw show_tab" + ($$(this).index() + 1));
			$$(".sub_tab a").removeClass("tab_active");
			$$(this).addClass("tab_active");
		});
	});

});

myApp.onPageInit('member-change_pw', function (page) {
	$$(".btn_reset").click(function () {
		myApp.alert('비밀번호 변경이 완료되였습니다.', '알림', function () {
			mainView.router.loadPage('./html/member/login.html');
		});
	})

})



myApp.onPageInit('detail', function (page) {

	$$(".tab02 a").each(function () {
		$$(this).click(function () {
			$$(".tab02 a").removeClass("tab_active");
			$$(".subnavbar .tab02 a").eq($$(this).index()).addClass("tab_active");
			$$(".detail .tab02 a").eq($$(this).index()).addClass("tab_active");
			$$(".detail_content").hide();
			$$(".detail_content.content0" + ($$(this).index() + 1)).show();
		});
	});

	$$(".page-content").scroll(function (event) {

		var e = $$(event.target).scrollTop();

		if (e > $$(".img_section").height() + $$(".info_section").height() + 10) {
			$$(".subnavbar").show();
			$$(".tb_top").show();
		} else {
			$$(".subnavbar").hide();
			$$(".tb_top").hide();
		}
		$$(".tb_top").click(function (event) {
			event.stopPropagation();
			event.preventDefault();
			$$(".page-content").scrollTop(0, 600);
		});
	});

	$$(".tb_control").click(function () {
		$$(".toolbar-buy").toggleClass("open");
	});

	$$(".option_select input.sel").each(function () {
		$$(this).click(function () {
			$$(this).toggleClass("on");
		});
	});

});

myApp.onPageInit('main', function (page) {


	$$(".page-content").scroll(function (event) {

		var e = $$(event.target).scrollTop();

		if (e > 300) {
			$$(".backtoTop").show();
		} else {
			$$(".backtoTop").hide();
		}
		$$(".backtoTop a").click(function (event) {
			event.stopPropagation();
			event.preventDefault();
			$$(".page-content").scrollTop(0, 600);
		});
	});

});

//yingmu
myApp.onPageInit('category_product', function (page) {
	$$('.panel-overlay').css("zIndex", "501");
	$$(".current_state").click(function () {
		$$(this).toggleClass("selected");
	})
	$$(".sort_lists li").each(function () {
		$$(this).click(function () {
			$$('.current_state span').text($$(this).text());
			$$('.current_state').toggleClass("selected");
		})
	});
	$$(".page-content").scroll(function (event) {
		var e = $$(event.target).scrollTop();
		if (e > 100) {
			$$(".backtoTop").show();
		} else {
			$$(".backtoTop").hide();
		}
		$$(".backtoTop a").click(function (event) {
			event.stopPropagation();
			event.preventDefault();
			$$(".page-content").scrollTop(0, 600);
		});
	});
	//closeBtn
	$$('.del').click(function () {
		$$('.panel-overlay').click();
	})
	//reset
	$$('.reset').click(function () {

	})
	//filter
	$$('.filter_classify_lists li,.filter_brand_lists li').each(function () {
		$$(this).click(function () {
			$$(this).toggleClass("active");
			var $that = $$(this);
			var dataID = $$(this).data("id");
			if ($$(this).hasClass("active")) {
				var li = document.createElement("li");
				$$(li).append($$(this).text());
				var i = document.createElement("i");
				$$(i).addClass("icon-del");
				$$(li).append(i);
				$$(li).addClass(dataID);
				$$('.filter_selected ul').append(li);

			} else {
				$$('.filter_selected ul li').each(function () {
					if ($$(this).hasClass(dataID)) {
						$$(this).remove();
					}
				})
			}
			//delBtn
			$$('.icon-del').each(function () {
				$$(this).click(function () {
					var className = $$(this).parent().attr('class');
					$$(this).parent().remove();
					$$('.accordion-item-content ul li').each(function () {
						if ($$(this).data("id") == className) {
							$$(this).removeClass("active");
						}
					})
				})
			})

		})
	})

	//price-range

});

myApp.onPageInit('cart', function (page) {
	var clientHeight = document.body.clientHeight;
	var height = $$('.cart_lists').height();
	var marginTop = clientHeight - height - 246;
	if (height < 400) {
		$$('.prompt').hide();
		$$('.cart_statement').css({
			'margin-top': marginTop + "px"
		})
	}
	console.log(height);
	$$('.page-content').scroll(function (event) {
		var e = $$(event.target).scrollTop();
		console.log(e);
		if ((height + 40 - e < clientHeight - 120) || (height < 400)) {
			$$('.prompt').hide();
		} else {
			$$('.prompt').show();
		}

	})
});

myApp.onPageInit('search', function (page) {
	function isExist() {
		if ($$('.search_recent li').length) {
			$$('.search_recent_delall').show();
		} else {
			$$('.search_recent_delall').hide();
		}
	}
	isExist();
	$$('.search_recent li .icon-del').each(function () {
		$$(this).click(function () {
			$$(this).parent().remove();
			isExist();
		})
	})
	$$('.search_bar_input').on('keyup keydown keychange', function (e) {
		if ($$('.search_bar_input').val()) {
			$$('.icon-clear').show();
			//模拟
			$$('.search_page_content').hide();
			$$('.search_relation').show();
		} else {
			$$('.icon-clear').hide();
			$$('.search_page_content').show();
			$$('.search_relation').hide();
		}
		$$('.icon-clear').click(function () {
			$$('.search_bar_input').val("");
			$$('.icon-clear').hide();
			$$('.search_page_content').show();
			$$('.search_relation').hide();
		})
	})
	$$('.search_recent_delall a').click(function () {
		$$('.search_recent').remove();
		$$('.search_recent_delall').hide();
	})
});

myApp.onPageInit('faq', function (page) {
	$$('.current_state').click(function(){
		$$('.sort_lists').show();
		$$('.sort_lists li').each(function(){
			$$(this).click(function(){
				$$('.cur-select').text($$(this).text());
				$$('.sort_lists').hide();
			})
		})
	})
});
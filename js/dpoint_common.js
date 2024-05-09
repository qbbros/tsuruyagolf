// パラメーターチェッカー
var checkParam_format = function(searchPrm, getkey){
	var prmAry = searchPrm.split('?')[1].split('&');
	var rtnBool = false;
	for (var i = 0; i < prmAry.length; i++) {
		var key = prmAry[i].split('=')[0];
		var prm = prmAry[i].split('=')[1];
		if(typeof(prm) === 'string' && getkey === key){
			rtnBool = true;
		}
	}
	return rtnBool;
};

// UseAgent アプリ判定
// dポイントクラブアプリ
var dpointClubApplicationFlg = function(){

	if (!(window.navigator.userAgent.indexOf('dpointApp(') != -1) && !(window.navigator.userAgent.indexOf('dpointCard(') != -1)){
		// アプリ以外
		return false;
	} else {
		// アプリ判定
		return true;
	}
};
// d払いアプリ
var dpayApplicationFlg = function(){

	if (!(window.navigator.userAgent.indexOf('jp.kp.sp.sdk.ios_') != -1) && !(window.navigator.userAgent.indexOf('jp.kp.sp.apl.ios_') != -1) && !(window.navigator.userAgent.indexOf('jp.kp.sp.sdk.and_') != -1) && !(window.navigator.userAgent.indexOf('jp.kp.sp.apl.and_') != -1)){
		// アプリ以外
		return false;
	} else {
		// アプリ判定
		return true;
	}
};
// ahamo
var ahamoApplicationFlg = function(){

	if (!(window.navigator.userAgent.indexOf('ahamo/') != -1)){
		// アプリ以外
		return false;
	} else {
		// アプリ判定
		return true;
	}
};

// URL
// 登録,ログイン & ログアウト
var LOGIN_URL ='';
if (location.hostname == 'dpoint.docomo.ne.jp' || location.hostname == 'stg.dpoint.docomo.ne.jp') {
	LOGIN_URL = 'https://cfg.smt.docomo.ne.jp/auth/cgi/anidlogin?rl=';
} else {
	LOGIN_URL = 'https://ve.m.cfg.smt.docomo.ne.jp/auth/cgi/anidlogin?rl=';
}
var LOGOUT_URL = '/api/logout.do?nl=';
var REGIST_URL = 'https://id.smt.docomo.ne.jp/cgi8/id/tpl/REG101?serviceurl=https%3A%2F%2Fdpoint.docomo.ne.jp%2Findex.html&servicereferer=';
var MEMBER_URL = 'https://profile.smt.docomo.ne.jp/VIEW_ESITE/mem/sc/main.jsp?nid=MEG002006BJP&dcmreturl=';

var headerHeight = 56;
var smallsize_max = 640;
var widthType;
var layerType;
var wdw_w;
var page_w;
var page_h;
var CURRENT_URL = location.href.replace(/\?.*$/,'');
var LOCATION_PATH = location.pathname;
var URL_PRM = location.search;
var KEY_PRM0 = 'id';
var KEY_PRM1 = 'cid';
var KEY_PRM2 = 'tab';
var KEY_PRM3 = 'ctid';

if(URL_PRM.indexOf('?') !== -1){
	var SET_ID = checkParam_format(URL_PRM, KEY_PRM0);
	var SET_CID = checkParam_format(URL_PRM, KEY_PRM1);
	var SET_TAB = checkParam_format(URL_PRM, KEY_PRM2);
	var SET_CTID = checkParam_format(URL_PRM, KEY_PRM3);
	if(SET_ID){
		CURRENT_URL = CURRENT_URL + '?' + KEY_PRM0 + '=' + URL_PRM.split(KEY_PRM0 + '=')[1].split('&')[0];
		if(SET_CID){
			CURRENT_URL = CURRENT_URL + '&' + KEY_PRM1 + '=' + URL_PRM.split(KEY_PRM1 + '=')[1].split('&')[0];
		}
		if(SET_TAB){
			CURRENT_URL = CURRENT_URL + '&' + KEY_PRM2 + '=' + URL_PRM.split(KEY_PRM2 + '=')[1].split('&')[0];
		}
	}else if(SET_TAB){
		CURRENT_URL = CURRENT_URL + '?' + KEY_PRM2 + '=' + URL_PRM.split(KEY_PRM2 + '=')[1].split('&')[0];
	}else if(SET_CTID){
		CURRENT_URL = CURRENT_URL + '?' + KEY_PRM3 + '=' + URL_PRM.split(KEY_PRM3 + '=')[1].split('&')[0];
	}
}

var URL_HASH = location.hash;
if(URL_HASH){
	CURRENT_URL = CURRENT_URL + URL_HASH;
}

var ENCODED_TOP_URL = 'https://' + location.host + '/index.html';
var ENCODED_CURRENT_URL = encodeURIComponent(CURRENT_URL).replace(/[.]/g, function(c) {return '%' + c.charCodeAt(0).toString(16); });;

////////////////////

var changeType_date = function(datestr){
	var year = Number(datestr.slice(0, 4));
	var month = Number(datestr.slice(5, 7)) - 1;
	var day = Number(datestr.slice(8, 10));
	var date = new Date(year, month, day, 0, 0);
	var hour = Number(datestr.slice(11, 13));
	var second = Number(datestr.slice(14, 16));
	var minit = Number(datestr.slice(17, 19));
	var date = new Date(year, month, day, hour, second, minit, 0, 0);
	return date;
};
//開始日終了日を判定
var checkDate_display = function(startdate, enddate){
	var toDay = new Date();
	var startDay = changeType_date(startdate);
	var endDay = changeType_date(enddate);
	var rtn = true;
	if(!(startDay.getTime() <= toDay.getTime())){
		rtn = false;
	}
	if(enddate !== ''){
		if(!(toDay.getTime() <= endDay.getTime())){
			rtn = false;
		}
	}
	return rtn;
};

var getSize_elements = function(){
	wdw_w = $(window).width();
	if(wdw_w > smallsize_max){
		widthType = 'wide';
	}else{
		widthType = 'small';
	}
	if($('#wrap_page[class*="tlp_"]').length > 0){
		layerType = 'toplayer';
	}else if($('#wrap_page[class*="auth_"]').length > 0){
		layerType = 'underAuth';
	}else if($('#wrap_page[class*="ulp_"]').length > 0){
		layerType = 'underlayer';
	}
	if(layerType === 'toplayer'){
		setFooterpadding();
	}
	page_w = $('#wrap_page').outerWidth(true);
	page_h = $('#wrap_page').outerHeight(true);
	$('#bgscreen').css({
		'width': page_w + 'px',
		'height': page_h + 'px',
	});
};
var setFooterpadding = function(isWideNavi){
	var isWideNavi = isWideNavi || false;
	var smallnaviObj = $('#navi_main_small');
	var smallnavi_h = $(smallnaviObj).outerHeight(true);
	var pbNum = 10;
	if(widthType === 'wide'){
		$('footer').css('padding-bottom', pbNum + 'px');
		if (isWideNavi) {
			$('footer').css('padding-bottom', (smallnavi_h + pbNum) + 'px');
		}
	}else if(widthType === 'small'){
		$('footer').css('padding-bottom', (smallnavi_h + pbNum) + 'px');
	}
};
var prepareHmenu = function(){
	$('#box_hmenu').css({
		'left': - page_w + 'px'
	});
};
var flag_hmenu = false;
var saveNum_scroll;
var changeHmenu = function(spd){
	getSize_elements();
	if(flag_hmenu){
		$(document).scrollTop(saveNum_scroll);
		$('#box_hmenu').css('overflow', 'hidden').animate({
			'left': - page_w + 'px'
		}, spd * 1000, function(){
			// 背景固定 リセット
			$('html, body').css({
				'overflow': '',
				'touch-action': '',
				'height': ''
			});
			$(this).scrollTop(0);
			$(this).css('display', 'none');
			$('#bgscreen').css({'display': 'none'});
		});
		flag_hmenu = false;
	}else{
		$('#bgscreen').css({
			'display': 'block'
		});
		$('#box_hmenu').css({
			'display': 'block',
			'overflow': 'hidden'
		});
		$('#box_hmenu').animate({
			'left': 0 + 'px'
		}, spd * 1000, function(){
			// 背景固定
			$('html, body').css({
				'overflow': 'hidden',
				'touch-action': 'none',
				'height': '100%'
			});
			$(this).css('overflow', 'auto');
			$('#bgscreen').css({
				'width': $('#wrap_page').outerWidth(true) + 'px'
			});
			saveNum_scroll = $(document).scrollTop();
		});
		flag_hmenu = true;
	}
};

var setNomore = function(){
	$('.nomore_wide .moreitem').addClass('dispblock_wide');
	$('.nomore_wide .btn_more').addClass('dispnone_wide');
};
var judgeTouchEventState = function(){
	return ('ontouchstart' in window);
};
var searchDV_rtnstate = function(){
	var thisUA = navigator.userAgent.toLowerCase();
	var strDev = 'DV_pc';
	if(thisUA.indexOf("ipod") != -1){strDev = 'DV_spn';
	}else if(thisUA.indexOf("iphone") != -1){strDev = 'DV_spn';
	}
	if(thisUA.indexOf("ipad") != -1){strDev = 'DV_tab';
	}else if(thisUA.indexOf("android") != -1){
		if(thisUA.indexOf("mobile") != -1){strDev = 'DV_spn';
		}else{strDev = 'DV_tab';
		}
	}
	return strDev;
};
var touchEventBool;
var strDevice;
var loadFunc = function(){
	touchEventBool = judgeTouchEventState();
	strDevice = searchDV_rtnstate();
	getSize_elements();
	prepareHmenu();
	setHandler();
	if(layerType === 'toplayer'){
		dpoint.common.userdata.setDataGetFunc();
		setHmenuLoginURL();
	} else if(layerType === 'underAuth') {
		dpoint.common.userdata.setDataGetFunc();
		setHmenuLoginURL();
	} else {
		setHmenuLoginURL();
	}
};
var loadLowerFunc = function(){
	setLowerLoginURL();
	getSize_elements();
};

var timer_resize = false;
var resizeFunc = function(){
	if (timer_resize !== false) {
		clearTimeout(timer_resize);
	}
	timer_resize = setTimeout(function() {
		getSize_elements();
	}, 200);
};
var rollOverCss = function(thisObj, act){
	if(act === 'mouseover'){
		$(thisObj).addClass('rollover');
	}else if(act === 'mouseout'){
		$(thisObj).removeClass('rollover');
	}
};
var setHandler = function(){
	/**/
	var spd_hmenu = 0.5;
	$('#btn_hmenu').on('click', function(){
		changeHmenu(spd_hmenu);
		dataLayer.push(
			{'click_id': 'dpc_hdr_menu'}
		);
	});
	$('#box_hmenu .btn_close').on('click', function(){
		changeHmenu(spd_hmenu);
	});
	$('#box_hmenu').on('click', function(event){
		var tgtElm = $(event.target);
		if($('#hdr_hmenu', tgtElm).length === 1 && $('#body_hmenu', tgtElm).length === 1){
			changeHmenu(spd_hmenu);
		}
	});
	$('#bgscreen').on('click', function(){
		changeHmenu(spd_hmenu);
	});
	if(!touchEventBool){
		$('body').on('mouseover', '.ro_css', function(){
			rollOverCss($(this),'mouseover');
		});
		$('body').on('mouseout', '.ro_css', function(){
			rollOverCss($(this),'mouseout');
		});
	}
	/**/
};

var setLowerHandler = function(){
	$('#btn_gotop').on('click', function(){
		var speed = 0.3;
		$('html, body').animate({scrollTop:0}, speed * 1000, 'swing');
		dataLayer.push(
			{'click_id': 'dpc_footer_gotop'}
		);
	});
};

var setHmenuLoginURL = function(){
	$('#dpc_hbg_setting_member').attr('href', MEMBER_URL + ENCODED_CURRENT_URL);
	$('#dpc_hbg_support_login').attr('href', LOGIN_URL + ENCODED_CURRENT_URL);
	$('#dpc_hbg_support_logout').attr('href', LOGOUT_URL + ENCODED_CURRENT_URL);
};

var setLowerLoginURL = function(){
	// 共通フッター　テキストリンク　ログイン、ログアウト
	$('#dpc_footer_txtlogin').attr('href', LOGIN_URL + ENCODED_CURRENT_URL);
	$('#dpc_footer_txtlogout').attr('href', LOGOUT_URL + ENCODED_CURRENT_URL);
};

var scrollIdentifiedContent = function () {
	var target = $(URL_HASH);
	if ($(target)[0]) {
		var position = target.offset().top - headerHeight;
		$('html, body').animate({scrollTop : position}, 100);
	} else {
		var checkKey = 'scroll_position=';
		if (URL_PRM.indexOf(checkKey) !== -1 && URL_HASH ==='') {
			var elementId = URL_PRM.split(checkKey)[1].split('&')[0];
			var target = $('#'+ elementId);
			if($(target)[0]) {
				var position = target.offset().top - headerHeight;
				$('html, body').animate({scrollTop : position}, 300, 'swing');
			}
		}
	}
};

var removeDispalyClass = function () {
	// SP/TABとPCでDOM制御
	if (window.navigator.userAgent.indexOf("Android") != -1 || window.navigator.userAgent.indexOf("iPhone") != -1 || window.navigator.userAgent.indexOf("iPad") != -1 || window.navigator.userAgent.indexOf("Windows Phone") != -1 || window.navigator.userAgent.indexOf("BlackBerry") != -1) {
		// SPのみ非表示にする
		$('.sp_displayNone').remove();
	}else{
		// PCのみ非表示にする
		$('.pc_displayNone').remove();
	}
};

$(function(){
	var appWebViewFlag = false;

	// ポイント情報取得のAPI需要測定用
	// 認証なしヘッダーのクッキー制御
	// クッキーがあるか確認
	if(document.cookie.indexOf('check_header_info') === -1) {
		// ない場合はセッションクッキーを発行
		document.cookie = 'check_header_info=yes; path=/;';
		// GAイベントを発火する
		dataLayer.push({'event': 'SpecialNonInterHit','PAAction': 'Header_get_point_auth_no-cookie'});
	} else {
		// ある場合は何もしない
	}

	// アプリ以外の場合
	if (!(dpointClubApplicationFlg() || dpayApplicationFlg() || ahamoApplicationFlg())) {
		// ヘッダーを読み込む
		$('#load_upper').load('/common/inc/common_upper.html', function(data, status, object) {
			$('#load_hmenu').load('/common/inc/common_hmenu.html', function(data, status, object) {
				loadFunc();
				accordionLoad();
				accordionHmenuLoad();
				finishTmplLoad();
				removeDispalyClass();
			});
		});
		// フッターを読み込む
		if($('#load_lower').children('div').length === 0) {
			var addDiv = '<div id="load_lower_gotop"></div><div id="load_lower_sns"></div><div id="load_lower_another"></div><div id="load_lower_list"></div>';
    	    $('#load_lower').append(addDiv);

			$('#load_lower_gotop').load('/common/inc/common_lower_gotop.html', function(data, status, object) {
				setLowerHandler();
			});
			$('#load_lower_sns').load('/common/inc/common_lower_sns.html');
			$('#load_lower_another').load('/common/inc/common_lower_another.html');
			$('#load_lower_list').load('/common/inc/common_lower_list.html', function(data, status, object) {
				loadLowerFunc();
				finishTmplLoad();
			});

		} else {
			// gotopを読み込む
			if($('#load_lower_gotop').length !== 0){
				$('#load_lower_gotop').load('/common/inc/common_lower_gotop.html', function(data, status, object) {
					setLowerHandler();
				});
			}
			// SNSを読み込む
			if($('#load_lower_sns').length !== 0){
				$('#load_lower_sns').load('/common/inc/common_lower_sns.html');	
			}
			// another shopを読み込む
			if($('#load_lower_another').length !== 0){
				$('#load_lower_another').load('/common/inc/common_lower_another.html');
			}
			// LISTーを読み込む
			if($('#load_lower_list').length !== 0){
				$('#load_lower_list').load('/common/inc/common_lower_list.html', function(data, status, object) {
					loadLowerFunc();
					finishTmplLoad();
				});
			}
		}

	// アプリの場合
	// dポイントクラブアプリ・d払いアプリの場合は共通パーツを読み込まない
	} else {
		appWebViewFlag = true;
		// ヘッダーフッターを非表示にする
		$('#load_upper').hide();
		$('#load_lower').hide();
		// パンくずを非表示にする
		$('#bc_ulp').hide();
		$('#ulp_cmntop h2').css('border-top','none');
		// ヘッダーフッターは読み込まない
		loadFunc();
		accordionLoad();
		headerHeight = 0;
		if(typeof dpoint != 'undefined'){
			if(typeof dpoint.common != 'undefined'){
				if(typeof dpoint.common.CommonPartsLoadedCallback === "function"){
					dpoint.common.CommonPartsLoadedCallback();
				}
			}
		}
		// CSS制御用クラスを追加
		$('#wrap_page').addClass('dpointAppWebView');
		// 表示制御用クラス
		// アプリのみ非表示にする
		$('.dpcApp_displayNone').remove();
	}

	if(touchEventBool){
		if(strDevice === 'DV_pc'){
			$(window).on('resize',function(){resizeFunc();});
		}else{
			$(window).on('orientationchange',function(){resizeFunc();});
		}
	}else{
		$(window).on('resize',function(){resizeFunc();});
	}

	// キャンペーン一覧への遷移 （アプリに場合は導線は非表示にする）
	if(document.querySelector('#common_campaign_end')) {
		$('#common_campaign_end').load('/common/inc/common_campaign_end.html',function(data, status, object) {
			if(appWebViewFlag){
				$('.campaign_current').remove();
			}
		});
	}
	// simple ボタンhref 書き換え
	var chageLocationSimple = function(){
		if(document.getElementById("dpc_common_campaign_simple_btn") != null){
			var targetSimpleId = document.getElementById("dpc_common_campaign_simple_btn");
			targetSimpleId.href = "com.nttdocomo.dpoint.start://campaign";
			clearInterval(interval_simple);
		}
	};
	if(document.querySelector('#load_back_button_simple')){
		$('#load_back_button_simple').load('/common/inc/common_lower_campaign_simple.html');
		if(appWebViewFlag){
			var interval_simple = setInterval(chageLocationSimple, 1000);
		}

	}
	// poinko ボタンhref 書き換え
	var chageLocationPoinko = function(){
		if(document.getElementById("dpc_common_campaign_poinko_btn") != null){
			var targetpoinkoId = document.getElementById("dpc_common_campaign_poinko_btn");
			targetpoinkoId.href = "com.nttdocomo.dpoint.start://campaign";
			clearInterval(interval_poinko);
		}
	};
	if(document.querySelector('#load_back_button_poinko')) {
		$('#load_back_button_poinko').load('/common/inc/common_lower_campaign_poinko.html');
		if(appWebViewFlag){
			var interval_poinko = setInterval(chageLocationPoinko, 1000);

		}
	}

});

$(window).on('load', function () {
	scrollIdentifiedContent();
});

////////////////////

// ★★★20181120修正 追加しました start ★★★
var countLoaded = countLoaded || 0;
var finishTmplLoad = function(){
	countLoaded += 1;
	if(countLoaded === 2){
		if(typeof dpoint != 'undefined'){
			if(typeof dpoint.common != 'undefined'){
				if(typeof dpoint.common.CommonPartsLoadedCallback === "function"){
					dpoint.common.CommonPartsLoadedCallback();
				}
			}
		}
	}
};
// ★★★20181120修正 追加しました end ★★★

// アコーディオンの開閉（汎用）
var accordionLoad = function() {
	$('.js-click').on('click', function () {
		$(this).toggleClass('js-open');//arrow 向き変更
		$(this).next('.js-target').toggleClass('js-open');//開閉
	});
};
// アコーディオンの開閉（ハンバーガーメニュー内）
var accordionHmenuLoad = function() {
	$('.js-click_hmenu').on('click', function () {
		$(this).toggleClass('js-open');//arrow 向き変更
		$(this).next('.js-target_hmenu').toggleClass('js-open');//開閉
	});
};
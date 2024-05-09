	/*****************************************/
//キャンペーン詳細とご注意事項（＋－画像）
/*****************************************/
var open02 = 'img/notesbtn_m.png';
var close02 = 'img/notesbtn_p.png';

var cnt = 0;
$(document).on('click','.cpNotesBtn2',function(){
	if(cnt % 2 == 0){
		$(".cpNotesBtn2 img").attr("src", close02);
		$(".cpNotesBtnWrap2").addClass('shadowJs');
	}else{
		$(".cpNotesBtn2 img").attr("src", open02);
		$(".cpNotesBtnWrap2").removeClass('shadowJs');
	}
	$(".cpNotesFlame2").slideToggle(400);
  cnt = cnt + 1;
});

$(window).on('load',function () {
	if (window.navigator.userAgent.indexOf('dpointApp') != -1) {
		$('footer').removeClass('flbnpb');
		$('#load_back_button_poinko').addClass('flbnpb');
	} else {
		$('footer').addClass('flbnpb');
		$('#load_back_button_poinko').removeClass('flbnpb');
	}

});

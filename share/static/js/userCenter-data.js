$(function(){
    $("#hometown").distpicker('destroy'); //（.district为form下第一个div的类名）
    // $('#hometown').distpicker({
    //     province:"—— 所在省 ——",
    //     city:"—— 所在市 ——",
    //   district:"—— 所在区 ——",
    //   autoSelect: false,
    //   placeholder: true
    // })
    /* 日期选择 插件 */
	$('.dataTime').datetimepicker({
		format:'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
        showMeridian: 1,
        pickerPosition: "bottom-right"
    })
    // 个人中心资料导航
    $('.data-container-nav ul li').click(function(){
        $('.data-container-nav ul li').removeClass('data-nav-active');
        $(this).addClass('data-nav-active');
    })
    // 个人中心资料导航点击
    $('.base-msg-btn').click(function(){
        $('.person-banner-mainbox').addClass('data-box-active');
        $('.data-info-container').removeClass('data-box-active');
        $('.plate-title-tag').text('我的资料');
    })
    $('.info-msg-btn').click(function(){
        $('.data-info-container').addClass('data-box-active');
        $('.person-banner-mainbox').removeClass('data-box-active');
        $('.plate-title-tag').text('我的消息');
    })
})
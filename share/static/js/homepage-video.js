$(function(){
    // 判断屏幕宽度
    var docWidth;
    function judWidth(){
        if(docWidth<1200){
            $('.video-banner .row .col-sm-6').removeClass('div-to-5');
        }
        if(docWidth>1200){
            $('.video-banner .row .col-sm-6').addClass('div-to-5');
        }
    }
    judWidth();
    $(window).resize(function(){
        docWidth=$(window).width();
        judWidth();
    })
    // 视频导航内容
    $('.video-banner-nav li').click(function(){
        $('.video-banner-nav li').removeClass('video-banner-nav-active');
        $(this).addClass('video-banner-nav-active');
    })
})
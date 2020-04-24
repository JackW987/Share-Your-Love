$(function(){
    $(document).on('click','.follow-green-btn',function(){
        let cookie = getCookie("Bearer");
        if (cookie==null){
            $(".sign-btn").click();
        }else {
            follow($(this).data('id'));
            $(this).text('✔ 已关注');
            $(this).addClass('follow-green-btn-followed');
        }
    });
    $(document).on('mouseover','.follow-green-btn-followed',function(){
        $(this).text('✘ 取消关注');
        $(this).addClass('follow-green-btn-cancelled');
    });
    $(document).on('mouseout','.follow-green-btn-followed',function(){
        $(this).text('✔ 已关注')
        $(this).removeClass('follow-green-btn-cancelled');
    });
    $(document).on('click','.follow-green-btn-cancelled',function(){
        $(this).text('+ 关注');
        $(this).removeClass('follow-green-btn-cancelled');
        $(this).removeClass('follow-green-btn-followed');
        $(this).addClass('follow-green-btn');
    })
    $('.follow-user-banner-txt').each(function(){
        var max_width=26;
        if ($.trim($(this).text()).length>max_width) {
            $(this).text($.trim($(this).text()).substring(0,max_width));
            $(this).html($(this).html()+'...');
        }
    })
    $('.follow-recent-update-menu ul li a').each(function(){
        var max_width=10;
        if ($.trim($(this).text()).length>max_width) {
            $(this).text($.trim($(this).text()).substring(0,max_width));
            $(this).html($(this).html()+'...');
        }
    })
    /*  动态字数判断 */
    function fontLength(){
        $('.follow-user-banner-txt').each(function(){
            var max_width=26;
            if ($.trim($(this).text()).length>max_width) {
              $(this).text($.trim($(this).text()).substring(0,max_width));
              $(this).html($(this).html()+'...');
            }
        })
        $('.follow-recent-update-menu ul li a').each(function(){
            var max_width=10;
            if ($.trim($(this).text()).length>max_width) {
              $(this).text($.trim($(this).text()).substring(0,max_width));
              $(this).html($(this).html()+'...');
            }
        })  
    }
    /* 加载更多 */
    // $('.follow-user-load-more').click(function(){
    //     $(this).before('<div class="col-xs-4"><div class="follow-user-banner"><span class="follow-user-banner-name">测试用户</span><a href="userCenter.html" class="follow-user-banner-head"> </a><span class="follow-user-banner-txt">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</span><a href="javascipt:void(0);" class="follow-green-btn">+ 关注</a><div class="follow-recent-update-title clearfix"><span>最近更新</span><div></div></div><div class="follow-recent-update-menu"><ul class="clearfix"><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</a></li></ul></div></div></div><div class="col-xs-4"><div class="follow-user-banner"><span class="follow-user-banner-name">测试用户</span><a href="userCenter.html" class="follow-user-banner-head"> </a><span class="follow-user-banner-txt">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</span><a href="javascipt:void(0);" class="follow-green-btn">+ 关注</a><div class="follow-recent-update-title clearfix"><span>最近更新</span><div></div></div><div class="follow-recent-update-menu"><ul class="clearfix"><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</a></li></ul></div></div></div><div class="col-xs-4"><div class="follow-user-banner"><span class="follow-user-banner-name">测试用户</span><a href="userCenter.html" class="follow-user-banner-head"> </a><span class="follow-user-banner-txt">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</span><a href="javascipt:void(0);" class="follow-green-btn">+ 关注</a><div class="follow-recent-update-title clearfix"><span>最近更新</span><div></div></div><div class="follow-recent-update-menu"><ul class="clearfix"><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">年轻人为什么不努力？...</a></li><li><a href="imgTxt-browse.html">一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂一个有趣的灵魂</a></li></ul></div></div></div>');
    //     fontLength();
    // })
});

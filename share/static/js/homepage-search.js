$(function(){
    $('.the-most-nav li a').click(function(){
        $('.the-most-nav li a').removeClass('data-active-btn');
        $(this).addClass('data-active-btn');
    })
    $('.time-select-nav li a').click(function(){
        $('.time-select-nav li a').removeClass('data-active-btn');
        $(this).addClass('data-active-btn');
    })
    $('.banner-select-nav li a').click(function(){
        $('.banner-select-nav li a').removeClass('data-active-btn');
        $(this).addClass('data-active-btn');
    })
    $('.img-txt-main-txt').each(function(){
        var max_width=200;
        if ($(this).text().length>max_width) {
        $(this).text($(this).text().substring(0,max_width));
        $(this).html($(this).html()+'...');
        }
    })
    $(document).on('click','.like',function() {
        let cookies = getCookie('Bearer');
        if (cookies==null){
            $(".sign-btn").click();
            return
        }
        if ($(this).hasClass('liked')) {
            like($(this).data('id'));
            $(this).removeClass('liked');
            var spanDeText = parseInt($(this).find('span').text()) - 1;
            $(this).find('span').text(spanDeText);
        } else {
            like($(this).data('id'));
            $(this).addClass('liked');
            var spanInText = parseInt($(this).find('span').text()) +  1;
            $(this).find('span').text(spanInText);
        }
    })
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
    // 搜索版块block
    $('.se-re-video-btn').click(function(){
        $('.work-banner').removeClass('show-banner-active');
        $('.video-show-banner').addClass('show-banner-active');
        $('.file-data-nav').css('display','block');
        $('.data-nav').addClass('data-nav-active');
    })
    $('.se-re-imgTxt-btn').click(function(){
        $('.work-banner').removeClass('show-banner-active');
        $('.imgTxt-show-banner').addClass('show-banner-active');
        $('.file-data-nav').css('display','block');
        $('.data-nav').removeClass('data-nav-active');
        $('.the-most-nav').addClass('data-nav-active');
        $('.banner-select-nav').addClass('data-nav-active');
    })
    $('.se-re-user-btn').click(function(){
        $('.work-banner').removeClass('show-banner-active');
        $('.user-show-banner').addClass('show-banner-active');
        $('.file-data-nav').css('display','none');
    })
    // 导航
    $('.search-input-box li').click(function(){
        $('.search-input-box li').removeClass('search-input-active');
        $(this).addClass('search-input-active');
    })
})

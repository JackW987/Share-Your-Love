$(function(){
    $('.img-txt-main-txt').each(function(){
        var max_width=170;
        if ($(this).text().length>max_width) {
        $(this).text($(this).text().substring(0,max_width));
        $(this).html($(this).html()+'...');
        }
    })
    /* 爱心点击事件 */
    $('.like').click(function() {
        if ($(this).hasClass('liked')) {
            $(this).removeClass('liked');
            var spanDeText = parseInt($(this).find('span').text()) - 1;
            $(this).find('span').text(spanDeText);
        } else {
            $(this).addClass('liked');
            var spanInText = parseInt($(this).find('span').text()) +  1;
            $(this).find('span').text(spanInText);
        }
    })
    // 进入版块按钮
    $('.to-browse-btn').click(function(){
        var p=$('.banner-top-bg-mask').height();
        var sum=p-50;
        $(document).bind('mousewheel',function(){
            return false;
        })
        $('body,html').animate({
            'scrollTop':sum
        },600,function(){
            $(document).unbind('mousewheel');
        });
    })
    // 变换按钮
    $('.main-text-nav li').click(function(){
        $('.main-text-nav li').removeClass('main-li-active');
        $(this).addClass('main-li-active');
    })
    $('.video-show-btn').click(function(){
        $('.banner-plate').removeClass('banner-plate-active');
        $('.banner-video-plate').addClass('banner-plate-active');
    })
    $('.imgTxt-show-btn').click(function(){
        $('.banner-plate').removeClass('banner-plate-active');
        $('.banner-imgTxt-plate').addClass('banner-plate-active');
    })
    $('.sort-nav li').click(function(){
        $('.sort-nav li').removeClass('sort-li-active');
        $(this).addClass('sort-li-active')
    })
    // 热门标签变换
    $(document).on('click','.hot-tag-list li',function(){
        $('.hot-tag-list li').removeClass('hot-tag-active');
        $(this).addClass('hot-tag-active');
    })
})
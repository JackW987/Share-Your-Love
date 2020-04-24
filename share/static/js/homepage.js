// $(function(){
//     // 播放器
//     var player = TCPlayer("banner-video", { // player-container-id 为播放器容器ID，必须与html中一致
//         fileID: "5285890780907002015", // 请传入需要播放的视频filID 必须
//         appID: "1253231183", // 请传入点播账号的appID 必须
//         autoplay: false //是否自动播放
//         //其他参数请在开发文档中查看
//     });
//     // 播放导航栏
//     $('.video-item-nav li').click(function(){
//         $('.video-item-nav li').removeClass('video-item-active');
//         $('.video-item-nav li i').removeClass('video-arrow-active');
//         $(this).addClass('video-item-active');
//         $(this).find('i').addClass('video-arrow-active');
//     })
// })
$(document).on('click','.video-item-nav li',function(){
    $('.video-item-nav li').removeClass('video-item-active');
    $('.video-item-nav li i').removeClass('video-arrow-active');
    $(this).addClass('video-item-active');
    $(this).find('i').addClass('video-arrow-active');
    play($(this).data('fileid'));
    //跳转路径 待完善
    $(".video-container .video-box a").attr("href","/videos/"+$(this).data('videoid'));
});

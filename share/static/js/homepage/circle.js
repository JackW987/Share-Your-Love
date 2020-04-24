let size = 3;
circle(size);
function circle(size) {
    axios.get('api/user/circle',{
        'params':{
            'page': 0,
            'size': size
        }
    }).then(function (res) {
        for (let index=0;index<res.data.objectList.length;index++){
            let circle = res.data.objectList[index];
            let user = circle.simpleUserDTO;
            let works = '';
            for (let index=0;index<circle.simpleWorkDTOs.length;index++){
                if(circle.simpleWorkDTOs[index][2]==='article'){
                    works+="<li>\n" +
                        "<a href=articles/"+circle.simpleWorkDTOs[index][0]+">\n" +
                        circle.simpleWorkDTOs[index][1] +
                        "</a>\n" +
                        "</li>\n"
                }else {
                    works+="<li>\n" +
                        "<a href=videos/"+circle.simpleWorkDTOs[index][0]+">\n" +
                        circle.simpleWorkDTOs[index][1] +
                        "</a>\n" +
                        "</li>\n"
                }
            }
            $(".follow-banner-remind").append("<div class=\"col-xs-4\">\n" +
                "<div class=\"follow-user-banner\">\n" +
                "<span class=\"follow-user-banner-name\">\n" +
                user.nickname +
                "</span>\n" +
                "<a href=userCenter-hot/"+user.id+" class=\"follow-user-banner-head\">\n" +
                "\n" +
                "</a>\n" +
                "<span class=\"follow-user-banner-txt\">\n" +
                user.introduction +
                "</span>\n" +
                "<a href=\"javascipt:void(0);\" data-id="+user.id+" class=\"follow-green-btn\">\n" +
                "+ 关注\n" +
                "</a>\n" +
                "<div class=\"follow-recent-update-title clearfix\">\n" +
                "<span>\n" +
                "最近更新\n" +
                "</span>\n" +
                "<div>\n" +
                "\n" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"follow-recent-update-menu\">\n" +
                "<ul class=\"clearfix\">\n" +
                 works+
                "</ul>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>");
            let cookie = getCookie("Bearer");
            if (cookie!=null){
                if (user.id===JSON.parse(localStorage.user).id){
                    $('.follow-green-btn:eq('+index+')').hide();
                }
            }
            if (user.isLike){
                $('.follow-green-btn:eq('+index+')').addClass('follow-green-btn-followed');
                $('.follow-green-btn:eq('+index+')').text('✔ 已关注')
            }
            $(".follow-user-banner-head:eq("+index+")").css('background','url('+user.headUrl+')')
        }
        fontLength()
    })
}

$('.follow-user-load-more').click(function(){
    $(".follow-banner .col-xs-4").remove();
    size +=3;
    circle(size);
    fontLength();
});

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

//关注
function follow(id) {
    axios.post('/api/follower/'+id)
}
$(".list-btn  li").removeClass('top-nav-active');
$(".list-btn  li:eq(1)").addClass('top-nav-active');
if(getQueryString('type')=="首页"){
    notices(0);
}else if (getQueryString('type')=="新闻"){
    $(".notice-top-nav li").removeClass('notice-li-active');
    $(".notice-top-nav li:eq(1)").addClass('notice-li-active');
    noticeByTag(0,getQueryString('type'));
}else if (getQueryString('type')=="公告") {
    $(".notice-top-nav li").removeClass('notice-li-active');
    $(".notice-top-nav li:eq(2)").addClass('notice-li-active');
    noticeByTag(0,getQueryString('type'));
}
$(".notice-top-nav li").click(function () {
    if ($(this).index()>0){
       location.href = "homepage-notice.html?type="+$(this).children('a').text().trim()
    }else {
        location.href = "homepage-notice.html?type=首页";
    }
});
function notices(page) {
    axios.get('/api/announcements',{
        'params':{
            'page': page,
            'size': 10
    }
    }).then(function (res) {
        $(".notice-list li").remove();
        noticeResult(res)
    })
}
function noticeByTag(page,tag) {
    axios.get('/api/announcements/tag',{
        'params':{
            'tag':tag,
            'page': page,
            'size': 10
        }
    }).then(function (res) {
        $(".notice-list li").remove();
        noticeResult(res)
    })
}

function noticeResult(res) {
    for (let index=0;index<res.data.objectList.length;index++){
        let notice = res.data.objectList[index];
        $(".notice-list").append("<li data-type="+notice.tag+" data-id="+notice.id+" class=\"clearfix\">\n" +
            "<a href=/homepage-notice.html?type="+notice.tag+" class=\"notice-list-tag\">\n" +
            "["+notice.tag+"]\n" +
            "</a>\n" +
            "<a href=/notices/"+notice.id+" class=\"notice-list-text\">\n" +
            notice.title +
            "</a>\n" +
            "<span class=\"notice-time-tag\">\n" +
            notice.createDate +
            "</span>\n" +
            "</li>")
    }
}

$(document).on("click",".notice-list li a",function () {
    location.href = "/notices/"+$(this).parent().data('id')
});
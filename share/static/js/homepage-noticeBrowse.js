$(".list-btn  li").removeClass('top-nav-active');
$(".list-btn  li:eq(1)").addClass('top-nav-active');
notice(getId());
function notice(id) {
    axios.get('/api/announcements/'+id).then(function (res) {
       if (res.code===0){
           location.href="/404.html";
       } else {
           $(".back-to-list").html("&lt;&lt;返回"+res.data.tag+"列表");
           if (res.data.tag=="新闻"){
               updateClass(1)
           } else {
               updateClass(2)
           }
           $(".back-to-list").attr('href',"/homepage-notice.html?type="+res.data.tag);
           $(".browse-title").html(res.data.title);
           $(".browse-content").html(res.data.text);
       }
    })
}

function updateClass(index){
    $(".notice-top-nav li").removeClass('notice-li-active');
    $(".notice-top-nav li:eq("+index+")").addClass('notice-li-active');
}

$(".notice-top-nav li").click(function () {
    if ($(this).index()===1){
        location.href = "/homepage-notice.html?type=新闻";
    }else if ($(this).index()===2) {
        location.href = "/homepage-notice.html?type=公告";
    }else {
        location.href = "/homepage-notice.html?type=首页";
    }
});

let cookie = getCookie("Bearer");
info(getId());
// 头像 个性签名 昵称 关注 粉丝
function info (userId) {
    axios({
        "url":"/api/user/simpleInfo/"+userId,
        "method": 'get'
    }).then(function (res) {
        const simpleUser = {
            id: res.data.id,
            nickname: res.data.nickname,
            headUrl: res.data.headUrl,
            signature: res.data.signature
        };
        $(".userCenter-top-info .head-img img").attr("src",simpleUser.headUrl)
        $(".userCenter-top-info .head-basic span").html(simpleUser.nickname)
        $(".userCenter-top-info .position-fixed input").val(simpleUser.signature)
    });
    axios({
        "url":"/api/follower/followers/"+userId,
        "method": 'get',
        params:{
            "size":1
        }
    }).then(function (res) {
        $(".circle-intro .followerNum").html(res.data.totalElements)
    })
    axios({
        "url":"/api/follower/fans/"+userId,
        "method": 'get',
        params:{
            "size":1
        }
    }).then(function (res) {
        $(".circle-intro .fansNum").html(res.data.totalElements)
    })
}

//更新个性签名
if (cookie!=null){
    if (JSON.parse(localStorage.user).id==getId()){
        $(".head-basic .position-fixed input").change(function (e) {
            let formData = new FormData();
            formData.append("signature",$(".userCenter-top-info .position-fixed input").val());
            axios({
                "url":"/api/user/signature",
                "method": 'post',
                data: formData
            })
        });
    }else {
        $(".head-basic .position-fixed input").attr('disabled','values')
    }
}else {
    $(".head-basic .position-fixed input").attr('disabled','values')
}
//导航跳转页面
$(".userCenter-nav ul li").click(function () {
    let index = $(this).index();
    if (index===0){
        location.href="/userCenter-hot/"+getId();
    } else if (index===1){
        location.href="/userCenter-love/"+getId();
    } else if (index===2){
        location.href="/userCenter-videos/"+getId();
    } else if (index===3){
        location.href="/userCenter-articles/"+getId();
    } else if (index===4){
        location.href="/userCenter-circle/"+getId();
    } else if (index===5){
        location.href="/userCenter-data/"+getId();
    }
})
axios.defaults.baseURL = 'http://localhost:8007';

axios.interceptors.request.use(function (config) {
    config.withCredentials=true
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

const storage = window.localStorage;

//register
$(".login-to-btn").click(function (e) {
    let username = $(".register-username").val();
    let password = $(".register-password").val();
    let refirmPassword = $(".register-refirm-password").val();
    if (password!==refirmPassword){
        layer.msg("输入的两次密码不一样。")
        return
    }
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password",refirmPassword)
    axios({
        method: 'post',
        url: '/api/user/register',
        data:formData
    })
        .then(function (response) {
            if (response.code==0){
                if (response.data!=null){
                    layer.msg(response.msg + response.data[0])
                }else {
                    layer.msg(response.msg)
                }
            }else {
                layer.msg("已发送激活邮件到您邮箱。")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
});

//login
$(".sign-to-btn").click(function (e) {
    let username = $(".login-username").val();
    let password = $(".login-password").val();
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password",password)
    axios({
        method: 'post',
        url: '/api/user/login',
        data: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }).then(function (res) {
        if (res.code === 1){
            $(".login-before").remove();
            const user = {
                "id": res.data.id,
                "nickname": res.data.nickname,
                "headUrl": res.data.headUrl
            };
            localStorage.user = JSON.stringify(user);
            $(".close").click();
            //会有一个默认头像
            $(".user-box-right").append("<img src="+user.headUrl+">\n" +
                "<span>" + user.nickname +"</span>");
            window.location.reload()
        }else {
            //错误通知
            layer.msg("账号或密码错误")
        }
    })

});
// 若已登录，
simpleUserInfo()
function simpleUserInfo(e){
    let cookie = getCookie("Bearer")
    if (cookie!=null){
        $(".login-before").css("display","none")
        const user = JSON.parse(localStorage.user);
        if (user!==null){
            $(".user-box-right").addClass("login-after-box").append("<img src="+user.headUrl+">\n" +
                "<span class='login-after-name'>" + user.nickname +"</span>"+
                "<div class=\"prompt-down\">\n" +
                "<i class=\"glyphicon glyphicon-triangle-bottom\"></i>\n" +
                "</div>"+
                "<div class=\"drop-menu-list\">\n" +
                "<ul>\n" +
                "<li>\n" +
                "<a href=/userCenter-hot/"+user.id+">\n" +
                "<i class=\"glyphicon glyphicon-fire\"></i>\n" +
                "我的热门\n" +
                "</a>\n" +
                "</li>\n" +
                "<li>\n" +
                "<a href=/userCenter-videos/"+user.id+">\n" +
                "<i class=\"glyphicon glyphicon-film\"></i>\n" +
                "我的影像\n" +
                "</a>\n" +
                "</li>\n" +
                "<li>\n" +
                "<a href=/userCenter-articles/"+user.id+">\n" +
                "<i class=\"glyphicon glyphicon-pencil\"></i>\n" +
                "我的图文\n" +
                "</a>\n" +
                "</li>\n" +
                "<li>\n" +
                "<a href=/userCenter-data/"+user.id+">\n" +
                "<i class=\"glyphicon glyphicon-cog\"></i>\n" +
                "设置\n" +
                "</a>\n" +
                "</li>\n" +
                "<li>\n" +
                "<a href=\"javascript:void(0);\" onclick='logout()'>\n" +
                "<i class=\"glyphicon glyphicon-log-out\"></i>\n" +
                "退出\n" +
                "</a>\n" +
                "</li>\n" +
                "</ul>\n" +
                "</div>")
        }
        //关注
        axios({
            url:"/api/follower/followers/"+user.id,
            method:'get',
            params: {
                'size': 5,
            }
        }).then(function (res) {
            const list = res.data.objectList;
            for (let i=0;i<list.length;i++) {
               let simpleUser = {
                   "id": list[i].id,
                   "nickname": list[i].nickname,
                   "headUrl": list[i].headUrl,
                   "signature":list[i].signature,
                   "hot":list[i].hot
               };

                $(".follow-detail-box ul").append(" <li data-id="+simpleUser.id+">\n" +
                    "<img src="+simpleUser.headUrl+">\n" +
                    " <div>\n" +
                    "<span class=\"first-mark\">\n" +
                    simpleUser.nickname +
                    "</span>\n" +
                    "<span class=\"first-mark\">\n" +
                    "<div class=\"field\">\n" +
                    simpleUser.signature  +
                    "</div>\n" +
                    "<div class=\"heat\">\n" +
                    "<i class=\"glyphicon glyphicon-fire\"/>\n" +
                    parseFloat(simpleUser.hot/1000).toFixed(1) +"k"+
                    "</div>\n" +
                    "</span>\n" +
                    "</div>\n" +
                    "</li>")
            }
        });
        //历史记录
        axios({
            url:"/api/video/watchHistory",
            method:'get',
            params: {
                'size': 5,
            }
        }).then(function (res) {
            const list = res.data.objectList;
            let data = null;
            for (let i=0;i<list.length;i++) {
                let simpleVideo = {
                    "videoId": list[i].videoId,
                    "title": list[i].title,
                    "userId": list[i].userId,
                    "nickname": list[i].nickname,
                    "watchTime": list[i].watchTime
                };
                data = simpleVideo.watchTime;
                $(".love-detail-box .love-detail-list").append("<li>\n" +
                    "<div class=\"detail-history\">\n" +
                    "<i class=\"fa fa-play-circle-o\"/>\n" +
                    simpleVideo.title +
                    "</div>\n" +
                    "<div class=\"detail-author\">\n" +
                    simpleVideo.nickname +
                    "</div>\n" +
                    "</li>")
            }
            $(".detail-box-title i").append("最近三天")
        })
    }
    // 保险措施。
    // let cookie = getCookie("Bearer")
    // if (cookie!=null){
    //     axios({
    //         url:"/api/user/simpleInfo",
    //         method:'get'
    //     }).then(function (res) {
    //         const user = {
    //             "id": res.data.id,
    //             "nickname": res.data.nickname,
    //             "headUrl": res.data.headUrl
    //         };
    //
    //         $(".login-before").remove()
    //         $(".user-box-right").append("<img src="+user.headUrl+">\n" +
    //             "<span>" + user.nickname +"</span>")
    //     })
    // }
};

function logout() {
    localStorage.user = null;
    $('.user-box-right').removeClass("login-after-box");
    axios.get('/api/logout').then(function () {
        location.href = "/"
    });
}
/**
 * @return {null}
 */
function GetQueryString(name)
{
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)return  unescape(r[2]); return null;
}

$(".top-nav-container .list-btn li").click(function () {
    if ($(this).index()===0){
        location.href = "/"
    } else if ($(this).index()===1){
        location.href = "/homepage-notice.html?type=首页"
    } else if ($(this).index()===2) {
        location.href = "/articlesCenter"
    }else {
        location.href = "/videosCenter"
    }
});

//消息跳转
$(".user-box-btn .user-box-btn-li:eq(0)").click(function () {
    if (getCookie('Bearer')==null){
        $('.sign-btn').click();
    }else {
        location.href = "/userCenter-data/"+JSON.parse(localStorage.user).id;
    }
});
//关注跳转
$(document).on('click','.follow-detail-box ul li',function () {
    console.log(123);
    location.href = "/userCenter-hot/"+$(this).data('id');
});
$(".follow-detail-box a").click(function () {
    if (getCookie('Bearer')==null){
        $('.sign-btn').click();
    }else {
        location.href = "/userCenter-circle/"+JSON.parse(localStorage.user).id;
    }
});
//搜索 全局
$(".search-box a").click(function () {
    location.href = "/homepage-search.html?searchContent="+$(".search-box input").val();
});

$(".search-box input").val(getQueryString('searchContent'));
if (getQueryString('type')==='article'){
    $(".imgTxt-sub-btn").click();
    $('.sub-content-upload').removeClass('add-sub-content-active');
    $('.sub-content-imgTxt').addClass('add-sub-content-active');
    $('.sub-content-nav ul li a').removeClass('sub-content-nav-active');
    $('.imgTxt-sub-btn').addClass('sub-content-nav-active');
}
tags();
function tags() {
    axios.get('/api/tags').then(function (res) {
        let firstTag = res.data[0].tag;
        for (let index=0;index<res.data.length;index++){
            let tag = res.data[index];
            $('.type-upload .form-control').append("<option>"+tag.tag+"</option>")
        }
        smallTags(firstTag);
        console.log(res)

    });

}


$(".type-upload .form-control").change(function () {
    $(".imgTxt-tag-container span").remove();
    let tag = $(this).find("option:selected").val();
    smallTags(tag);
});

function smallTags(tag) {
    axios.get('/api/smallTags',{
        'params':{
            'tag':tag
        }
    }).then(function (res) {
        console.log(res);
        $('.tag-select-box div span').remove();
        for (let index=0;index<res.data.length;index++){
            let smallTag = res.data[index].smallTag;
            $('.tag-select-box div').append("<span class=\"active-tag\">\n" +
                smallTag +
                "</span>")
        }
    })
}

var getSignature = function(callback) {
    axios({
        'url':'/api/video/signature',
        'method':'post'
    }).then(function (res) {
        callback(res)
    })
};

//未登录无法访问
let cookie = getCookie('Bearer');
if (cookie==null){
    location.href = '/';
}
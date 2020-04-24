$(function(){
    $(document).on('click','.follow',function(){
        $(this).removeClass('follow');
        $(this).addClass('followed');
        $(this).text('✔ 已关注');
    })
    $(document).on('mouseover','.followed',function(){
        $(this).removeClass('followed');
        $(this).addClass('follow-cancel');
        $(this).text('✘ 取消关注');
    })
    $(document).on('mouseout','.follow-cancel',function(){
        $(this).removeClass('follow-cancel');
        $(this).addClass('followed');
        $(this).text('✔ 已关注');
    })
    // $(document).on('click','.follow-cancel',function(){
    //     var _this=$(this);
    //     layer.confirm('是否取消关注这名作者', {
    //         btn: ['确定','取消'] //按钮
    //       }, function(){
    //         _this.removeClass('followed')
    //         _this.removeClass('follow-cancel');
    //         _this.addClass('follow');
    //         _this.text('+ 关注');
    //         layer.msg('删除成功');
    //       }, function(){
    //
    //     });
    // })
    $('.work-nav-follow-btn').click(function(){
        $('.follow-list-banner').addClass('list-banner-active');
        $('.fans-list-banner').removeClass('list-banner-active');
    })
    $('.work-nav-fans-btn').click(function(){
        $('.follow-list-banner').removeClass('list-banner-active');
        $('.fans-list-banner').addClass('list-banner-active');
    })
});
// 粉丝数量折线图
function fansProportion(userId) {
    var myChart = echarts.init(document.getElementById('list-chart'));
    axios({
        'url':'/api/follower/fans/num/'+userId,
        'method':'get'
    }).then(function (res) {
        option = {
            xAxis: {
                type: 'category',
                data: ['一', '二', '三', '四', '五']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: res.data,
                type: 'line'
            }]
        };
        myChart.setOption(option);
    });
}
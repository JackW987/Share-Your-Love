$(function(){
    // 分秒转换
    function timeCount(s){
        var result;
        var min=Math.floor(s/60);
        var sec=s%60;
        if(min<10){
            result="0"+min+":";
        }
        else{
            result=min+":";
        }
        if(sec<10){
            result+="0"+sec
        }
        else{
            result+=sec;
        }
        return result;
    }
    // 子导航样式
    function addBtnActive(e){
        $('.sub-content-nav ul li a').removeClass('sub-content-nav-active');
        $(e).addClass('sub-content-nav-active');
    }   
    $('.video-sub-btn').click(function(){
        addBtnActive($(this));
        $('.sub-content-imgTxt').removeClass('add-sub-content-active');
        $('.sub-content-upload').addClass('add-sub-content-active');
    })
    $('.imgTxt-sub-btn').click(function(){
        addBtnActive($(this));
        $('.sub-content-upload').removeClass('add-sub-content-active');
        $('.sub-content-imgTxt').addClass('add-sub-content-active');
    })
    // 作品导航
    $('.video-title-work-nav ul li a').click(function(){
		$('.video-title-work-nav ul li a').removeClass('work-nav-active');
		$(this).addClass('work-nav-active');
        var left=$(this).parents('li').index()*98;
        var leftDom=$(this).parents('li').parents('ul').find('.work-nav-decoration');
		leftDom.stop().animate({
			'left':left
		},150);
    });
    $('.imgTxt-title-work-nav ul li a').click(function(){
		$('.imgTxt-title-work-nav ul li a').removeClass('work-nav-active');
		$(this).addClass('work-nav-active');
        var left=$(this).parents('li').index()*98;
        var leftDom=$(this).parents('li').parents('ul').find('.work-nav-decoration');
		leftDom.stop().animate({
			'left':left
		},150);
    });
    // 删除按钮
    $(document).on('click','.remove-work-btn',function(){
        var _this=$(this);
        layer.confirm('确定删除此作品？', {
            btn: ['删除','取消'] //按钮
          }, function(){
            if (_this.data('type')==='article'){
                axios({
                    'url':'/api/articles/'+_this.data('id'),
                    'method':'delete'
                }).then(function (res) {
                    var removeDom=_this.parents('.operate-view').parents('.plate-work-container');
                    removeDom.remove();
                    layer.msg('删除成功', {icon: 1});
                    //window.location.reload();
                })
            }else {
                axios({
                    'url':'/api/video/'+_this.data('id'),
                    'method':'delete'
                }).then(function (res) {
                    var removeDom=_this.parents('.operate-view').parents('.plate-work-container');
                    removeDom.remove();
                    layer.msg('删除成功', {icon: 1});
                    window.location.reload();
                })
            }

          });
    })
    // 问题弹出层
    $(document).on('click','.problem-show-btn',function(){
        let id = $(this).data('id');
        if ($(this).data('type')==='article'){
            articleProblems(id);
        }else {
            videoProblems(id)
        }
        $('#problemModal').modal('show');
    })
    $('.auditing-video-btn').click(function(){
        passingVideos(0);
        $('.work-data-container').removeClass('work-container-active');
        $('.auditing-video').addClass('work-container-active');
    })
    $('.already-passed-video-btn').click(function(){
        passVideos(0);
        $('.work-data-container').removeClass('work-container-active');
        $('.already-passed-video').addClass('work-container-active');
    })
    $('.not-through-video-btn').click(function(){
        noPassVideos(0);
        $('.work-data-container').removeClass('work-container-active');
        $('.not-through-video').addClass('work-container-active');
    })
    $('.already-passed-imgTxt-btn').click(function(){
        passArticles(0);
        $('.work-imgTxt-data-container').removeClass('work-container-active');
        $('.already-passed-imgTxt').addClass('work-container-active');
    })
    $('.rescinded-btn').click(function(){
        notPassArticles(0);
        $('.work-imgTxt-data-container').removeClass('work-container-active');
        $('.rescinded').addClass('work-container-active');
    })
    $('.video-sub-btn').click(function(){
        $('.manu-container').removeClass('manu-container-active');
        $('.manu-video-container').addClass('manu-container-active');
    })
    $('.imgTxt-sub-btn').click(function(){
        $('.manu-container').removeClass('manu-container-active');
        $('.manu-imgTxt-container').addClass('manu-container-active');
        $('.already-passed-imgTxt').addClass('work-container-active');
    })
    // $('.video-duration').html(timeCount(127));
})
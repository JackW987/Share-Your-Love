$(function(){
	$(document).on('click','.follow',function(){
        let cookie = getCookie("Bearer");
        if (cookie!=null){
            follow($(this).data('id'));
            $(this).removeClass('follow');
            $(this).addClass('followed');
            $(this).text('✔ 已关注');
        } else {
            $(".sign-btn").click();
        }
	});
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
	$(document).on('click','.follow-cancel',function(){

		$(this).removeClass('follow-cancel');follow($(this).data('id'));
		$(this).addClass('follow');
		$(this).text('+ 关注');
	})
	/* 评论区 editor */
	
	var E = window.wangEditor
    var editorComment = new E('#comment-editor');
    editorComment.customConfig.menus = [
        'bold',
        'emoticon',  // 表情
    ]
    editorComment.customConfig.zIndex = 0
    editorComment.create();
    /* 喜欢按钮 */
    $(document).on('click','.love-article-btn-before',function(){
        let cookie = getCookie("Bearer");
        if (cookie!=null){
            $(this).removeClass('love-article-btn-before');
            $(this).addClass('love-article-btn-click');
            let text = $(".browse-author-time span:eq(2)").html();
            $(".browse-author-time span:eq(2)").html("喜欢 "+parseInt((parseInt(text.replace(/[^0-9]/ig,""))+1)))
		}
    })
    $(document).on('click','.love-article-btn-click',function(){
        let cookie = getCookie("Bearer");
        if (cookie!=null){
            $(this).removeClass('love-article-btn-click');
            $(this).addClass('love-article-btn-before');
            let text = $(".browse-author-time span:eq(2)").html();
            $(".browse-author-time span:eq(2)").html("喜欢 "+parseInt((parseInt(text.replace(/[^0-9]/ig,""))-1)))
        }
    })
    /* 喜欢功能 */
    // $(document).on('click','.like-btn',function(){
    // 	if ($(this).hasClass('liked')) {
    // 		$(this).removeClass('liked');
	//     	var afterNumber=parseInt($(this).find('span').text())-1
	//     	$(this).find('span').text(afterNumber);
    // 	}
    // 	else{
    // 		$(this).addClass('liked');
	//     	var afterNumber=parseInt($(this).find('span').text())+1
	//     	$(this).find('span').text(afterNumber);
    // 	}
    // })
    /* 评论功能 */
    // $('.send-comment-msg').click(function(){
    // 	var PdContent=$('#comment-editor p').text();
    // 	var mainContent=$('#comment-editor .w-e-text').html();
    // 	var addContentElement=$('.comment-area-ul');
    // 	var afterHead=$('.browse-comment-head img').attr('src');
    // 	if (PdContent=='') {
    // 		layer.msg('评论内容不能为空')
    // 	}
    // 	else{
    // 		addContentElement.prepend('<li><a href="javascript:void(0);" class="comment-user-head"><img src='+afterHead+'></a><div class="comment-area-name clearfix"><a href="javascript:void(0);" class="comment-user-name">测试用户二</a><a href="javascript:void(0);" class="comment-area-btn like-btn"><i class="fa fa-heart"></i><span>0</span></a><a href="javascript:void(0);" class="comment-area-btn comment-btn"><i class="fa fa-comment"></i></a></div><div class="comment-area-time">2017年6月1日</div><div class="comment-area-text">'+mainContent+'</div><div class="child-comment-area clearfix"><textarea></textarea><a href="javascript:void(0);" class="child-send-btn">评论</a></div><ul class="child-comment-ul"></ul></li>')
    // 		$('#comment-editor .w-e-text p').text('');
    // 		editorComment.txt.clear();
    // 		layer.msg('评论成功')
    // 	}
    // })
    /* 回复功能 */
    $(document).click(function(){
    	$('.child-comment-area').css({
    		'display':'none',
    	})
    })
    $(document).on('click','.comment-btn',function(event){
    	$(this).closest('li').find('.child-comment-area:first').css({
    		'display':'block'
    	})
    	event.stopPropagation();
    })
    $(document).on('click','.child-comment-area',function(event){
    	event.stopPropagation();
    })
    // $(document).on('click','.child-send-btn',function(){
    // 	var afterContent=$(this).closest('.child-comment-area').find('textarea').val();
    // 	var replyUserName=$(this).closest('.child-comment-area').prevAll('.comment-area-name').find('a:first').text();
	// 	var afterHead=$('.browse-comment-head img').attr('src');
    // 	if (afterContent=="") {
    // 		layer.msg('评论内容不能为空');
    // 	}
    // 	else{
    // 		$(this).closest('.child-comment-area').next('ul').append('<li><a href="javascript:void(0);" class="comment-user-head"><img src='+afterHead+'></a><div class="comment-area-name clearfix"><a href="javascript:void(0);" class="comment-user-name">测试用户三</a><a href="javascript:void(0);" class="comment-area-btn like-btn"><i class="fa fa-heart"></i><span>0</span></a><a href="javascript:void(0);" class="comment-area-btn comment-btn"><i class="fa fa-comment"></i></a></div><div class="comment-area-time">017年6月1日</div><div class="comment-area-text child-area-text"><span>@'+replyUserName+'：</span>'+afterContent+'</div><div class="child-comment-area clearfix"><textarea></textarea><a href="javascript:void(0);" class="grandson-send-btn">评论</a></div></li>')
    // 		$(this).closest('.child-comment-area').find('textarea').val('');
    // 		layer.msg('评论成功');
    // 	}
    // })
    // $(document).on('click','.grandson-send-btn',function(){
    // 	var afterContent=$(this).closest('.child-comment-area').find('textarea').val();
    // 	var replyUserName=$(this).closest('.child-comment-area').prevAll('.comment-area-name').find('a:first').text();
	// 	var afterHead=$('.browse-comment-head img').attr('src');
    // 	if (afterContent=="") {
    // 		layer.msg('评论内容不能为空');
    // 	}
    // 	else{
    // 		$(this).closest('ul').append('<li><a href="javascript:void(0);" class="comment-user-head"><img src='+afterHead+'></a><div class="comment-area-name clearfix"><a href="javascript:void(0);" class="comment-user-name">测试用户三</a><a href="javascript:void(0);" class="comment-area-btn like-btn"><i class="fa fa-heart"></i><span>0</span></a><a href="javascript:void(0);" class="comment-area-btn comment-btn"><i class="fa fa-comment"></i></a></div><div class="comment-area-time">017年6月1日</div><div class="comment-area-text child-area-text"><span>@'+replyUserName+'：</span>'+afterContent+'</div><div class="child-comment-area clearfix"><textarea></textarea><a href="javascript:void(0);" class="grandson-send-btn">评论</a></div></li>')
    // 		$(this).closest('.child-comment-area').find('textarea').val('');
    // 		layer.msg('评论成功');
    // 	}
    // })
    $('.comment-btn-box').hover(function(){
        $('.browse-report-btn').css({
            'display':'block'
        })
    },function(){
        $('.browse-report-btn').css({
            'display':'none'
        })
    })
    // $('.report-msg-btn').click(function(){
    //     if ($('#reportBox').find('textarea').val()=='') {
    //         layer.msg('具体原因不能为空');
    //     }
    //     else{
    //         $('#reportBox').modal('hide');
    //         $('#reportBox').find('textarea').val('');
    //         layer.msg('举报原因已发送');
    //     }
    // })
})	
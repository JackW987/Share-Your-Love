$(function(){
    // 子导航样式
    $("[data-toggle='tooltip']").tooltip();
    $('#ban-remind').click(function(){
        $('#error-content').modal('show');
    })
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
    $('.work-name-input input').on('input',function(){
        var inputLength=$(this).val().length;
        $('.work-input-word').text(inputLength+'/80');
    })
    $(document).on('click','.active-tag',function(){
        var stickDom=$(this).parents('.tag-select-box').prev('.work-name-input').find('.tag-input-container');
        var pdLength=stickDom.find('span').length;
        if(pdLength<3){
            $(this).removeClass('active-tag').addClass('actived-tag');
            stickDom.append($(this));
        }
        else{
            layer.msg('最多添加三个标签');
        }
    })
    $(document).on('click','.actived-tag',function(){
        var stickToDom=$(this).parents('.work-name-input').next('.tag-select-box').find('div');
        $(this).removeClass('actived-tag').addClass('active-tag');
        stickToDom.append($(this));
    })
    $('.active-btn').click(function(){
        $('.tag-input-container').append($(this));
    })
    $('.brief-text textarea').on('input',function(){
        var inputLength=$(this).val().length;
        $('.work-input-word-textarea').text(inputLength+'/250');
    })
    // 投稿按钮
    $('.info-submission-btn-video').click(function(){
        var titleVal=$('.work-title-val').val();
        var tipsVal=$('.video-tag-container span').length;
        var briefVal=$('.brief-text textarea').val();
        if(titleVal=="" || tipsVal==0 || briefVal==""){
            layer.msg('上传作品信息不得为空')
        } 
        else{
            let tag = $('.img-msg-banner .form-control').find("option:selected").val();
            let smallTags = [];
            for (let index=0;index<tipsVal;index++){
                smallTags[index] = $(".video-tag-container span:eq("+index+")").text().trim();
            }
            let data = new FormData();
            data.append("title",titleVal);
            data.append("introduction",$(".brief-text textarea").val());
            data.append("tag",tag);
            data.append("videoUrl","http://1253231183.vod2.myqcloud.com/29483bfcvodgzp1253231183/899b3d975285890781646748172/QXd9XSQXul4A.mp4")
            data.append("smallTags",smallTags.toString());
            data.append("fileId",localStorage.fileId);
            data.append("time",localStorage.videoTime);
            qcVideo.ugcUploader.start({
                fileId: localStorage.fileId,
                coverFile: $('.img-upload-banner:eq(0)').get(0).files[0],
                getSignature: getSignature,
                finish: function(result){//上传成功时的回调函数
                    console.log(result);
                    data.append("imgUrl",result.coverUrl);
                    axios({
                        'url':'/api/video',
                        'method':'post',
                        'data':data
                    }).then(function (res) {
                        window.location.reload();
                        layer.msg("上传成功")
                    });
                }
            });

        }
    });
    
    // 判断视频格式函数
    function pdVideoVal(obj){
        var postf=obj.replace(/.+\./,"");
        if("mp4"==postf||"flv"==postf||"avi"==postf||"wmv"==postf||"mov"==postf||"webm"==postf||"mpeg4"==postf||"ts"==postf||"mpg"==postf||"rm"==postf||"rmvb"==postf||"mkv"==postf){
            return 1;
        }
        else{
            return 0;
        }
    }
    // 判断图片格式函数
    function pdImgVal(obj){
        var imgTest=/\.(jpg|jpeg|png)$/i;
        var judResult=imgTest.test(obj);
        return judResult;
    }
    // 上传视频跳转判断
    $(document).on('change','.video-upload-banner',function(){
        var videoFileList = [];
        var file=$(this).val();
        videoFileList[0] = $(this).get(0).files[0];
        var fileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");
        if(pdVideoVal(file)){
            $('.video-upload-before-box').removeClass('add-sub-content-active');
            $('.video-upload-after-box').addClass('add-sub-content-active');
            $('.file-progress-top').text(fileName);
            changeFile($(this).get(0));
            qcVideo.ugcUploader.start({
                videoFile:  videoFileList[0],//视频，类型为 File
                getSignature: getSignature,//前文中所述的获取上传签名的函数
                error: function(result){//上传失败时的回调函数
                    console.log('上传失败的原因：' + result.msg);
                },
                progress: function(result){
                    $(".progress-bar").attr("aria-valuenow",parseFloat(result.curr*100).toFixed(1));
                    $(".progress-bar").css("width",parseFloat(result.curr*100).toFixed(1)+"%");
                    $(".progress-bar").html(parseFloat(result.curr*100).toFixed(1)+"%");
                },
                finish: function(result){//上传成功时的回调函数
                    localStorage.fileId = result.fileId;
                    console.log('上传结果的fileId：' + result.fileId);
                    console.log('上传结果的视频名称：' + result.videoName);
                    console.log('上传结果的视频地址：' + result.videoUrl);
                }
            });
        }
        else{
            layer.msg('请上传正确的视频文件');
        }
    })
    $(document).on('change','.img-upload-banner',function(){
        var file=$(this).val();
        var f = $(this).get(0).files[0];
        var reader = new FileReader();
        reader.readAsDataURL(f);
        var removeDom=$(this).parents('.content-upload-box');
        if(pdImgVal(file)){
            reader.onload=function(e){
                //读取成功后返回的一个参数e，整个的一个进度事件
                removeDom.css('display','none');
                var ShowImgBanner=removeDom.next('.img-show-banner');
                ShowImgBanner.find('img').attr('src', e.target.result);
                ShowImgBanner.css('display','block');
            }
        }
        else{
            layer.msg('请上传正确的文件')
        }
    })
   // 编辑器样式
   var E = window.wangEditor
   var editorComment = new E('.editor-menu-container','.editor-container');
   editorComment.customConfig.menus = [
       'bold',
       'italic',  // 斜体 
       'foreColor',  // 文字颜色
       'justify',  // 对齐方式
       'emoticon',  // 表情
       'image'
   ]
   editorComment.customConfig.zIndex = 0
   editorComment.create();
   var editorArea=$('.main-editor .w-e-text-container').find('.w-e-text');  
   // 图文投稿按钮
   $('.info-submission-btn-imgTxt').click(function(){
    var titleVal=$('.editor-title').val();
    var tipsVal=$('.imgTxt-tag-container span').length;
    var briefVal=editorComment.txt.text();
    if(titleVal=="" || tipsVal==0 || briefVal==""){
        layer.msg('上传作品信息不得为空')
    } 
    else{
        let tag = $('.imgTxt-msg-banner .form-control').find("option:selected").val();
        let smallTags = [];
        for (let index=0;index<tipsVal;index++){
            smallTags[index] = $(".imgTxt-tag-container span:eq("+index+")").text().trim();
        }
        let f = new FormData();
        f.append("title",titleVal);
        f.append("text",editorComment.txt.html());
        f.append("tag",tag);
        f.append("smallTags",smallTags.toString());
        f.append('file',$('.img-upload-banner:eq(1)').get(0).files[0]);
        if ($('.img-upload-banner:eq(1)').get(0).files[0]==null){
            layer.msg("图片还未上传");
            return
        }
        axios({
            'url':'/api/articles',
            'method':'post',
            'data':f,
        }).then(function (res) {
            if (res.code==501){
                layer.msg('您的内容含有敏感词请修改');
                return
            }
            layer.msg("上传成功");
            window.location.reload()
        })
    }
})
});
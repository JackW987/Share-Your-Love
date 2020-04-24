$(function(){
    var fixedLeft=$('.userCenter-nav-active').index()*93+40;
    $('.bottom-decoration').css({
        left:fixedLeft
    })
    $('.userCenter-nav ul li').mouseenter(function(){
        var deLeft=$(this).index()*93+40;
        $('.bottom-decoration').stop().animate({
            'left':deLeft
        },200);
    })
    $('.userCenter-nav ul').mouseleave(function(){
        $('.bottom-decoration').stop().animate({
            'left':fixedLeft
        },200);
    })
    // 公告字数判断
    $('.plate-list-content textarea').on('input',function(){
        var textLength=$(this).val().length
        $('.plate-list-content span').text(textLength+'/150');
    })
    // 作品导航
    $('.plate-title-work-nav ul li a').click(function(){
        $('.plate-title-work-nav ul li a').removeClass('work-nav-active');
        $(this).addClass('work-nav-active');
        var left=$(this).parent('li').index()*63;
        $('.work-nav-decoration').stop().animate({
            'left':left
        },150);
    });
    // 删除功能
    $(document).on('click','.plate-more-btn',function(){
        $(this).html('返回 <i class="fa fa-undo"></i>');
        $(this).removeClass('plate-more-btn').addClass('plate-back-btn');
        $('.plate-edit-btn-after').css({
            'display':'block'
        })
        $('.plate-remove-btn').css({
            'display':'block'
        })
    })
    $(document).on('click','.plate-back-btn',function(){
        $(this).html('编辑 <i class="fa fa-pencil"></i>');
        $(this).removeClass('plate-back-btn').addClass('plate-more-btn');
        $('.plate-edit-btn-after').css({
            'display':'none'
        })
        $('.plate-remove-btn').css({
            'display':'none'
        })
    })
    // 作品计数
    // var workLength=$('.plate-section-list li').length;
    // $('.plate-title-work-count').html(workLength+'<span class="work-count-decoration"></span>');
    // 作品删除
    // $(document).on('click','.plate-remove-btn',function(){
    //     var _this=$(this);
    //     layer.confirm('是否删除此作品', {
    //         btn: ['确定','取消'] //按钮
    //     }, function(){
    //         _this.parent('li').remove();
    //         workLength--;
    //         $('.plate-title-work-count').html(workLength+'<span class="work-count-decoration"></span>');
    //         layer.msg('删除成功');
    //       }, function(){
    //       });
    // })
    /* 调用 cropper 插件 */
    var beforeSrc=$('.user-box-img').attr('src');
    $('.cut-img-box > img').attr('src',beforeSrc);
    var $image = $('.cut-img-box > img');
    $image.cropper({
        aspectRatio: '1',
        autoCropArea:0.8,
        preview:'.cut-img-box-preview',

    });

    var $inputImage = $('.input-image input');
    var URL = window.URL || window.webkitURL;
    var blobURL;
    var newFile;
    if (URL) {
        $inputImage.change(function () {
            var file=$("input[name='file']")[0];
            newFile = this.files[0];
            var files = this.files;
            var file;
            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        // Revoke when load complete
                        URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                } else {
                    layer.alert('请选择正确的文件格式');
                }
            }

            // Amazi UI 上传文件显示代码
            var fileNames = '';
            $.each(this.files, function() {
                fileNames += '<span class="am-badge">' + this.name + '</span> ';
            });
            $('#file-list').html(fileNames);
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }
    $('.confirm-upload').on('click',function(){
        var img_src=$image.attr("src");
        if(img_src==""){
            layer.alert("没有选择上传的图片");
            return false;
        }

        var url=$(this).attr("url");
        var canvas=$("#image").cropper('getCroppedCanvas');
        var data=canvas.toDataURL(); //转成base64
        var fd = new FormData();
        fd.append("file",newFile);
        axios({
            'url':'/api/user/head',
            'method':'post',
            'data':fd,
        }).then(function (res) {
            let user = JSON.parse(localStorage.user);
            user.headUrl = res.data;
            localStorage.user = JSON.stringify(user);
            layer.msg("上传成功");
            window.location.reload()
        });

    });

    // 上传头像
    $('.head-img a').click(function(){
        layer.open({
            type: 1,
            closeBtn: 1,
            shift: 0,
            shadeClose: true,
            resize: false,
            title: '头像更换',
            area: ['auto', 'auto'],
            content: $('.upload-img-box'),
        })
    })
})

        
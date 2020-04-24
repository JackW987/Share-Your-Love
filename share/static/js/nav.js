$(function(){
    // 封装按钮盒子变换按钮
    function loginBtnChange(){
        $('.nav-sign-btn').removeClass('login-sign-nav-active');
        $('.nav-login-btn').addClass('login-sign-nav-active');
    }
    function signBtnChange(){
        $('.nav-login-btn').removeClass('login-sign-nav-active');
        $('.nav-sign-btn').addClass('login-sign-nav-active');
    }
    function signBoxChange(){
        $('.login-handle-box').removeClass('handle-box-active');
        $('.sign-handle-box').addClass('handle-box-active');
    }
    function loginBoxChange(){
        $('.sign-handle-box').removeClass('handle-box-active');
        $('.login-handle-box').addClass('handle-box-active');
    }
    // 点击事件
    $('.nav-login-btn').click(function(){
        loginBtnChange();
        loginBoxChange();
        $('.sign-handle-box').removeClass('fadeIn');
        $('.login-handle-box').addClass('fadeIn');
    })
    $('.nav-sign-btn').click(function(){
        signBtnChange();
        signBoxChange();
        $('.login-handle-box').removeClass('fadeIn');
        $('.sign-handle-box').addClass('fadeIn');
    })
    $('.sign-btn').click(function(){
        $('.login-handle-box').removeClass('fadeIn');
        $('.sign-handle-box').removeClass('fadeIn');
        signBtnChange();
        signBoxChange();
    })
    $('.login-btn').click(function(){
        $('.login-handle-box').removeClass('fadeIn');
        $('.sign-handle-box').removeClass('fadeIn');
        loginBtnChange();
        loginBoxChange();
    })
})
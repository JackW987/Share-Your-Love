$(function(){
	$('.img-txt-main-txt').each(function(){
    var max_width=120;
    if ($(this).text().length>max_width) {
      $(this).text($(this).text().substring(0,max_width));
      $(this).html($(this).html()+'...');
    }
  })
  /* 爱心点击事件 */
  $(document).on('click','.like',function() {
        let cookies = getCookie('Bearer');
        if (cookies==null){
            $(".sign-btn").click();
            return
        }
        if ($(this).hasClass('liked')) {
            like($(this).data('id'));
            $(this).removeClass('liked');
            var spanDeText = parseInt($(this).find('span').text()) - 1;
            $(this).find('span').text(spanDeText);
        } else {
            like($(this).data('id'));
            $(this).addClass('liked');
            var spanInText = parseInt($(this).find('span').text()) +  1;
            $(this).find('span').text(spanInText);
        }
    })
  /* 关注事件 */
  $(document).on('click','.follow',function(){
      let cookie = getCookie("Bearer");
      if (cookie==null){
          $(".sign-btn").click();
      }else {
          follow($(this).parent().data('id'));
          $(this).removeClass('follow');
          $(this).addClass('followed');
          $(this).text('✔ 已关注');
      }
  })
  $(document).on('mouseover', '.followed', function() {
    $(this).addClass('followed-cancel');
    $(this).text('✘ 取消关注');
  })
  $(document).on('mouseout', '.followed', function() {
    $(this).removeClass('followed-cancel');
    $(this).text('✔ 已关注');
  })
  $(document).on('click', '.followed-cancel', function() {
      follow($(this).parent().data('id'));
    $(this).removeClass('followed');
    $(this).removeClass('followed-cancel');
    $(this).addClass('follow');
    $(this).text('+关注')
  })
})
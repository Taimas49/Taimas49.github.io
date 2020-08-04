$(document).ready(function(){
    $('.carousel_inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.svg"></button>',
    });

    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
      });
      function toggleSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
                $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
            })    
          });
      };
      toggleSlide('.catalog_item_link');
      toggleSlide('.catalog_item_list_back');
      $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
      })

      //Модальные окна
      $('[data-modal="consultation"]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal_close').on('click', function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
      });
      $('.catalog_item_footer_btn').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
      });
      $('.catalog_item_footer_btn').each(function(i){
        $(this).on('click', function(){
          $('#order .modal_descr').text($('.catalog_item_subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

      //Валидация форм

      function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: 
            {
              required: "Пожалуйста введите ваше имя",
              minlength: jQuery.validator.format("Введите как минимум {0} символа!")
            },
            phone: "Пожалуйста, введите ваш номер телефона",
            email: {
              required: "Пожалуйста введите свой e-mail",
              email: "Неправильно введен адрес электронной почты"
            }
          }
        });
      };
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');
//Письма на почту

      $('input[name=phone]').mask("+7 (999) 999-99-99");
      
      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $("form").trigger('reset');
        });
        return false;
      });
//Плавный скролл и кнопка "Вверх"

      $(window).scroll(function(){
        if ($(this).scrollTop() > 1600){
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      })
      $("a[href^= #up]").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
  });

  //Плавные отзывы
  new WOW().init();
});

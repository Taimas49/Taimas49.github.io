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
  });
(function() {
  (function($) {
    return $.fn.rollover = function(options) {
      var defaults;
      defaults = {
        str_off: '_off',
        str_on: '_on',
        text: 'hahaha'
      };
      options = $.extend({}, defaults, options);
      return this.each(function() {
        var $img, src_off, src_on;
        $img = $(this).find('img');
        src_off = $img.attr('src');
        src_on = src_off.replace(options.str_off, options.str_on);
        $('<img>').attr('src', src_on);
        $img.on('mouseenter focus', function() {
          return $(this).attr('src', src_on);
        });
        return $img.on('mouseleave blur', function() {
          return $(this).attr('src', src_off);
        });
      });
    };
  })(jQuery);

  $(function() {
    $('.rollover').rollover({
      text: 'fufufu'
    }).hover(function() {
      return $(this).css('border', '10px solid #000');
    }, function() {
      return $(this).css('border', 'none');
    });
    return $('<h1>', {
      html: 'jQuery',
      css: {
        'color': 'red',
        'font-size': '30px'
      }
    }).appendTo('body');
  });

}).call(this);

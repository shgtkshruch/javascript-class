(($) ->
  $.fn.rollover = (options) ->
    defaults = {
      str_off: '_off'
      str_on: '_on'
    }

    options = $.extend {}, defaults, options
    @each ->
      $img = $(@).find 'img'
      src_off = $img.attr 'src'
      src_on = src_off.replace options.str_off, options.str_on

      $('<img>').attr 'src', src_on

      $img.on ('mouseenter focus'), ->
        $(@).attr 'src', src_on
      $img.on ('mouseleave blur'), ->
        $(@).attr 'src', src_off

) jQuery

$ ->
  $('.rollover').rollover()

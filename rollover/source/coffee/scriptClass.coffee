class Rollover
  defaults:
    str_off: '_off'
    str_on: '_on'

  constructor: ($el, options) ->
    @options = $.extend {}, @defaults, options
    @$el = $el
    @$img = $el.find 'img'

    @_prepareSrcs()
    @_preload()
    @_eventify()

  _prepareSrcs: ->
    @_src_off = @$img.attr 'src'
    @_src_on = @_src_off.replace @options.str_off, @options.str_on
    @
  _preload: ->
    $('<img>').attr 'src', @_src_on
    @
  _eventify: ->
    @$el.on 'mouseenter focus', => @toOver()
    @$el.on 'mouseleave blur', => @toNormal()
    @

  toOver: ->
    @$img.attr 'src', @_src_on
    @
  toNormal: ->
    @$img.attr 'src', @_src_off
    @

$.fn.rollover = (options) ->
  @each (i, el) ->
    $el = $(el)
    rollover = new Rollover $el, options
    $el.data 'rollover', rollover
    @

$ ->
  $('.rollover').rollover()

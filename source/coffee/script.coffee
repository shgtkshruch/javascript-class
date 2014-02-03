randomNum = (from, to) ->
  floor = Math.floor
  random = Math.random
  from + floor random() * (to - from + 1)

class EventModule
  on: (name, cb) ->
    @cbs = {} unless @cbs?
    @cbs[name] = [] unless @cbs[name]?
    @cbs[name].push cb
    @

  trigger: (name) ->
    list = @cbs?[name]
    return @ unless list
    for cb in list
      cb()
    @

class Light extends EventModule
  constructor: ->
    @powered = false
    @el = $ '#light'
    @el.click => @toggle() 

  powerOn: ->
    @powered = true
    @el.css 'background', 'yellow'
    @trigger 'poweron'
    @

  powerOff: ->
    @powered = false
    @el.css 'background', 'white'
    @trigger 'poweroff'
    @

  toggle: ->
    if @powered then @powerOff() else @powerOn()
    @

class Fish
  constructor: (options) ->
    @options = $.extend {}, @defaultOptions, options
    @_prepareEls()
    @_handleColors()
    @_eventify()
    @_positionRandomly()

  defaultOptions:
    speed: 400
    color: 'black'
    src:  '<div class="fish"><div>魚</div></div>'

  _prepareEls: ->
    @el = $ @options.src
    @inner = $ 'div', @el
    @

  _handleColors: ->
    @inner.css
      'color': @options.color
      'border-color': @options.color
    @

  _eventify: ->
    @el.on 'mouseenter', => @stop()
    @

  _positionRandomly: ->
    @el.css
      left: randomNum 20, 260
      top: randomNum 20, 160
    @

  startMoving: ->
    toRight = left: 10
    toLeft = left: -10
    s = @options.speed
    @inner.animate toRight, s
    @inner.animate toLeft, s, => @startMoving()
    @

  stop: ->
    @inner.stop true
    @

class Aquarium
  constructor: ->
    @el = $ '#aquarium'
    @fishItems = []

  addFish: (options) ->
    fish = new Fish options
    @el.append fish.el
    @fishItems.push fish
    @

  startAll: ->
    $.each @fishItems, (i, fish) -> fish.startMoving()
    @

  stopAll: ->
    $.each @fishItems, (i, fish) -> fish.stop()
    @

$ ->
  aquarium = new Aquarium
  light = new Light

  aquarium.addFish()
  aquarium.addFish {speed: 200, color: 'red'}
  aquarium.addFish {speed: 300, color: 'blue'}
  aquarium.addFish {speed: 400, color: 'green'}

  light.on 'poweron', -> aquarium.startAll()
  light.on 'poweroff', -> aquarium.stopAll()

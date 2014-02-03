(function() {
  var Aquarium, EventModule, Fish, Light, randomNum,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  randomNum = function(from, to) {
    var floor, random;
    floor = Math.floor;
    random = Math.random;
    return from + floor(random() * (to - from + 1));
  };

  EventModule = (function() {
    function EventModule() {}

    EventModule.prototype.on = function(name, cb) {
      if (this.cbs == null) {
        this.cbs = {};
      }
      if (this.cbs[name] == null) {
        this.cbs[name] = [];
      }
      this.cbs[name].push(cb);
      return this;
    };

    EventModule.prototype.trigger = function(name) {
      var cb, list, _i, _len, _ref;
      list = (_ref = this.cbs) != null ? _ref[name] : void 0;
      if (!list) {
        return this;
      }
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        cb = list[_i];
        cb();
      }
      return this;
    };

    return EventModule;

  })();

  Light = (function(_super) {
    __extends(Light, _super);

    function Light() {
      var _this = this;
      this.powered = false;
      this.el = $('#light');
      this.el.click(function() {
        return _this.toggle();
      });
    }

    Light.prototype.powerOn = function() {
      this.powered = true;
      this.el.css('background', 'yellow');
      this.trigger('poweron');
      return this;
    };

    Light.prototype.powerOff = function() {
      this.powered = false;
      this.el.css('background', 'white');
      this.trigger('poweroff');
      return this;
    };

    Light.prototype.toggle = function() {
      if (this.powered) {
        this.powerOff();
      } else {
        this.powerOn();
      }
      return this;
    };

    return Light;

  })(EventModule);

  Fish = (function() {
    function Fish(options) {
      this.options = $.extend({}, this.defaultOptions, options);
      this._prepareEls();
      this._handleColors();
      this._eventify();
      this._positionRandomly();
    }

    Fish.prototype.defaultOptions = {
      speed: 400,
      color: 'black',
      src: '<div class="fish"><div>魚</div></div>'
    };

    Fish.prototype._prepareEls = function() {
      this.el = $(this.options.src);
      this.inner = $('div', this.el);
      return this;
    };

    Fish.prototype._handleColors = function() {
      this.inner.css({
        'color': this.options.color,
        'border-color': this.options.color
      });
      return this;
    };

    Fish.prototype._eventify = function() {
      var _this = this;
      this.el.on('mouseenter', function() {
        return _this.stop();
      });
      return this;
    };

    Fish.prototype._positionRandomly = function() {
      this.el.css({
        left: randomNum(20, 260),
        top: randomNum(20, 160)
      });
      return this;
    };

    Fish.prototype.startMoving = function() {
      var s, toLeft, toRight,
        _this = this;
      toRight = {
        left: 10
      };
      toLeft = {
        left: -10
      };
      s = this.options.speed;
      this.inner.animate(toRight, s);
      this.inner.animate(toLeft, s, function() {
        return _this.startMoving();
      });
      return this;
    };

    Fish.prototype.stop = function() {
      this.inner.stop(true);
      return this;
    };

    return Fish;

  })();

  Aquarium = (function() {
    function Aquarium() {
      this.el = $('#aquarium');
      this.fishItems = [];
    }

    Aquarium.prototype.addFish = function(options) {
      var fish;
      fish = new Fish(options);
      this.el.append(fish.el);
      this.fishItems.push(fish);
      return this;
    };

    Aquarium.prototype.startAll = function() {
      $.each(this.fishItems, function(i, fish) {
        return fish.startMoving();
      });
      return this;
    };

    Aquarium.prototype.stopAll = function() {
      $.each(this.fishItems, function(i, fish) {
        return fish.stop();
      });
      return this;
    };

    return Aquarium;

  })();

  $(function() {
    var aquarium, light;
    aquarium = new Aquarium;
    light = new Light;
    aquarium.addFish();
    aquarium.addFish({
      speed: 200,
      color: 'red'
    });
    aquarium.addFish({
      speed: 300,
      color: 'blue'
    });
    aquarium.addFish({
      speed: 400,
      color: 'green'
    });
    light.on('poweron', function() {
      return aquarium.startAll();
    });
    return light.on('poweroff', function() {
      return aquarium.stopAll();
    });
  });

}).call(this);

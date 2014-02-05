(function() {
  var Rollover;

  Rollover = (function() {
    Rollover.prototype.defaults = {
      str_off: '_off',
      str_on: '_on'
    };

    function Rollover($el, options) {
      this.options = $.extend({}, this.defaults, options);
      this.$el = $el;
      this.$img = $el.find('img');
      this._prepareSrcs();
      this._preload();
      this._eventify();
    }

    Rollover.prototype._prepareSrcs = function() {
      this._src_off = this.$img.attr('src');
      this._src_on = this._src_off.replace(this.options.str_off, this.options.str_on);
      return this;
    };

    Rollover.prototype._preload = function() {
      $('<img>').attr('src', this._src_on);
      return this;
    };

    Rollover.prototype._eventify = function() {
      var _this = this;
      this.$el.on('mouseenter focus', function() {
        return _this.toOver();
      });
      this.$el.on('mouseleave blur', function() {
        return _this.toNormal();
      });
      return this;
    };

    Rollover.prototype.toOver = function() {
      this.$img.attr('src', this._src_on);
      return this;
    };

    Rollover.prototype.toNormal = function() {
      this.$img.attr('src', this._src_off);
      return this;
    };

    return Rollover;

  })();

  $.fn.rollover = function(options) {
    return this.each(function(i, el) {
      var $el, rollover;
      $el = $(el);
      rollover = new Rollover($el, options);
      $el.data('rollover', rollover);
      return this;
    });
  };

  $(function() {
    return $('.rollover').rollover();
  });

}).call(this);

;(function($, window, document, undefined) {

  var Wipe = function( el, options ) {
    this.el       = el;
    this.$el      = $(el);
    this.options  = options;
    this.metadata = this.$el.data('wipe-options');

    this.$splash  = this.$el.find('[data-wipe-splash]');
    this.$main    = this.$el.find('[data-wipe-main]');
    this.$target  = this.$el.find('[data-wipe-target]');
    this.$close   = this.$el.find('[data-wipe-close]');
  };

  Wipe.prototype = {
    defaults: {
      offset: 0,
    },

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options, this.metadata );

      this.bindEvents();
      this.setHeight( this.$splash.height() );

      return this;
    },

    debounce: function(fn, delay) {
      var timer = null;

      return function () {
        var context = this;
        var args    = arguments;

        window.clearTimeout(timer);

        timer = window.setTimeout( function() { fn.apply(context, args); }, 250); 
      };
    },

    // events
    bindEvents: function() {
      var self = this;

      this.$target.on('click', function(e) {
        self.showMain();
        e.preventDefault();
      });

      this.$close.on('click', function(e) {
        self.showSplash();
        e.preventDefault();
      });
    },

    showMain: function() {  this.setHeight( this.$main.height() );
      this.$el.attr('data-wipe','show-main');
    },

    showSplash: function() {
      this.setHeight( this.$splash.height() );
      this.$el.attr('data-wipe','show-splash');
    },

    setHeight: function( height ) {
      this.$el.height( height );
    },
  };


  Wipe.defaults = Wipe.prototype.defaults;

  $.fn.wipe = function( options ) {
    return this.each(function() {
      new Wipe(this, options).init();
    });
  };

})(jQuery, window, document);

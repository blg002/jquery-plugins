;(function($, window, document, undefined) {

  var Nav = function( el, options ) {
    this.el       = el;
    this.$el      = $(el);
    this.options  = options;
    this.metadata = this.$el.data('nav-options');
  };

  Nav.prototype = {
    defaults: {
      triggerPoint: 0,
    },

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options, this.metadata );

      this.bindEvents();
      this.handleScroll();

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

      window.addEventListener('scroll', function(){
        self.debounce( self.handleScroll(), 250 );
      });
    },

    handleScroll: function() {
      var elClass = this.el.classList
      var winTop  = window.pageYOffset;
      var winBot  = winTop + window.innerHeight;
      
      if ( typeof this.config.triggerPoint === 'function' ) {
        var triggerPoint = this.config.triggerPoint.call();
      } else {
        var triggerPoint = this.config.triggerPoint;
      }

      winTop > triggerPoint ? elClass.add('fixed') : elClass.remove('fixed');
    },
  };


  Nav.defaults = Nav.prototype.defaults;

  $.fn.nav = function( options ) {
    return this.each(function() {
      new Nav(this, options).init();
    });
  };

})(jQuery, window, document);

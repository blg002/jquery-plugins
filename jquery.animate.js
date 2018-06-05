;(function($, window, document, undefined) {

  var Animate = function( el, options ) {
    this.el       = el;
    this.$el      = $(el);
    this.options  = options;
    this.metadata = this.$el.data('animate-options');

    this.$win = $(window);

    this.elHeight = this.el.offsetHeight;
    this.elTop    = this.el.offsetTop;
    this.elMid    = this.elTop + (this.elHeight / 2);
    this.elBot    = this.elTop + this.elHeight;
  };

  Animate.prototype = {
    defaults: {
      offset: 0,
    },

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options, this.metadata );

      this.bindEvents();

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

      this.$win.on('scroll', function(){
        self.debounce( self.handleScroll(), 250 );
      });
    },

    handleScroll: function() {
      var winTop = window.pageYOffset;
      var winBot = winTop + window.innerHeight;

      if ( winBot >  this.elTop + parseInt(this.config.offset, 10) ) {
        this.$el.addClass('animate');
        // this.$win.off('scroll');
      }
    },
  };


  Animate.defaults = Animate.prototype.defaults;

  $.fn.UVanimate = function( options ) {
    return this.each(function() {
      new Animate(this, options).init();
    });
  };

})(jQuery, window, document);

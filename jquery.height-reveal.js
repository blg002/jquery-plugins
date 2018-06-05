;(function($, window, document, undefined) {

  var HeightReveal = function( el, options ) {
    this.el       = el;
    this.$el      = $(el);
    this.options  = options;
    this.metadata = this.$el.data('height-reveal-options');

    this.$win      = $(window);
    this.winHeight = window.innerHeight;

    this.elHeight = this.el.offsetHeight;
    this.elTop    = this.el.offsetTop;
    // this.elMid    = this.elTop + (this.elHeight / 2);
    this.elBot    = this.elTop + this.elHeight;
  };

  HeightReveal.prototype = {
    defaults: {
      offset: 0,
    },

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options, this.metadata );

      // this.el.style.height = '0px';
      this.el.style.overflow = 'hidden';
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
      var winTop      = window.pageYOffset;
      var winBot      = winTop + window.innerHeight;
      var finalOffset = winTop - this.elTop + (this.winHeight / 2 + this.elHeight / 2 + 135);

      if ( finalOffset <= 0 ) {
        this.el.style.height = '0px';
      } else if ( finalOffset >= this.elHeight ) {
        // this.el.removeAttribute( 'style' );
        // this.el.style.height = null;
      } else {
        this.el.style.height = finalOffset + 'px';
      }
    },
  };


  HeightReveal.defaults = HeightReveal.prototype.defaults;

  $.fn.heightReveal = function( options ) {
    return this.each(function() {
      new HeightReveal(this, options).init();
    });
  };

})(jQuery, window, document);

;(function($, window, document, undefined) {

  var VideoHero = function( hero, options ) {
    this.hero     = hero;
    this.$hero    = $(hero);
    this.options  = options;

    this.$win   = $(window);
    this.$video = this.$hero.find('#hero-video');
    this.$wrap  = $('.video-hero-main-wrap')

    this.resizeTimeout = null;
    this.videoRatio    = 16 / 9;
  };

  VideoHero.prototype = {
    defaults: {},

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options );

      this.bindEvents();
      this.setHeroHeight();
      this.calcScale();

      return this;
    },

    // events
    bindEvents: function() {
      var self = this;

      this.$win.on('resize', function(){
        clearTimeout( self.resizeTimeout );
        self.resizeTimeout = setTimeout( function() { self.handleResize(); }, 100 );
      });
    },

    handleResize: function() {
      this.setHeroHeight();
      this.calcScale();
    },

    // actions
    setHeroHeight: function() {
      this.$hero.outerHeight( this.$win.height() );
      this.$wrap.css({ 'margin-top' : this.$win.height() });
    },

    calcScale: function() {
      var scale = 1;
      var viewportRatio = this.$win.width() / this.$win.height();

      if (this.videoRatio < viewportRatio) {
        // viewport more widescreen than video aspect ratio
        scale = viewportRatio / this.videoRatio;
      } else if (viewportRatio < this.videoRatio) {
        // viewport more square than video aspect ratio
        scale = this.videoRatio / viewportRatio;
      }

      this.setVideoScale( scale );
    },

    setVideoScale: function( scale ) {
      this.$video.css({
        '-webkit-transform' : 'scale(' + scale  + ')',
                'transform' : 'scale(' + scale  + ')'
      });
    },
  };


  VideoHero.defaults = VideoHero.prototype.defaults;

  $.fn.videoHero = function( options ) {
    return this.each(function() {
      new VideoHero(this, options).init();
    });
  };

})(jQuery, window, document);

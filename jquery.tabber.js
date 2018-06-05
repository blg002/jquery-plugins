;(function($, window, document, undefined) {

  var Tabber = function( elem, options ) {
    this.elem     = elem;
    this.$elem    = $(elem);
    this.options  = options;
    this.metadata = this.$elem.data('tabber-options');

    this.$links    = this.$elem.find('.tabber-target');
    this.$sections = this.$elem.find('.tabber-section');
  };

  Tabber.prototype = {
    defaults: {
      initial: 0
    },

    init: function() {
      this.config = $.extend( {}, this.defaults, this.options, this.metadata );

      this.bindEvents();

      // set inital view
      var initialGroup = this.$links.eq(this.config.initial).data('tabber-group');
      this.setSelected( initialGroup );

      return this;
    },

    // events
    bindEvents: function() {
      var self = this;

      this.$links.on( 'click', $.proxy(this.handleClick, self) );
    },

    handleClick: function( e ) {
      e.preventDefault();
      var $link = $(e.currentTarget);
      var group = $link.data('tabber-group');
      
      this.setSelected( group );
    },

    // actions
    setSelected: function( group ) {
      this.$links.removeClass('is-selected').filter('[data-tabber-group="'+ group +'"]').addClass('is-selected');
      this.$sections.removeClass('is-selected').filter('[data-tabber-group="'+ group +'"]').addClass('is-selected');
    },
  };


  Tabber.defaults = Tabber.prototype.defaults;

  $.fn.tabber = function( options ) {
    return this.each(function() {
      new Tabber(this, options).init();
    });
  };

})(jQuery, window, document);

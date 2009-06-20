/*
 * jGraduate 0.01
 *
 * jQuery Plugin for a gradient picker
 *
 * Copyright (c) 2009 Jeff Schiller
 * http://blog.codedread.com/
 *
 * Apache 2 License
 *
 */
jQuery.fn.jGraduate =
	function(options) {
		return this.each( function() {
			var $this = $(this), id = $this.attr('id');
            if (!id)
            {
              alert('Container element must have an id attribute to maintain unique id strings for sub-elements.');
              return;
            }		
			alert('yo');
		});
	};

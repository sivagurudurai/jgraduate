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
ns = { svg: 'http://www.w3.org/2000/svg' };
if(!window.console) {
  window.console = new function() {
    this.log = function(str) {};
    this.dir = function(str) {};
  };
}
jQuery.fn.jGraduate =
	function(options) {
		console.log('hello');
	 	var $arguments = arguments;
		return this.each( function() {
			var $this = $(this), id = $this.attr('id');
            if (!id)
            {
              alert('Container element must have an id attribute to maintain unique id strings for sub-elements.');
              return;
            }
            
            var 
            okClicked = function() {
            	$.isFunction($this.okCallback) && $this.okCallback();
            	$this.hide();
            },
            cancelClicked = function() {
            	$this.gradient = null;
            	$.isFunction($this.cancelCallback) && $this.cancelCallback();
            	$this.hide();
            };

            $.extend(true, $this, // public properties, methods, and callbacks
              {
                gradient: null,
                okCallback: $.isFunction($arguments[0]) && $arguments[0] || null, // commitCallback function can be overridden to return the selected color to a method you specify when the user clicks "OK"
                cancelCallback: $.isFunction($arguments[1]) && $arguments[1] || null, // cancelCallback function can be overridden to a method you specify when the user clicks "Cancel"
              });
            
            $this.addClass('jGraduate_Picker');
            $this.html('<div id="' + id + '_jGraduate_Swatch" class="jGraduate_Swatch"></div><div id="' + id + 
            	'_jGraduate_Form" class="jGraduate_Form">Begin:<br/><label>x</label><input type="text" name="' + id + 
            	'_jGraduate_x1" size="3"/><label>y</label><input type="text" name="' + id +
            	'_jGraduate_y1" size="3"/><br/><label>Color</label><input type="text" name="' + id +
            	'_jGraduate_beginColor" size="6"/><br/><label>Opacity</label><input type="text" name="' + id +
            	'_jGraduate_beginOpacity" size="4"/><br/>End:<br/><label>x</label><input type="text" name="' + id + 
            	'_jGraduate_x2" size="3"/><label>y</label><input type="text" name="' + id +
            	'_jGraduate_y2" size="3"/><br/><label>Color</label><input type="text" name="' + id +
            	'_jGraduate_endColor" size="6"/><br/><label>Opacity</label><input type="text" name="' + id +
            	'_jGraduate_endOpacity" size="4"/><br/><div class="jGraduate_OkCancel"><input type="button" id="' + id + 
            	'_jGraduate_Ok" class="jGraduate_Ok" value="OK"/><input type="button" id="' + id +
            	'_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/></div></div>').show();
            var okButton = $('#'+id+'_jGraduate_Ok');
            okButton.bind('click', okClicked);
            var cancelButton = $('#'+id+'_jGraduate_Cancel');
            cancelButton.bind('click', cancelClicked);
            
            // Set up all the SVG elements (the gradient, stops and rectangle)
            var container = document.getElementById(id+'_jGraduate_Swatch');
            var svg = container.appendChild(document.createElementNS(ns.svg, 'svg'));
            svg.id = 'jgraduate_svg';
            
            svg.setAttribute('width', '300px');
            svg.setAttribute('height', '300px');
			svg.setAttribute("xmlns", ns.svg);
			
			var grad = svg.appendChild(document.createElementNS(ns.svg, 'linearGradient'));
			grad.id = 'jgraduate_grad';
			grad.setAttribute('x1','0.0');
			grad.setAttribute('y1','0.0');
			grad.setAttribute('x2','1.0');
			grad.setAttribute('y2','1.0');
			$this.gradient = grad;
			
			var begin = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
			begin.setAttribute('offset', '0.0');
			begin.setAttribute('stop-color', 'red');

			var end = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
			end.setAttribute('offset', '1.0');
			end.setAttribute('stop-color', 'yellow');
			
            var rect = svg.appendChild(document.createElementNS(ns.svg, 'rect'));
            rect.id = 'jgraduate_rect';
            rect.setAttribute('x', '5px');
            rect.setAttribute('y', '5px');
            rect.setAttribute('width', '290px');
            rect.setAttribute('height', '290px');
            rect.setAttribute('stroke', 'black');
            rect.setAttribute('fill', 'none');

            var rect = svg.appendChild(document.createElementNS(ns.svg, 'rect'));
            rect.id = 'jgraduate_rect';
            rect.setAttribute('x', '5px');
            rect.setAttribute('y', '5px');
            rect.setAttribute('width', '290px');
            rect.setAttribute('height', '290px');
            rect.setAttribute('fill', 'url(#jgraduate_grad)');
		});
	};

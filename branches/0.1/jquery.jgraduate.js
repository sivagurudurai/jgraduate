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
	 	var $arguments = arguments;
		return this.each( function() {
			console.log('yo');
			var $this = $(this), id = $this.attr('id');
            if (!id)
            {
              alert('Container element must have an id attribute to maintain unique id strings for sub-elements.');
              return;
            }
            
            var okButton = null, 
            cancelButton = null,
            x1Input = null,
            y1Input = null,
            x2Input = null,
            y2Input = null,
            beginColorInput = null,
            beginOpacityInput = null,
            endColorInput = null,
            endOpacityInput = null,
            
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
                gradient: $arguments[0] || null,
                okCallback: $.isFunction($arguments[1]) && $arguments[1] || null, // commitCallback function can be overridden to return the selected color to a method you specify when the user clicks "OK"
                cancelCallback: $.isFunction($arguments[2]) && $arguments[2] || null, // cancelCallback function can be overridden to a method you specify when the user clicks "Cancel"
              });
            
            $this.addClass('jGraduate_Picker');
            $this.html('<div id="' + id + '_jGraduate_Swatch" class="jGraduate_Swatch"></div><div id="' + id + 
            	'_jGraduate_Form" class="jGraduate_Form">Begin:<br/><label>x</label><input type="text" id="' + id + 
            	'_jGraduate_x1" size="3"/><label>y</label><input type="text" id="' + id +
            	'_jGraduate_y1" size="3"/><br/><label>Color</label><input type="text" id="' + id +
            	'_jGraduate_beginColor" size="6"/><br/><label>Opacity</label><input type="text" id="' + id +
            	'_jGraduate_beginOpacity" size="4"/><br/>End:<br/><label>x</label><input type="text" id="' + id + 
            	'_jGraduate_x2" size="3"/><label>y</label><input type="text" id="' + id +
            	'_jGraduate_y2" size="3"/><br/><label>Color</label><input type="text" id="' + id +
            	'_jGraduate_endColor" size="6"/><br/><label>Opacity</label><input type="text" id="' + id +
            	'_jGraduate_endOpacity" size="4"/><br/><div class="jGraduate_OkCancel"><input type="button" id="' + id + 
            	'_jGraduate_Ok" class="jGraduate_Ok" value="OK"/><input type="button" id="' + id +
            	'_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/></div></div>').show();
            
			// --------------
            // Set up all the SVG elements (the gradient, stops and rectangle)
            var container = document.getElementById(id+'_jGraduate_Swatch');
            var svg = container.appendChild(document.createElementNS(ns.svg, 'svg'));
            svg.id = 'jgraduate_svg';
            
            svg.setAttribute('width', '300px');
            svg.setAttribute('height', '300px');
			svg.setAttribute("xmlns", ns.svg);
			
			if ($this.gradient) {
				$this.gradient = svg.appendChild( document.importNode($this.gradient, true) );
				$this.gradient.id = id+'_jgraduate_grad';
			}
			else {
				var grad = svg.appendChild(document.createElementNS(ns.svg, 'linearGradient'));
				grad.id = id+'_jgraduate_grad';
				grad.setAttribute('x1','0.0');
				grad.setAttribute('y1','0.0');
				grad.setAttribute('x2','1.0');
				grad.setAttribute('y2','1.0');
				
				var begin = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
				begin.setAttribute('offset', '0.0');
				begin.setAttribute('stop-color', 'red');

				var end = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
				end.setAttribute('offset', '1.0');
				end.setAttribute('stop-color', 'yellow');
			
				$this.gradient = grad;
			}
			
            var rect = svg.appendChild(document.createElementNS(ns.svg, 'rect'));
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
            rect.setAttribute('fill', 'url(#'+id+'_jgraduate_grad)');
			// --------------
            
            // bind GUI elements
            okButton = $('#'+id+'_jGraduate_Ok');
            okButton.bind('click', okClicked);
            
            cancelButton = $('#'+id+'_jGraduate_Cancel');
            cancelButton.bind('click', cancelClicked);
            
            x1Input = $('#'+id+'_jGraduate_x1');
            var x1 = $this.gradient.getAttribute('x1');
            if(!x1) x1 = "0.0";
            x1Input.val(x1);
            x1Input.change( function() {
            	$this.gradient.setAttribute('x1', this.value);
            });

            y1Input = $('#'+id+'_jGraduate_y1');
            var y1 = $this.gradient.getAttribute('y1');
            if(!y1) y1 = "0.0";
            y1Input.val(y1);
            y1Input.change( function() {
            	$this.gradient.setAttribute('y1', this.value);
            });
            
            x2Input = $('#'+id+'_jGraduate_x2');
            var x2 = $this.gradient.getAttribute('x2');
            if(!x2) x2 = "1.0";
            x2Input.val(x2);
            x2Input.change( function() {
            	$this.gradient.setAttribute('x2', this.value);
            });
            
            y2Input = $('#'+id+'_jGraduate_y2');
            var y2 = $this.gradient.getAttribute('y2');
            if(!y2) y2 = "0.0";
            y2Input.val(y2);
            y2Input.change( function() {
            	$this.gradient.setAttribute('y2', this.value);
            });            
            
            var stops = $this.gradient.getElementsByTagNameNS(ns.svg, 'stop');

            beginColorInput = $('#'+id+'_jGraduate_beginColor');
            var beginColor = stops[0].getAttribute('stop-color');
            if(!beginColor) beginColor = '#000000';
            beginColorInput.val(beginColor);
            beginColorInput.change( function() {
            	stops[0].setAttribute('stop-color', this.value);
            });

            beginOpacityInput = $('#'+id+'_jGraduate_beginOpacity');
            var beginOpacity = stops[0].getAttribute('stop-opacity');
            if(!beginOpacity) beginOpacity = '1.0';
            beginOpacityInput.val(beginOpacity);
            beginOpacityInput.change( function() {
            	stops[0].setAttribute('stop-opacity', this.value);
            });

            endColorInput = $('#'+id+'_jGraduate_endColor');
            var endColor = stops[1].getAttribute('stop-color');
            if(!endColor) endColor = '#000000';
            endColorInput.val(endColor);
            endColorInput.change( function() {
            	stops[1].setAttribute('stop-color', this.value);
            });

            endOpacityInput = $('#'+id+'_jGraduate_endOpacity');
            var endOpacity = stops[1].getAttribute('stop-opacity');
            if(!endOpacity) endOpacity = '1.0';
            endOpacityInput.val(endOpacity);
            endOpacityInput.change( function() {
            	stops[1].setAttribute('stop-opacity', this.value);
            });

		});
	};

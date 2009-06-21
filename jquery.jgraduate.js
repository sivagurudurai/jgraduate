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
jQuery.fn.jGraduate =
	function(options) {
		return this.each( function() {
			var $this = $(this), id = $this.attr('id');
            if (!id)
            {
              alert('Container element must have an id attribute to maintain unique id strings for sub-elements.');
              return;
            }
            $this.addClass('jGraduate_Picker');
            $this.html('<div id="' + id + '_jGraduate_Swatch" class="jGraduate_Swatch"></div><div id="' + id + 
            	'_jGraduate_Form" class="jGraduate_Form"><input type="button" id="' + id + 
            	'_jGraduate_Ok" class="jGraduate_Ok" value="OK"/><input type="button" id="' + id +
            	'_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/></div>').show();
            
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
			
			var begin = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
			begin.setAttribute('offset', '0.0');
			begin.setAttribute('stop-color', 'black');

			var end = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
			end.setAttribute('offset', '1.0');
			end.setAttribute('stop-color', 'white');
			
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

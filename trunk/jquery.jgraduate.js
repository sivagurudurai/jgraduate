/*
 * jGraduate 0.2.x
 *
 * jQuery Plugin for a gradient picker
 *
 * Copyright (c) 2009 Jeff Schiller
 * http://blog.codedread.com/
 *
 * Apache 2 License
 
- the Paint object is:
	{
		// object describing the color picked used by jPicker
		solidColor: { },
		// DOM node for the linear gradient 
		linearGradient
	}
- only one of solidColor and linearGradient must be non-null

- picker accepts the following object as input:
	{
		okCallback: function to call when Ok is pressed
		cancelCallback: function to call when Cancel is pressed
		paint: object describing the paint to display initially, if not set, then default to opaque white
	}

- okCallback receives a Paint object

 *
 */
ns = { svg: 'http://www.w3.org/2000/svg', xlink: 'http://www.w3.org/1999/xlink' };
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
			var $this = $(this),
				id = $this.attr('id'),
				idref = '#'+$this.attr('id')+' ';
            if (!idref)
            {
              alert('Container element must have an id attribute to maintain unique id strings for sub-elements.');
              return;
            }
            
            var okClicked = function() {
            	$.isFunction($this.okCallback) && $this.okCallback($this.paint);
            	$this.hide();
            },
            cancelClicked = function() {
            	$.isFunction($this.cancelCallback) && $this.cancelCallback();
            	$this.hide();
            };

            $.extend(true, $this, // public properties, methods, and callbacks
              {
                paint: $arguments[0] || null,
                okCallback: $.isFunction($arguments[1]) && $arguments[1] || null,
                cancelCallback: $.isFunction($arguments[2]) && $arguments[2] || null,
              });

			var mode = "solidColor",
				pos = $this.position(),
				color = null;
			
			if ($this.paint == null) {
				$this.paint = { solidColor: new $.jPicker.Color({ hex: 'ffffff', a: 100 }), 
						  		linearGradient: null };
			}

			if ($this.paint.solidColor == null && $this.paint.linearGradient != null) {
				mode = "linearGradient";
				$this.paint.solidColor = new $.jPicker.Color({ hex: 'ffffff', a: 100 });
			}
			else if ($this.paint.solidColor != null && $this.paint.linearGradient == null) {
			}
			else {
				return null;
			}

            $this.addClass('jGraduate_Picker');
            $this.html('<ul class="jGraduate_tabs">' +
            				'<li class="jGraduate_tab_color jGraduate_tab_current">Solid Color</li>' +
            				'<li class="jGraduate_tab_lingrad">Linear Gradient</li>' +
            			'</ul>' +
            			'<div class="jGraduate_colPick"></div>' +
            			'<div class="jGraduate_lgPick"></div>');
			var colPicker = $(idref + '> .jGraduate_colPick');
			var lgPicker = $(idref + '> .jGraduate_lgPick');
			
            lgPicker.html('<div id="' + id + '_jGraduate_Swatch" class="jGraduate_Swatch"></div>' + 
            	'<div class="jGraduate_Form">' +
            		'<div class="jGraduate_StopSection">' +
	            		'<label class="jGraduate_Form_Heading">Begin Stop</label>' +
    	        		'<div class="jGraduate_Form_Section">' +
        	    			'<label>x</label>' +
            				'<input type="text" id="' + id + '_jGraduate_x1" size="3" title="Enter starting x value between 0.0 and 1.0"/>' +
            				'<label>y</label>' +
            				'<input type="text" id="' + id + '_jGraduate_y1" size="3" title="Enter starting y value between 0.0 and 1.0"/>' +
	        	    		'<div id="' + id + '_jGraduate_colorBoxBegin" class="colorBox"></div>' +
		            		'<label id="' + id + '_jGraduate_beginOpacity">100%</label>' +
        	   			'</div>' +
        	   		'</div>' +
        	   		'<div class="jGraduate_StopSection">' +
	            		'<label class="jGraduate_Form_Heading">End Stop</label>' +
    	        		'<div class="jGraduate_Form_Section">' +
	    	        		'<label>x</label>' +
		    	        	'<input type="text" id="' + id + '_jGraduate_x2" size="3" title="Enter ending x value between 0.0 and 1.0"/>' +
    		    	    	'<label>y</label>' +
        		    		'<input type="text" id="' + id + '_jGraduate_y2" size="3" title="Enter ending y value between 0.0 and 1.0"/>' +
        	    			'<div id="' + id + '_jGraduate_colorBoxEnd" class="colorBox"></div>' +
			            	'<label id="' + id + '_jGraduate_endOpacity">100%</label>' +
    	    	    	'</div>' +
    	    	    '</div>' +
    	       	'</div>' +
        	    '<div class="jGraduate_OkCancel">' +
            		'<input type="button" id="' + id + '_jGraduate_Ok" class="jGraduate_Ok" value="OK"/>' +
            		'<input type="button" id="' + id + '_jGraduate_Cancel" class="jGraduate_Cancel" value="Cancel"/>' +
            	'</div>' +
            	'<div id="' + id + '_jGraduate_stopPicker" class="jGraduate_stopPicker"></div>');
			
			// --------------
            // Set up all the SVG elements (the gradient, stops and rectangle)
            var MAX = 276, MARGINX = 10, MARGINY = 10, STOP_RADIUS = 15/2,
            	SIZEX = MAX - 2*MARGINX, SIZEY = MAX - 2*MARGINY;
            var container = document.getElementById(id+'_jGraduate_Swatch');
            var svg = container.appendChild(document.createElementNS(ns.svg, 'svg'));
            svg.id = id+'_jgraduate_svg';            
            svg.setAttribute('width', MAX);
            svg.setAttribute('height', MAX);
			svg.setAttribute("xmlns", ns.svg);
			
			if ($this.paint.linearGradient) {
				$this.paint.linearGradient = svg.appendChild( document.importNode($this.paint.linearGradient, true) );
				$this.paint.linearGradient.id = id+'_jgraduate_grad';
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
				begin.setAttribute('stop-color', '#ff0000');

				var end = grad.appendChild(document.createElementNS(ns.svg, 'stop'));
				end.setAttribute('offset', '1.0');
				end.setAttribute('stop-color', '#ff0');
			
				$this.paint.linearGradient = grad;
			}
			
			var x1 = parseFloat($this.paint.linearGradient.getAttribute('x1')||0.0);
			var y1 = parseFloat($this.paint.linearGradient.getAttribute('y1')||0.0);
			var x2 = parseFloat($this.paint.linearGradient.getAttribute('x2')||1.0);
			var y2 = parseFloat($this.paint.linearGradient.getAttribute('y2')||0.0);
			
            var brect = svg.appendChild(document.createElementNS(ns.svg, 'rect'));
            brect.setAttribute('x', MARGINX);
            brect.setAttribute('y', MARGINY);
            brect.setAttribute('width', SIZEX);
            brect.setAttribute('height', SIZEX);
            brect.setAttribute('stroke', 'black');
            brect.setAttribute('fill', 'none');

            var rect = svg.appendChild(document.createElementNS(ns.svg, 'rect'));
            rect.id = 'jgraduate_rect';
            rect.setAttribute('x', MARGINX);
            rect.setAttribute('y', MARGINY);
            rect.setAttribute('width', SIZEY);
            rect.setAttribute('height', SIZEY);
            rect.setAttribute('fill', 'url(#'+id+'_jgraduate_grad)');
            
            // stop visuals created here
            var beginStop = svg.appendChild(document.createElementNS(ns.svg, 'image'));
            beginStop.id = "stop1";
            beginStop.setAttribute('class', 'stop');
            beginStop.setAttributeNS(ns.xlink, 'href', 'images/mappoint.gif');
            beginStop.setAttributeNS(ns.xlink, "title", "Begin Stop");
            beginStop.appendChild(document.createElementNS(ns.svg, 'title')).appendChild(
            	document.createTextNode("Begin Stop"));
            beginStop.setAttribute('width', 15);
            beginStop.setAttribute('height', 15);
            beginStop.setAttribute('x', MARGINX + SIZEX*x1 - STOP_RADIUS);
            beginStop.setAttribute('y', MARGINY + SIZEY*y1 - STOP_RADIUS);
            beginStop.setAttribute('cursor', 'move');
            
            var endStop = svg.appendChild(document.createElementNS(ns.svg, 'image'));
            endStop.id = "stop2";
            endStop.setAttribute('class', 'stop');
            endStop.setAttributeNS(ns.xlink, 'href', 'images/mappoint.gif');
            endStop.setAttributeNS(ns.xlink, "title", "End Stop");
            endStop.appendChild(document.createElementNS(ns.svg, 'title')).appendChild(
            	document.createTextNode("End Stop"));
            endStop.setAttribute('width', 15);
            endStop.setAttribute('height', 15);
            endStop.setAttribute('x', MARGINX + SIZEX*x2 - STOP_RADIUS);
            endStop.setAttribute('y', MARGINY + SIZEY*y2 - STOP_RADIUS);
            endStop.setAttribute('cursor', 'move');
            
            // bind GUI elements
            $('#'+id+'_jGraduate_Ok').bind('click', function() {
				$this.paint.solidColor = null;
            	okClicked();
            });
            $('#'+id+'_jGraduate_Cancel').bind('click', function(paint) {
            	cancelClicked();
            });
            
            var x1 = $this.paint.linearGradient.getAttribute('x1');
            if(!x1) x1 = "0.0";
            x1Input = $('#'+id+'_jGraduate_x1');
            x1Input.val(x1);
            x1Input.change( function() {
            	if (isNaN(parseFloat(this.value)) || this.value < 0.0 || this.value > 1.0) { 
            		this.value = 0.0; 
            	}
            	$this.paint.linearGradient.setAttribute('x1', this.value);
            	beginStop.setAttribute('x', MARGINX + SIZEX*this.value - STOP_RADIUS);
            });

            var y1 = $this.paint.linearGradient.getAttribute('y1');
            if(!y1) y1 = "0.0";
            y1Input = $('#'+id+'_jGraduate_y1');
            y1Input.val(y1);
            y1Input.change( function() {
            	if (isNaN(parseFloat(this.value)) || this.value < 0.0 || this.value > 1.0) { 
            		this.value = 0.0; 
            	}
            	$this.paint.linearGradient.setAttribute('y1', this.value);
            	beginStop.setAttribute('y', MARGINY + SIZEY*this.value - STOP_RADIUS);
            });
            
            var x2 = $this.paint.linearGradient.getAttribute('x2');
            if(!x2) x2 = "1.0";
            x2Input = $('#'+id+'_jGraduate_x2');
            x2Input.val(x2);
            x2Input.change( function() {
            	if (isNaN(parseFloat(this.value)) || this.value < 0.0 || this.value > 1.0) { 
            		this.value = 1.0;
            	}
            	$this.paint.linearGradient.setAttribute('x2', this.value);
            	endStop.setAttribute('x', MARGINX + SIZEX*this.value - STOP_RADIUS);
            });
            
            var y2 = $this.paint.linearGradient.getAttribute('y2');
            if(!y2) y2 = "0.0";
            y2Input = $('#'+id+'_jGraduate_y2');
            y2Input.val(y2);
            y2Input.change( function() {
            	if (isNaN(parseFloat(this.value)) || this.value < 0.0 || this.value > 1.0) { 
            		this.value = 0.0;
            	}
            	$this.paint.linearGradient.setAttribute('y2', this.value);
            	endStop.setAttribute('y', MARGINY + SIZEY*this.value - STOP_RADIUS);
            });            
            
            var stops = $this.paint.linearGradient.getElementsByTagNameNS(ns.svg, 'stop');
            var numstops = stops.length;
            // if there are not at least two stops, then 
            if (numstops < 2) {
	            while (numstops < 2) {
    	        	$this.paint.linearGradient.appendChild( document.createElementNS(ns.svg, 'stop') );
        	    	++numstops;
            	}
            	stops = $this.paint.linearGradient.getElementsByTagNameNS(ns.svg, 'stop');
            }
            
			// handle dragging the stop around the swatch
            var draggingStop = null;
            var startx = -1, starty = -1;
            $('image.stop').mousedown(function(evt) {
            	draggingStop = this;
            	startx = evt.clientX;
            	starty = evt.clientY;
            	evt.preventDefault();
            });
            $('#'+id+'_jgraduate_svg').mousemove(function(evt) {
            	if (null != draggingStop) {
            		var dx = evt.clientX - startx;
            		var dy = evt.clientY - starty;
            		startx += dx;
            		starty += dy;
            		var x = parseFloat(draggingStop.getAttribute('x')) + dx;
            		var y = parseFloat(draggingStop.getAttribute('y')) + dy;

					// clamp stop to the swatch
            		if (x < MARGINX - STOP_RADIUS) x = MARGINX - STOP_RADIUS;
            		if (y < MARGINY - STOP_RADIUS) y = MARGINY - STOP_RADIUS;
            		if (x > MARGINX + SIZEX - STOP_RADIUS) x = MARGINX + SIZEX - STOP_RADIUS;
            		if (y > MARGINY + SIZEY - STOP_RADIUS) y = MARGINY + SIZEY - STOP_RADIUS;
            		            		
            		draggingStop.setAttribute('x', x);
            		draggingStop.setAttribute('y', y);

					// calculate stop offset            		
            		var fracx = (x - MARGINX + STOP_RADIUS)/SIZEX;
            		var fracy = (y - MARGINY + STOP_RADIUS)/SIZEY;
            		
            		if (draggingStop.id == 'stop1') {
            			x1Input.val(fracx);
            			y1Input.val(fracy);
            			$this.paint.linearGradient.setAttribute('x1', fracx);
            			$this.paint.linearGradient.setAttribute('y1', fracy);
            		}
            		else {
            			x2Input.val(fracx);
            			y2Input.val(fracy);
            			$this.paint.linearGradient.setAttribute('x2', fracx);
            			$this.paint.linearGradient.setAttribute('y2', fracy);
            		}
            		
            		evt.preventDefault();
            	}
            });
            $('#'+id+'_jgraduate_svg').mouseup(function(evt) {
            	draggingStop = null;
            });
            
            var beginColor = stops[0].getAttribute('stop-color');
            if(!beginColor) beginColor = '#000';
            beginColorBox = $('#'+id+'_jGraduate_colorBoxBegin');
            beginColorBox.css({'background-color':beginColor});

            var beginOpacity = stops[0].getAttribute('stop-opacity');
            if(!beginOpacity) beginOpacity = '1.0';
            $('#'+id+'jGraduate_beginOpacity').html( (beginOpacity*100)+'%' );

            var endColor = stops[stops.length-1].getAttribute('stop-color');
            if(!endColor) endColor = '#000';
            endColorBox = $('#'+id+'_jGraduate_colorBoxEnd');
            endColorBox.css({'background-color':endColor});

            var endOpacity = stops[stops.length-1].getAttribute('stop-opacity');
            if(!endOpacity) endOpacity = '1.0';
            $('#'+id+'jGraduate_endOpacity').html( (endOpacity*100)+'%' );
            
			$('#'+id+'_jGraduate_colorBoxBegin').click(function() {
				var colorbox = $(this);
				color = new $.jPicker.Color({ hex: beginColor.substr(1), a:(parseFloat(beginOpacity)*100) });
				$('#'+id+'_jGraduate_stopPicker').css({'left': 10, 'bottom': 5}).jPicker({
						images: { clientPath: "images/" },
						color: { active: color, alphaSupport: true }
					}, function(color){
						beginColor = '#' + this.settings.color.active.hex;
						beginOpacity = this.settings.color.active.a/100;
						colorbox.css('background', beginColor);
						$('#'+id+'_jGraduate_beginOpacity').html((beginOpacity*100)+'%');
            			stops[0].setAttribute('stop-color', beginColor);
						stops[0].setAttribute('stop-opacity', beginOpacity);
						$('#'+id+'_jGraduate_stopPicker').hide();
					}, null, function() {$('#'+id+'_jGraduate_stopPicker').hide();});
			});
			$('#'+id+'_jGraduate_colorBoxEnd').click(function() {
				var colorbox = $(this);
				color = new $.jPicker.Color({ hex: endColor.substr(1), a:(parseFloat(endOpacity)*100) });
				$('#'+id+'_jGraduate_stopPicker').css({'left': 10, 'top': 5}).jPicker({
						images: { clientPath: "images/" },
						color: { active: color, alphaSupport: true }
					}, function(color){
						endColor = '#' + this.settings.color.active.hex;
						endOpacity = this.settings.color.active.a/100;
						colorbox.css('background', endColor);
						$('#'+id+'_jGraduate_endOpacity').html((endOpacity*100)+'%');
            			stops[1].setAttribute('stop-color', endColor);
						stops[1].setAttribute('stop-opacity', endOpacity);
						$('#'+id+'_jGraduate_stopPicker').hide();
					}, null, function() {$('#'+id+'_jGraduate_stopPicker').hide();});
			});            
            
			// --------------
            
			colPicker.jPicker(
				{
					images: { clientPath: "images/" },
					color: { active: $this.paint.solidColor, alphaSupport: true }
				},
				function(color) { 
					$this.paint.solidColor = color;
					$this.paint.linearGradient = null;
					okClicked(); 
				},
				null,
				function(){ cancelClicked(); }
				);
				
			$(idref + ' .jGraduate_tab_color').click( function(){
				$(idref + ' .jGraduate_tab_lingrad').removeClass('jGraduate_tab_current');
				$(idref + ' .jGraduate_tab_color').addClass('jGraduate_tab_current');
				lgPicker.hide();
				colPicker.show();
			});
			$(idref + ' .jGraduate_tab_lingrad').click( function(){
				$(idref + ' .jGraduate_tab_color').removeClass('jGraduate_tab_current');
				$(idref + ' .jGraduate_tab_lingrad').addClass('jGraduate_tab_current');
				colPicker.hide();
				lgPicker.show();
			});
			
			if (mode == "linearGradient") {
				lgPicker.show();
				colPicker.hide();
				$(idref + ' .jGraduate_tab_color').removeClass('jGraduate_tab_current');
				$(idref + ' .jGraduate_tab_lingrad').addClass('jGraduate_tab_current');				
			}
			else {
				colPicker.show();
				lgPicker.hide();
				$(idref + ' .jGraduate_tab_color').addClass('jGraduate_tab_current');
				$(idref + ' .jGraduate_tab_lingrad').removeClass('jGraduate_tab_current');				
			}

			$this.css({'left': pos.left, 'top': pos.top});
			$this.show();
		});
	};

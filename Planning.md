# Introduction #

This jQuery plugin will allow a user to pick a gradient and return it as either:

  * an unattached SVG gradient DOM element ([linearGradient](http://www.w3.org/TR/SVGTiny12/painting.html#LinearGradientElement) or [radialGradient](http://www.w3.org/TR/SVGTiny12/painting.html#RadialGradientElement))
  * raw text representing a CSS3 WebKit-style gradient

# Roadmap #

## Future ##

  * radial gradient (done as tab?)
  * option to return Webkit-style gradient as text?
  * option to return VML gradient?

## 0.2.x ##

This version of jGraduate will be the first used in SVG-edit.

  * include jPicker 1.0.8 with jGraduate (done)
  * remove opacity and color edit boxes from the form (done)
  * clicking the stop's color box will let you choose the color and opacity from jPicker (done)
  * dragging a stop on the swatch will automatically update the coordinate values and the gradient (done)
  * add an overall opacity to the gradient dialog
  * nest the gradient dialog in a jQuery tabbing pane (done)
  * first tab will be "Solid Color" and will embed jPicker (done)
  * second tab will be "Linear Gradient" which will be the existing dialog (done)
  * initialize jGraduate with a div that has a unique id (done)
  * jGraduate will insert a tiny SVG document into this div with a blank gradient and will control how this is displayed when Ok/Cancel

## 0.1.x ##

  * Released 2009-06-22
  * The first version will be a proof-of-concept.  The picker will only allow a simple linear gradient with a start/stop offset to be defined:
    * the left-hand side will show the current gradient (drawn as inline SVG rect)
    * the right-hand side will have:
      * Ok/Cancel buttons
      * Start definition: x, y, color, offset input boxes
      * End definition: x, y, color, offset input boxes
    * the x,y,offset inputs will be validated as a number between 0.0 and 1.0
    * the color inputs will be validated as a string #NNNNNN (where N is a digit 0..9)
    * returns an unattached linearGradient node
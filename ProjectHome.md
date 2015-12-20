jGraduate is a [jQuery](http://docs.jquery.com/Downloading_jQuery) plugin that is similar to a color picker but can be used to define gradients, a paint that smoothly blends from one color to another.  The gradient picker returns a JSON object that contains either a SVG linear gradient object a SVG radial gradient object or a color object (as returned by [jPicker](http://jpicker.googlecode.com/)).  The caller can then either importNode the gradient or utilize the color hex string in some way.

This plugin was conceived as part of the [SVG-edit](http://svg-edit.googlecode.com/) project and was made into a separate project.

jGraduate has three tabs:  Solid Color, Linear Gradient, and Radial Gradient.  The Solid Color tab wraps jPicker (a color picker).  The Gradient tabs have a similar picker for a  linear or radial gradient. Begin and end points can be moved, and gradient "stops" can be edited, added and removed.

  * Future versions may be compatible with Internet Explorer 8- via [svgweb](http://svgweb.googlecode.com/) (already compatible with IE9 beta).
  * Future versions may be configurable to return the gradient in other formats (Webkit CSS, Canvas, VML)
  * See our [Planning](Planning.md) document.

Feel free to [open issues](http://code.google.com/p/jgraduate/issues/list) or submit patches.

**See the [test page](http://jgraduate.googlecode.com/svn/trunk/index.html) for a demo of the trunk (0.4).**
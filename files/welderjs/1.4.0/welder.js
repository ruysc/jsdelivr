window.welder = (function () {
  function Welder() {
  }
  var welder = {
    init: function(opts) {
      // Initialise the weldeer
      if(!opts) opts = {};

      welder.delay = opts.delay || 50;
      welder.duration = opts.duration || 400;
      welder.easing = opts.easing || 'ease-out';
      welder.stateMode = 'data';
      welder.dataAttribute = opts.dataAttribute || "data-state";
    },
    transition: transition = function(el, newState, opts) {
      // If the welderer is already animating this element, don't do it again.
      if(el.classList.contains('welderAnimating')) {
        return false;
      }

      // Handle the options parameter
      if(!opts) opts = {};
      var delay = opts.delay || welder.delay;
      var duration = opts.duration || welder.duration;
      var easing = opts.easing || welder.easing;
      var dataAttribute = opts.dataAttribute || welder.dataAttribute;


      /*---------- Logic for the transition itself ----------*/

      // Get information about the old state
      var oldState = el.getAttribute(dataAttribute);
      var oldRect = el.getBoundingClientRect();

      // Get information about the new state
      el.setAttribute(dataAttribute, newState);
      var newRect = el.getBoundingClientRect();

      // Prepare element by positioning it fixed
      el.setAttribute(dataAttribute, oldState);
      el.style.position = 'fixed';
      el.style.top = oldRect.top+'px';
      el.style.left = oldRect.left+'px';
      el.style.right = oldRect.right+'px';
      el.style.bottom = oldRect.bottom+'px';
      el.style.width = oldRect.width+'px';
      el.style.height = oldRect.height+'px';

      // Wait a wee bit before starting the animation
      window.setTimeout(function(){
        // Set element to transition to new state
        el.setAttribute(dataAttribute, newState);
        el.style.transition = 'all '+duration/1000+'s '+easing;
        el.style.top = newRect.top+'px';
        el.style.left = newRect.left+'px';
        el.style.right = newRect.right+'px';
        el.style.bottom = newRect.bottom+'px';
        el.style.width = newRect.width+'px';
        el.style.height = newRect.height+'px';
        el.classList.add('welderAnimating');
      }, delay);

      window.setTimeout(function(){
        // Reset the style attribute so let the element rest at new state
        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.width = '';
        el.style.height = '';
        el.style.transition = '';
        el.classList.remove('welderAnimating');
      }, duration+delay);

    }

  };

  return welder;
}());

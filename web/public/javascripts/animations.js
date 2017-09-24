var ss = sessionStorage;
var menu = $('.menu');
var sectionHeader = $('.sectionHeader');
var animations = [ "zoomIn", "fadeInUpBig"]; //  'flipInY', '', 'bounceIn'

window.animateMainContainer = function animateMainContainer() {
    var mainContainer = $('#animate_div');
    var randomAnimation = Math.floor((Math.random() * animations.length));

    // if (ss.disabledMenuEffect != "true" && menu.length) {
    //   ss.disabledMenuEffect = "true"; // Don't repeat the header effect every load.
    //   menu.addClass('animated zoomIn');
    // }
    // else {
    //   menu.removeClass('animated zoomIn');
    // }

    if (sectionHeader.length) {
      // sectionHeader.addClass('animated flipInX');
      sectionHeader.addClass('animated flipInX');
    }

    if (mainContainer.length) {
      mainContainer.addClass('animated ' + animations[randomAnimation]);
    }
};

// Animate call to action button each 3 seconds
window.animateCalltoAction = function animate() {
  var startTime = 2000;
  var animation = "animated bounce";
  var cButton = $('.callToAction');

  if (cButton) {
    setInterval(function() {
      cButton.addClass(animation);
      setTimeout(function() {
        cButton.removeClass(animation);
      }, startTime - 200);
      if (startTime > 20000) {
        startTime = 2000;
      }
    }, startTime*3);
  }
};

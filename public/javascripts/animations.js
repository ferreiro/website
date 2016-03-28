var menu = $('.menu');
var footer = $('footer');
var sectionHeader = $('#sectionHeader');
var ss = sessionStorage;

var animations = ['rollIn',"zoomIn", 'flipInY', 'fadeInUpBig', 'bounceIn']

function animateMainContainer() {
    var mainContainer = $('#animate_div');
    var randomAnimation = Math.floor((Math.random() * animations.length));

    if (footer.length) {
      footer.hide(0).delay(1200).show(0);
    }

    if (ss.disabledMenuEffect != "true" && menu.length) {
      ss.disabledMenuEffect = "true"; // Don't repeat the header effect every load.
      menu.addClass('animated zoomIn');
    }
    if (sectionHeader.length) {
      sectionHeader.hide(0).delay(300).show(0).addClass('animated flipInX');
    }
    if (mainContainer.length) {
      mainContainer.hide(0).delay(900).show(0).addClass('animated ' + animations[randomAnimation]);
    }

}

$(document).ready(function(){
  animateMainContainer();
});

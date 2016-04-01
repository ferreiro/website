
// COPYRIGHT Jorge ferreiro

var body = $('body');
var jfmenu = $('.jfmenu');
var jfmenuContent = $('.jfmenu_content');
var jfmenuOverlay = $('.jfmenu_overlay');
var menuButton = $('.jfmenu_open_button');
// var scrollPosition = 0;

jfmenuOverlay.click(function() {
  if ($('.jfmenu').hasClass('jfmenu_displayed')) {
    hideMenu();
  }
});

// Menu links.
// When the menu link has a submenu inside (aka <ul>), display the submenu
// in onther case, don't do anaything
$('.jfmenu').find('li').click(function(event) {
  var e = $(this);
  var submenu_list = e.find('ul');

  if (submenu_list.length > 0) {
    submenu_list.each(function() {
      var menu = $(this);
      menu.toggleClass('jfmenu_displayed'); // Display the submenu
    });
  }
});


menuButton.click(function() {
  var e = $(this);

  if (jfmenu.hasClass('jfmenu_displayed')) {
    e.removeClass('jfmenu_open_button_active');
    hideMenu();

  }
  else {
    e.addClass('jfmenu_open_button_active');
    displayMenu();
  }
});

function hideMenu(){
  if (jfmenu.hasClass('jfmenu_displayed')) {

    // $('html, body').animate({
    //     scrollTop: scrollPosition
    // }, 0);
    jfmenu.removeClass('jfmenu_displayed');
    jfmenuContent.removeClass('fadeInDownBig');
    jfmenuOverlay.removeClass('fadeIn');
    body.removeClass('body_overflow');
  }
}

function displayMenu(){

  if (! jfmenu.hasClass('jfmenu_displayed')) {
    // scrollPosition = $('body').scrollTop(); // Capture current top position
    // $('html, body').animate({
    //     scrollTop: 0
    // }, 400);
    jfmenu.addClass('jfmenu_displayed');
    jfmenuContent.addClass('animated fadeInDownBig');
    jfmenuOverlay.addClass('animated fadeIn');
    body.addClass('body_overflow');
  }

}

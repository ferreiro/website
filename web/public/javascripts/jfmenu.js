
// COPYRIGHT Jorge ferreiro

var body = $('body');
var jfmenu = $('.jfmenu');
var jfmenuContent = $('.jfmenu_content');
var jfmenuOverlay = $('.jfmenu_overlay');
var menuButton = $('.jfmenu__mobileButton');

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
    hideMenu();
  }
  else {
    displayMenu();
  }
});

function hideMenu(){
  if (jfmenu.hasClass('jfmenu_displayed')) {
    body.removeClass('body_overflow');
    jfmenu.removeClass('jfmenu_displayed');
    jfmenuOverlay.removeClass('fadeIn');
    jfmenuContent.removeClass('fadeInDownBig');
    menuButton.removeClass('jfmenu__mobileButton__active');
  }
}

function displayMenu(){
  if (!jfmenu.hasClass('jfmenu_displayed')) {
    body.addClass('body_overflow');
    jfmenu.addClass('jfmenu_displayed');
    jfmenuOverlay.addClass('animated fadeIn');
    jfmenuContent.addClass('animated fadeInDownBig');
    menuButton.addClass('jfmenu__mobileButton__active');
  }
}

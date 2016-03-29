
// COPYRIGHT Jorge ferreiro

var jfmenu = $('.jfmenu');
var jfmenuContent = $('.jfmenu_content');
var jfmenuOverlay = $('.jfmenu_overlay');
var menuButton = $('.jfmenu_open_button');
var scrollPosition = 0;

menuButton.click(function() {
  var e = $(this);

  if (jfmenu.hasClass('jfmenu_displayed')) {
    hideMenu(e);
  }
  else {
    displayMenu(e);
  }
});

function hideMenu(e){
  $('html, body').animate({
      scrollTop: scrollPosition
  }, 0);
  e.addClass('jfmenu_displayed');
  jfmenu.removeClass('jfmenu_displayed');
  jfmenuContent.removeClass('animated fadeInDownBig');
}

function displayMenu(e){
  scrollPosition = $('body').scrollTop(); // Capture current top position
  $('html, body').animate({
      scrollTop: 0
  }, 400);
  e.removeClass('jfmenu_displayed');
  jfmenu.addClass('jfmenu_displayed animated');
  jfmenuContent.addClass('animated fadeInDownBig');
  jfmenuOverlay.addClass('animated fadeIn');
  $("html").scrollTop(0);
}

jfmenuOverlay.click(function() {

});

// Menu links.
// When the menu link has a submenu inside (aka <ul>), display the submenu
// in onther case, don't do anaything
$('.jfmenu').find('li').click(function(event) {
  var e = $(this);
  var submenu_list = e.find('ul');
  console.log(event);

  if (e.hasClass('submenu')) {
    event.preventDefault(); // Parent element. Don't open the link
  }

  submenu_list.each(function() {
    var menu = $(this);
    menu.toggleClass('jfmenu_displayed'); // Display the submenu
    console.log(menu);
  });


});

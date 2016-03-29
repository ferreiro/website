
// COPYRIGHT Jorge ferreiro

var jfmenu = $('.jfmenu');
var jfmenu_links = $('.jfmenu_content li');
var menuButton = $('.jfmenu_open_button');
var scrollPosition = 0;

menuButton.click(function() {
  var e = $(this);

  console.log(scrollPosition);

  if (jfmenu.hasClass('jfmenu_displayed')) {
    e.addClass('jfmenu_displayed');
    jfmenu.removeClass('jfmenu_displayed');
    $("html").scrollTop(scrollPosition); // http://stackoverflow.com/questions/2009029/restoring-page-scroll-position-with-jquery
  }
  else {
    scrollPosition = $("html").offset().top; // Capture current top position
    e.removeClass('jfmenu_displayed');
    jfmenu.addClass('jfmenu_displayed');
    $("html").scrollTop(0);
  }
});

// Menu links.
// When the menu link has a submenu inside (aka <ul>), display the submenu
// in onther case, don't do anaything
jfmenu_links.bind('click', function() {
  var e = $(this);
  var submenu_list = e.find('ul');

  if (e.closest().hasClass('submenu')) {
    event.preventDefault(); // Don't go to link
  }

  if (submenu_list.length > 0) {

    submenu_list.each(function() {
      var menu = $(this);
      menu.toggleClass('jfmenu_displayed'); // Display the submenu
      console.log(e);
    });
  }
  // else Menu link has no submenus. So go to the link
});

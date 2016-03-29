
// COPYRIGHT Jorge ferreiro

var menuButton = $('.jfmenu_open_button');
var jfmenu = $('.jfmenu');
var jfmenu_links = $('.jfmenu_content li');

menuButton.click(function() {
  var e = $(this);
  e.toggleClass('jfmenu_open_button_active');
  jfmenu.toggleClass('jfmenu_displayed');
});

// Menu links.
// When the menu link has a submenu inside (aka <ul>), display the submenu
// in onther case, don't do anaything
jfmenu_links.bind('click', function() {
  var e = $(this);
  var submenu = e.find('ul');

  if (submenu.length > 0) {
    // e.preventDefault(); // Don't go to link
    // Display the submenu
    e.find('ul').each(function() {
      var e = $(this);
      console.log(e);
      e.toggleClass('jfmenu_displayed');
      }
    );
  }
  else {
    // Menu link has no submenus. So go to the link
  }

});

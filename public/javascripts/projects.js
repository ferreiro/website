var popup = $('.imagePopup')
var popupImage = $('.imagePopup_content')
var popupDisplayed = false
var popupCloseButton = $('.imagePopup_close')
var projectImages = $('.project_gallery_entry')

// EVENTS

projectImages.click(function(e) {
  var e = $(this)
  displayPopup(e)
})

popupCloseButton.click(function(e) {
  hidepopup()
})

// AUXILIARY FUNCTIONS

var changePopupImage = function(src) {
  popupImage
    .find('img')
    .attr('src', src)
}

var hidepopup = function () {
  if (popupDisplayed) {
    popup.hide(0)
    popupDisplayed = false
  }
}

var displayPopup = function (elem) {
  var imageURL = elem.css('background-image').replace(/^url|[\(\)]|"/g, '')

  if (!popupDisplayed) {
    popup.fadeIn('400')
  }

  // change the image shown in the popup
  changePopupImage(imageURL)
  popupDisplayed = true
}

// Listening when the user press a key
$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        hidepopup() // Close my modal window
    }
})

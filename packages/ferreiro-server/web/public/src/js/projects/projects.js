var popup = $('.imagePopup')
var popupImage = $('.imagePopup_content')
var popupDisplayed = false
var popupCloseButton = $('.imagePopup_close')
var projectImages = $('.project_gallery_entry')

// EVENTS

projectImages.click(function() {
    var _this = $(this)
    displayPopup(_this)
})

popupCloseButton.click(function() {
    hidepopup()
})

popup.click(function() {
    hidepopup()
})

// AUXILIARY FUNCTIONS

var changePopupImage = function(src) {
    popupImage
        .find('img')
        .attr('src', src)
}

var hidepopup = function () {
    const webpageBody = $('body')
    webpageBody.css({ overflow: 'auto' })

    if (popupDisplayed) {
        popup.hide(0)
        popupDisplayed = false
    }
}

var displayPopup = function (elem) {
    const webpageBody = $('body')
    // const imageURL = elem.css('background-image').replace(/^url|[\(\)]|"/g, '')
    const bigImageUrl = elem
        .find('.bigImage')
        .attr('value')

    webpageBody.css({ overflow: 'hidden' })

    if (!popupDisplayed) {
        popup.fadeIn('400')
    }

    // change the image shown in the popup
    changePopupImage(bigImageUrl)
    popupDisplayed = true

}

// Listening when the user press a key
$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        hidepopup() // Close my modal window
    }
})

var openModalBox = $('.openModalBox')
var jfmodalbox = $('.jfmodalbox')
var jfmodalboxOverlay = $('.jfmodalbox_overlay')
// var jfmodalboxContent = $('.jfmodalbox_content')
var jfmodalboxClose = $('.jfmodalbox_close')

// Listening when the user press a key
$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode == 27) {
        closeModal() // Close my modal window
    }
})

jfmodalboxOverlay.click(function() {
    if (jfmodalbox.hasClass('jfmodalbox_displayed'))
        closeModal()
    else
        displayModal()
})

openModalBox.click(function() {
    if (jfmodalbox.hasClass('jfmodalbox_displayed'))
        closeModal()
    else
        displayModal()
})

jfmodalboxClose.click(function() {
    closeModal()
})

function closeModal() {
    jfmodalbox.removeClass('jfmodalbox_displayed')
    // jfmodalboxOverlay.removeClass('animated fadeIn');
    // jfmodalboxContent.removeClass('animated bounceIn');
}

function displayModal() {
    jfmodalbox.addClass('jfmodalbox_displayed')
    // jfmodalboxOverlay.addClass('animated fadeIn');
    // jfmodalboxContent.addClass('animated bounceIn');
}

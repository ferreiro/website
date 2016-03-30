var openModalBox = $('.openModalBox');
var jfmodalbox = $('.jfmodalbox');
var jfmodalboxOverlay = $('.jfmodalbox_overlay');
var jfmodalboxContent = $('.jfmodalbox_content');
var jfmodalboxClose = $('.jfmodalbox_close');

jfmodalboxOverlay.click(function() {
  if (jfmodalbox.hasClass('jfmodalbox_displayed'))
    closeModal();
  else
    displayModal();
});

openModalBox.click(function() {
  if (jfmodalbox.hasClass('jfmodalbox_displayed'))
    closeModal();
  else
    displayModal();
});

jfmodalboxClose.click(function() {
  closeModal();
});

function closeModal() {
  jfmodalbox.removeClass('jfmodalbox_displayed');
  // jfmodalboxOverlay.removeClass('animated fadeIn');
  // jfmodalboxContent.removeClass('animated bounceIn');
}

function displayModal() {
  jfmodalbox.addClass('jfmodalbox_displayed');
  // jfmodalboxOverlay.addClass('animated fadeIn');
  // jfmodalboxContent.addClass('animated bounceIn');
}

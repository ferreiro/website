setupPopup()

function setupPopup() {
  const popup = $('.popup')
  const popupClose = $('.popup__close')
  const popupBackground = $('.popup__background')
  const popupWrapper = $('.popup__wrapper')
  const poupTimeoutMs = 2000

  if (popup.length === 0) {
    return; // popup not defined
  }

  displayPopupWithDelay(popup, popupBackground, popupWrapper, {
    timeoutMs: poupTimeoutMs
  })

  setupEscape(popup, popupBackground, popupWrapper)

  popupClose.click(function (event) {
    event.preventDefault()
    closePopup(popup, popupBackground, popupWrapper)
  })

  popupBackground.click(function (event) {
    closePopup(popup, popupBackground, popupWrapper)
  })
}

function displayPopupWithDelay (popup, popupBackground, popupWrapper, opts) {
  const timeoutMs = opts && opts.timeoutMs ? opts.timeoutMs : 10000
  setTimeout(function () {
    showPopup(popup, popupBackground, popupWrapper)
  }, timeoutMs)
}

function showPopup(popup, popupBackground, popupWrapper) {
  $('body').css({
    overflow: 'hidden'
  })
  popup
    .fadeIn(500)
    .addClass('animated fadeInUpBig')
  popupBackground
    .show(0)
    .addClass('animated fadeIn')
}

function closePopup(popup, popupBackground, popupWrapper) {
  $('body').css({
    overflow: 'initial'
  })
  popup
    .addClass('animated fadeOutDown')
    .fadeOut(500)
}

function setupEscape (popup, popupBackground, popupWrapper) {
  $(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
      closePopup(popup, popupBackground, popupWrapper)
    }
  })
}
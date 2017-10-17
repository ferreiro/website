setupPopup()

function setupPopup() {
  const popup = $('.popup')
  const popupClose = $('.popup__close')
  const popupBackground = $('.popup__background')
  const popupWrapper = $('.popup__wrapper')
  const poupTimeoutMs = 60000

  if (popup.length === 0) {
    return; // popup not defined
  }

  const autodisplay = popup.find('.autodisplay')
  if (autodisplay.val() === "false") {
    // Skip and don't autodisplay newsletter
  } else {
    // Only autodisplay if the user has not subscribed in this browser
    if (!localStorage.newsletterSubscribed || localStorage.userSubscribed === false) {
      displayPopupWithDelay(popup, popupBackground, popupWrapper, {
        timeoutMs: poupTimeoutMs
      })
    }
  }

  setupOpenNewsletterPopup(popup, popupBackground, popupWrapper)

  setupEscape(popup, popupBackground, popupWrapper)

  popupClose.click(function (event) {
    event.preventDefault()
    closePopup(popup, popupBackground, popupWrapper)
  })

  popupBackground.click(function (event) {
    closePopup(popup, popupBackground, popupWrapper)
  })
}

function setupOpenNewsletterPopup (popup, popupBackground, popupWrapper) {
  const button = $('.openNewsletterSubscription')
  button.click(function (event) {
    event.preventDefault()
    showPopup(popup, popupBackground, popupWrapper)
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
    .removeClass('animated fadeInUpBig fadeOutDown')
    .addClass('animated fadeInUpBig')
    .fadeIn(500)

  // Autofocus on the first input
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // no autofocus.
  } else {
    popup.find('*').filter(':input:visible:first').focus()
  }

  /*popupBackground
    .show(0)
    .removeClass('animated fadeIn')
    .addClass('animated fadeIn')
    */
}

function closePopup(popup, popupBackground, popupWrapper) {
  $('body').css({
    overflow: 'initial'
  })
  popup
    .removeClass('animated fadeInUpBig fadeOutDown')
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
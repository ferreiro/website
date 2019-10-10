// Delay
const POPUP_DELAY_MS = 100000 // One minute and twenty seconds

setupPopup()

function setupPopup() {
    const popup = $('.popup')
    const popupClose = $('.popup__close')
    const popupBackground = $('.popup__background')
    const popupWrapper = $('.popup__wrapper')

    if (popup.length === 0) {
        return // popup not defined
    }

    const autodisplay = popup.find('.autodisplay')
    if (autodisplay.val() === 'false') {
    // Skip and don't autodisplay newsletter
    } else {
    // Only autodisplay if the user has not subscribed in this browser
        if (!localStorage.userSubscribed || localStorage.userSubscribed === 'false') {
            setTimeout(() => {
                showPopup(popup, popupBackground, popupWrapper)
            }, POPUP_DELAY_MS)
            // setupScrollEvents(popup, popupBackground, popupWrapper)
        }
    }

    setupOpenNewsletterPopup(popup, popupBackground, popupWrapper)

    setupEscape(popup, popupBackground, popupWrapper)

    popupClose.click(function (event) {
        event.preventDefault()
        closePopup(popup, popupBackground, popupWrapper)
    })

    popupBackground.click(function () {
        closePopup(popup, popupBackground, popupWrapper)
    })
}

function setupOpenNewsletterPopup (popup, popupBackground, popupWrapper) {
    const button = $('.openNewsletterSubscription')
    button.click(function (event) {
        event.preventDefault()
        showPopup(popup, popupBackground, popupWrapper)
    })
}

// function setupScrollEvents (popup, popupBackground, popupWrapper) {
//     const breakpointItem = $('#showNewsletterBreakPoint')
//     let popup_displayed = false

//     if (breakpointItem.length === 0) {
//         return // skip.
//     }

//     $(window).scroll(function() {
//         const scrollTop = $(window).scrollTop()
//         const offset = getScrollOffset()

//         if (isScrollCloseToItem(scrollTop, breakpointItem, offset)) {
//             if (!popup_displayed) {
//                 showPopup(popup, popupBackground, popupWrapper)
//                 popup_displayed = true
//             }
//         }
//     })
// }

// function getScrollOffset () {
//     // We want to make our divs to appear when scroll on 70% of the screen
//     // meaning the item has seen 30%. How is this calculated?
//     // 100% --> $(window).height()
//     // 70%  --> X
//     return ($(window).height() * 85) / 100
// }

// offset makes the object to appear before in the screen
// function isScrollCloseToItem (scrollTop, item, offset) {
//     const targetOffsetY = item.offset().top
//     return scrollTop - (targetOffsetY - offset) > 0
// }

// function displayPopupWithDelay (popup, popupBackground, popupWrapper, opts) {
//     const timeoutMs = opts && opts.timeoutMs ? opts.timeoutMs : 10000
//     setTimeout(function () {
//         showPopup(popup, popupBackground, popupWrapper)
//     }, timeoutMs)
// }

function showPopup(popup) {
    $('body').css({
    // overflow: 'hidden'
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
}

function closePopup(popup) {
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

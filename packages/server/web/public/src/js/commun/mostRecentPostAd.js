$(window).on('load', function () {
  setupMostRecentPostAd()
})

function setupMostRecentPostAd () {
  const mostRecentPostAd = $('.mostRecentPostAd')
  const cacheName = 'mostRecentPostAd'

  if (mostRecentPostAd.length <= 0) {
    // Don't execute if the ad is not found on the webpage
    return;
  }

  delayDisplayTime().then(sucess => {
    if (!hasUserClickedOnMostRecentPostAd(mostRecentPostAd, cacheName)) {
      const offset = '50px'
      moveContainersAndMenu(offset, () => {
        displayMostRecentPostAd(mostRecentPostAd)
      })
    }

    setupScrollListener(mostRecentPostAd, cacheName)
    setupAdClickListener(mostRecentPostAd, cacheName)
  })
}

function setupScrollListener(mostRecentPostAd, cacheName) {
  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop()

    // If user make scrolls, display ad.
    if (scrollTop > 100) {}
  })
}


/**
 * User has clicked on most recent post ad
 * if previously has clicked on the most
 * recent post ad (and we have cached it)
 * and the most recent post ad is different
 * from the one the user has already clicked.
 */
function hasUserClickedOnMostRecentPostAd (mostRecentPostAd, cacheName) {
  const lastPostId = mostRecentPostAd.find('.lastPostId').val()

  if (lastPostId && lastPostId === localStorage[cacheName + '_lastPostIdShown']) {
    return localStorage[cacheName + '_clicked']
  }

  return false
}

function setupAdClickListener (mostRecentPostAd, cacheName) {
  mostRecentPostAd.click(function (event) {
    localStorage[cacheName + '_clicked'] = true
    localStorage[cacheName + '_lastPostIdShown'] = mostRecentPostAd.find('.lastPostId').val()
  })
}

function delayDisplayTime () {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(true)
    }, 1500)
  })
}

function moveContainersAndMenu (offset, next) {
  $('#menu').css({ top: isMobileMenuShown() ? 0 : offset })
  $('.container').css({ 'padding-top': offset }).promise().done(function () {
    return next()
  })
}

function isMobileMenuShown () {
  const mobileMenu = $('.jfmenu')
  return mobileMenu.length > 0 && mobileMenu.hasClass('jfmenu_displayed')
}

function displayMostRecentPostAd (mostRecentPostAd) {
  mostRecentPostAd
    .show(0)
    // .addClass('animated slideInDown')
    .slideDown('500')
}
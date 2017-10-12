$(document).ready(function () {
  setupMostRecentPostAd()
})


async function setupMostRecentPostAd () {
  const mostRecentPostAd = $('.mostRecentPostAd')
  const cacheName = 'mostRecentPostAd'

  var _  = await delayDisplayTime()

  if (!hasUserClickedOnMostRecentPostAd(mostRecentPostAd, cacheName)) {
    displayMostRecentPostAd(mostRecentPostAd)
  }

  setupScrollListener(mostRecentPostAd, cacheName)
  setupAdClickListener(mostRecentPostAd, cacheName)
}

function setupScrollListener(mostRecentPostAd, cacheName) {
  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop()

    // If user make scrolls, display ad.
    if (scrollTop > 100) {
      
    }
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
    }, 2000)
  })
}

function displayMostRecentPostAd (mostRecentPostAd) {
  mostRecentPostAd
    .show(100)
    .addClass('animated fadeIn bounceIn')
}
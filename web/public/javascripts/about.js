setupAbout()

function setupAbout() {
  setupScrollEvents()
  displayBiography()
}

function setupScrollEvents () {
  const education = $('#education')
  const experience = $('#experience')
  const aboutActions = $('#aboutActions')

  const itemDisplayedClass = 'timeline__entries__displayed'

  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop()
    const offset = getScrollOffset()

    if (isScrollCloseToItem(scrollTop, education, offset)) {
      displayTimelineItem(education, itemDisplayedClass)
    }
    if (isScrollCloseToItem(scrollTop, experience, offset)) {
      displayTimelineItem(experience, itemDisplayedClass)
    }
    if (isScrollCloseToItem(scrollTop, aboutActions, offset)) {
      displayTimelineItem(aboutActions, itemDisplayedClass, 'fadeIn')
    }
  })
}

function getScrollOffset () {
  // We want to make our divs to appear when scroll on 70% of the screen
  // meaning the item has seen 30%. How is this calculated?
  // 100% --> $(window).height()
  // 70%  --> X
  return ($(window).height() * 85) / 100
}

// offset makes the object to appear before in the screen
function isScrollCloseToItem (scrollTop, item, offset) {
  const targetOffsetY = item.offset().top
  return scrollTop - (targetOffsetY - offset) > 0
}

function displayTimelineItem (itemSelector, displayedClass, animationCss) {
  const animationStyle = animationCss ? 'animated ' + animationCss : 'animated fadeInUp'
  itemSelector
    .addClass(displayedClass)
    .addClass(animationStyle)
}

async function displayBiography () {
  const photo = $('.about_bio__large__left_v2')
  const texts = $('.about_bio__large__bio')

  hideContent([ photo, texts ])

  var _ = await waitBeforeAnimation()
  displayPhoto(photo)

  var _ = await waitBeforeAnimation()
  displayBiographyTexts(texts)

  return 0
}

function hideContent (contents) {
  contents.forEach(function (selector) {
    selector.css({ opacity: 0 })
  })
}

function displayPhoto (photo) {
  setTimeout(function () {
    photo
      .css({ opacity: 1 })
      .addClass('animated fadeInRight')
  }, 500)
}

async function displayBiographyTexts(bioTexts) {
    var lastDisplayedItem = 0
    var delayTime = 200
    $.each(bioTexts, function (index, textSelector) {
      delayTime += 400
      setTimeout(() => {
        $(textSelector)
          .css({
            opacity: 1
          })
          .addClass('animated fadeInUp')
      }, delayTime)
    })
}

function waitBeforeAnimation () {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(true)
    }, 500)
  })
}
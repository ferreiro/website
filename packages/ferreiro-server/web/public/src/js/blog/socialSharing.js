setupSocialButtons()
setupScrollListener()

function setupSocialButtons () {
    const url = encodeURIComponent(window.location)
    const title = $('.blogPost__title').text()
    const summary = $('.blogPost__subtitle').text()

    setupTwitterButton(url, title, summary)
    setupLinkedinButton(url, title, summary)
}

function setupTwitterButton (url, title, summary) {
    const twitterShareButton = $('.tweetShare')

    twitterShareButton.click(function (event) {
        event.preventDefault()

        const twitterShareUrl = 'https://twitter.com/share?text=👓 ' + title + ' &via=jgferreiro&url=' + url
        window.open(twitterShareUrl, 'Share on Twitter', 'width=500px,height=250px;')
    })
}

function setupLinkedinButton (url, title, summary) {
    const linkedinShareButton = $('.linkedinShare')

    linkedinShareButton.click(function (event) {
        event.preventDefault()

        const mini = true
        const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=${mini}&url=${url}&title=${title}&summary=${summary}&source=LinkedIn`
        window.open(linkedinShareUrl, 'Share on Twitter', 'width=500px,height=250px;')
    })
}

function setupScrollListener () {
    const offsetFromBreakPoint = 300
    const headerHeight = $('.menu').outerHeight()
    const targetContainer = $('#socialSharingBreakpoint')
    const targetHeader = $('#blogHeader')
    const targetFooter = $('#postFooter')
    const socialSharing = $('#socialSharing')

    if (targetContainer.length === 0) {
        return // skip if container does not exist
    }

    $(window).scroll(function() {
        const currentScroll = $(window).scrollTop()
        const targetPositionY = targetContainer.offset().top
        const targetSocialOffsetY = socialSharing.offset().top
        const targetFooterOffsetY = targetFooter.offset().top

        // Remove sticky block when footer is reached
        if (targetSocialOffsetY - targetFooterOffsetY + offsetFromBreakPoint >= 0) {
            hideSocialSharing()
            displayEmergentSharing()
        } else if (currentScroll > targetPositionY) {
            displaySocialSharing()
        } else {
            hideSocialSharing()
        }
    })
}

function displayEmergentSharing () {
    const sharePostEmergent = $('#sharePostEmergent')
    sharePostEmergent.show(0, () => {
        sharePostEmergent.addClass('animated pulse')
    })
}

function displaySocialSharing () {
    const socialSharing = $('#socialSharing')
    socialSharing.addClass('socialSharing__displayed')
}

function hideSocialSharing () {
    const socialSharing = $('#socialSharing')
    socialSharing.removeClass('socialSharing__displayed')
}

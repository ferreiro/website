setupSocialButtons()
setupScrollListener()

function setupSocialButtons() {
    const url = encodeURIComponent(window.location)
    const title = $('.blogPost__title').text()
    const summary = $('.blogPost__subtitle').text()

    setupTwitterButton(url, title, summary)
    setupLinkedinButton(url, title, summary)
}

function setupTwitterButton (url, title, summary) {
    const twitterShareButton = $('#tweetShare')
    twitterShareButton.click(function (event) {
        event.preventDefault()

        const twitterShareUrl = "https://twitter.com/share?text=👓 " + title + " &via=jgferreiro&url=" + url
        window.open(twitterShareUrl, "Share on Twitter", "width=500px,height=250px;");
    })
}

function setupLinkedinButton (url, title, summary) {
    const linkedinShareButton = $('#linkedinShare')
    linkedinShareButton.click(function (event) {
        event.preventDefault();

        const mini = true
        const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=${mini}&url=${url}&title=${title}&summary=${summary}&source=LinkedIn`
        window.open(linkedinShareUrl, "Share on Twitter", "width=500px,height=250px;");
    })
}

function setupScrollListener () {
    const headerHeight = $('.menu').outerHeight()
    const targetContainer = $('#mainContainer')
    const targetHeader = $('#blogHeader')
    const targetFooter = $('#relatedPosts')
    const socialSharing = $('#socialSharing')

    $(window).scroll(function() {
        const currentScroll = $(window).scrollTop() + headerHeight
        const targetPositionY = targetContainer.position().top
        const targetSocialOffsetY = socialSharing.offset().top
        const targetFooterOffsetY = targetFooter.offset().top

        // Remove sticky block when footer is reached
        if (targetSocialOffsetY - targetFooterOffsetY > 0) {
            hideSocialSharing()
        } else if (currentScroll > targetPositionY) {
            displaySocialSharing()
        } else {
            hideSocialSharing()
        }
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

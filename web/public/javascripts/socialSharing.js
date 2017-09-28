setupSocialButtons()
setupScrollListener()

function setupSocialButtons() {
    const postTitle = $('.blogPost__title').text()

    const twitterShareButton = $('#tweetShare')    
    twitterShareButton.click(function (event) {
        event.preventDefault();

        var url = window.location;
        window.open("https://twitter.com/share?text=👓 " + postTitle + " &via=jgferreiro&url="+encodeURIComponent(url), "Share on Twitter", "width=500px,height=250px;");
    })

    const facebookShareButton = $('#facebookShare')    
    facebookShareButton.click(function (event) {
        event.preventDefault();

        var url = window.location;

        var sharingUrl = "https://www.facebook.com/dialog/feed?"
        sharingUrl += "app_id=1677477615658040"
        sharingUrl += "&display=popup&amp;caption=An%20example%20caption"
        sharingUrl += "&link=" + url
        sharingUrl += "&redirect_uri=" + url

        window.open(sharingUrl, "Share on Facebook", "width=500px,height=500px;");
    })
}


function setupScrollListener () {
    const headerHeight = $('.menu').outerHeight()
    const targetContainer = $('#mainContainer')
    const targetHeader = $('#blogHeader')
    const targetFooter = $('#footer')
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
        console.log('Current Scroll ' + currentScroll + ' | ' + 'targetOffsetY: ' + targetOffsetY)
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


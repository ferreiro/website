let alreadyLoadedCommments = false

const commentsPannel = $('.comments-pannel');
const commentsPannelOverlay = $('.comments-pannel__overlay');

const closeCommentsPannelButton = $('.comments-pannel__close');
const openCommentsPannelButton = $('.open-comments-pannel')

openCommentsPannelButton.click(handleOpenCommentsPannel);
closeCommentsPannelButton.click(handleCloseCommentsPannel);
commentsPannelOverlay.click(handleCloseCommentsPannel);

function handleOpenCommentsPannel (event) {
    event.preventDefault();

    commentsPannel.addClass('comments-pannel-displayed')
    commentsPannelOverlay.addClass('comments-pannel__overlay-displayed')

    if (alreadyLoadedCommments === false) {
        alreadyLoadedCommments = true
        launchComments();
    }
}

function handleCloseCommentsPannel (event) {
    event.preventDefault();
    commentsPannel.removeClass('comments-pannel-displayed')
    commentsPannelOverlay.removeClass('comments-pannel__overlay-displayed')
}

/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
var disqus_config = function () {
    var PAGE_URL = document.getElementById('canonicalUrl').value
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable

    var PAGE_IDENTIFIER = document.getElementById('postIdentifier').value
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

var launchComments = function () {
    // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://ferreiro-1.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
}
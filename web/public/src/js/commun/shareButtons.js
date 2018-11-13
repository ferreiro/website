const shareLinkedinButton = $('.shareLinkedinButton')

shareLinkedinButton.click((event) => {
    event.preventDefault();

    const blogUrl = $(event.target).parent().find('.blogUrl').val()
    const summary = $(event.target).parent().find('.summary').val()
    const title = $(event.target).parent().find('.title').val()
    
    const mini = true
    const url = `https://www.ferreiro.me/blog/${blogUrl}`
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=${mini}&url=${url}&title=${title}&summary=${summary}&source=LinkedIn`

    window.open(linkedinShareUrl, "Share on Twitter", "width=550px,height=450px;");
});

const shareTwitterButton = $('.shareTwitterButton')

shareTwitterButton.click((event) => {
    event.preventDefault();

    const blogUrl = $(event.target).parent().find('.blogUrl').val()
    const title = $(event.target).parent().find('.title').val()
    const url = `https://www.ferreiro.me/blog/${blogUrl}`

    const twitterShareUrl = `https://twitter.com/share?text=👓 ${title}&via=jgferreiro&url=${url}`
    window.open(twitterShareUrl, "Share on Twitter", "width=600px,height=350px;");
});

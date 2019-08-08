function replaceEmail() {
    var emails = $('.email')

    emails.each(function() {
        var email = $(this)
        var emailText = email.text()
        var emailFormated = emailText.replace(' AT ', '@').replace(' DOT ', '.')

        $('.email').html(emailFormated)
    })

}

replaceEmail()

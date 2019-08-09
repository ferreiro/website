var form = $('.contact_form')
var loader = $('#contactLoader')
// var formSubmitButton = $('#formSendButton')
// var formValidInputs = [] // Array of bools that has length of tototal inputs in the site
var success = $('.contact_form_success')
var failure = $('.contact_form_failure')

form.submit(function(event){
    event.preventDefault() // Stop change webpage

    let endpoint = null
    if ($('#contactFormEndpoint').length > 0) {
        endpoint = $('#contactFormEndpoint').val()
    }

    let scrollToError = null
    if (form.find('.scrollToError').length > 0) {
        scrollToError = form.find('.scrollToError').val()
    }

    submitForm({
        endpoint,
        scrollToError: scrollToError
    })
})

function submitForm(opts) {
    var endpoint = opts && opts.endpoint ? opts.endpoint : '/api/v1/contact'
    var scrollToError = opts && opts.scrollToError ? opts.scrollToError === 'true' : true

    success.hide()
    failure.hide()

    if (!validateInputs()) {
        if (scrollToError === true) {
            $('html, body').animate({
                scrollTop: $('#contactform').offset().top - 120
            }, 300)
        }
        return
    }

    form.hide()
    loader.show()

    var newsletterChecked = ($('.newsletter:checked').length) > 0

    var contactForm = {
        __name: $('#the_name').val(),
        __email: $('#email').val(),
        __msg: $('#message').val(),
        __source: $('#source').val(),
        __subscribed: newsletterChecked
    }

    $.ajax({
        url: endpoint,
        data: contactForm,
        type: 'POST',
        dataType: 'json',
        encode: true
    })
        .done(function(response) {
            if (response.error) {
                form.show()
                failure.html(response.error)
                failure.show()
            } else {
                form.hide()
                success.show()
                if (endpoint.indexOf('subscribe') >= 0) {
                    setCacheUserSubscribed()
                }
            }
        })
        .fail(function() {
            failure.show()
        })
        .always(function() {
            loader.hide()
        })

    // try {}
    // catch(err) {
    //     failure.show()
    //     loader.hide()
    // }
}

function setCacheUserSubscribed () {
    localStorage.userSubscribed = true
}

function validateInputs() {
    var input_not_blank = $('.input_not_blank')
    var input_email = $('.input_email')
    var userEmail = input_email.val()
    var valid = true

    $('input').removeClass('wrongInput') // Hide previous messages
    $('textarea').removeClass('wrongInput') // Hide previous messages
    $('.wrong').hide(0) // Hide previous messages

    // Check the email
    valid &= validEmail(userEmail)

    if (!valid) {
        $('#wrongEmail').show()
        $('#contactform input[name=__email]').addClass('wrongInput')
    }

    // Check fields that can not be empty
    input_not_blank.each(function() {
        var aValue = $(this).val()
        valid &= notEmpty(aValue)
        if (! notEmpty(aValue)) {
            if (this.id == 'the_name') {
                $('#wrongName').show()
                $('#contactform input[name=__name]').addClass('wrongInput')
            }
            if (this.id == 'message') {
                $('#wrongMessage').show()
                $('#contactform textarea[name=__text]').addClass('wrongInput')
            }
        }
    })

    return valid
}

function notEmpty(text) {
    return text.length > 0
}

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    return re.test(email)
}

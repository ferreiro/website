const form = $('#createPostForm')
const loader = $('#createPostLoader')
// const formSubmitButton = $('#formSendButton')
// const formValidInputs = [] // Array of bools that has length of tototal inputs in the site
const success = $('#successPostCreate')
const failure = $('#errorPostCreate')

form.submit(function (event) {
    event.preventDefault() // Stop change webpage

    let endpoint = null
    if (form.length > 0) {
        endpoint = form.attr('action').valueOf()
    }
    submitForm(endpoint)
})

const submitForm = (url = '/admin/create') => {
    const type = 'POST'
    const dataType = 'json'
    const data = getFormData()
    const encode = true

    success.hide()
    failure.hide()
    loader.show()

    $.ajax({url, data, type, dataType, encode})
        .done(function (data) {
            loader.fadeOut(1000, function () {
                if (data.error) {
                    displayFailure(data)
                } else {
                    displaySuccess(data)
                }
            })
        })
        .fail(function (data) {
            loader.fadeOut(1000, function () {
                displayFailure(data)
            })
        })
        .always(function () {
            form.show()
        })
}

const getFormData = () => {
    return $(form).serializeArray()
}

const displaySuccess = (data) => {
    success.find('span').html(`Post created!<br ><a href="/blog/${data.post.permalink}" target="_blank">See it here</a>`)
    success.show()
}

const displayFailure = (data) => {
    failure.find('span').html(data.error)
    failure.fadeIn(data)
    setTimeout(function () {
        failure.fadeOut(300)
    }, 3000)
}

// const validateInputs = () => {
//     var input_not_blank = $('.input_not_blank')
//     var input_email = $('.input_email')
//     var userEmail = input_email.val()
//     var valid = true

//     $('.wrong').hide(0) // Hide previous messages

//     // Check the email
//     valid &= validEmail(userEmail)

//     if (!valid) {
//         $('#wrongEmail').show()
//     }

//     // Check fields that can not be empty
//     input_not_blank.each(function () {
//         var aValue = $(this).val()
//         valid &= notEmpty(aValue)
//         if (!notEmpty(aValue)) {
//             if (this.id == 'the_name') {
//                 $('#wrongName').show()
//             }
//             if (this.id == 'message') {
//                 $('#wrongMessage').show()
//             }
//         }
//     })

//     return valid
// }

// const notEmpty = (text) => {
//     return text.length > 0
// }

// const validEmail = (email) => {
//     var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
//     return re.test(email)
// }

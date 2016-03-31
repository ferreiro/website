var form = $('.contact_form');
var formSubmitButton = $('#formSendButton');
var formValidInputs = []; // Array of bools that has length of tototal inputs in the site
// 
// setInterval(function() {
//   var validInputs = validateInputs();
//   if (validInputs) {
//     formSubmitButton.removeClass('contact_form_fieldset_submit_disabled');
//   }
//   else {
//     formSubmitButton.addClass('contact_form_fieldset_submit_disabled');
//   }
// }, 1);

form.submit(function(event){
    event.preventDefault(); // Stop change webpage
    submitForm();
});

function submitForm() {
  var base = "";
  var loader = $('.loader');
  var end_point = "contact/send";
  var url = base + end_point;

  $('.success').hide();
  $('.failure').hide();

  if (!validateInputs()) {
    $('html, body').animate({
        scrollTop: $('#contactform').offset().top
    }, 300);

    return;
  }

  if (loader) {
     $('.loader').show();
  }

  newsletterChecked = ($(".newsletter:checked").length) > 0;

  contactForm = {
    contact_name: $('#the_name').val(),
    contact_email: $('#email').val(),
    contact_msg: $('#message').val(),
    contact_newsletter: newsletterChecked
  };

  $.ajax({
     url: url,
     data: contactForm,
     type: 'POST',
     dataType: 'json',
     encode: true
  })
  .done(function(objectReturned) {
    sent = objectReturned.data.sent;
    valid = objectReturned.data.valid;

    $('.loader').hide();

    if (!sent || !valid) {
      $('.failure').show();
    }
    else {
      form.hide();
      $('.success').show();
    }

  })
  .fail(function(objectReturned) {

  })
  .always(function(objectReturned) {
    $('.loader').hide();
  });

  try {

  }
  catch(err) {
    $('.failure').show();
    $('.loader').hide();
    console.log(err.message);
  }
}

function validateInputs() {
  var input_not_blank = $('.input_not_blank');
  var input_email = $('.input_email');
  var userEmail = input_email.val();
  var valid = true;

  $('.wrong').hide(0); // Hide previous messages

  // Check the email
  valid &= validEmail(userEmail);

  if (!valid) {
    $('#wrongEmail').show();
  }

  // Check fields that can not be empty
  input_not_blank.each(function() {
    var aValue = $(this).val();
    valid &= notEmpty(aValue);
    if (! notEmpty(aValue)) {
      if (this.id == "the_name") {
        $('#wrongName').show();
      }
      if (this.id == "message") {
        $('#wrongMessage').show();
      }
    }
  });

  return valid;
}

function notEmpty(text) {
    return text.length > 0;
}

function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

var form = $('.contact-form');

form.submit(function(event){
    event.preventDefault(); // Stop change webpage
    submitForm();
});

function submitForm() {
  var base = ""
  var end_point = "/contact/send";
  var url = base + end_point;

  $('.success').hide();
  $('.failure').hide();

  if (!validateInputs()) {
    return;
  }

  msg = {
    contact_name: $('#the_name').val(),
    contact_email: $('#email').val(),
    contact_msg: $('#message').val()
  };

  $.ajax({
     url: url,
     data: msg,
     type: 'POST',
     dataType: 'json',
     encode: true
  })
  .done(function(objectReturned) {
    sent = objectReturned.data.sent;
    valid = objectReturned.data.valid;

    if (!sent || !valid) {
      $('.failure').show();
    }
    else {
      $('.success').show();
    }

  })
  .fail(function(objectReturned) {

  })
  .always(function(objectReturned) {

  });

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

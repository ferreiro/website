$(function() {
  var betaToken = $('#betaToken').val()

  $('a').each(function() {
    var href = $(this).attr('href');
    var querystring = '?beta=true&token=' + betaToken

    if (href) {
        // href += (href.match(/\?/) ? '&' : '?') + querystring;
        $(this).attr('href', href + querystring)
    }
  })
})
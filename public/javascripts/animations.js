var menu = $('.menu');
var footer = $('footer');

function animate_about() {
    var about = $('.about');

    if (menu.length) {
      menu.addClass('animated fadeInDownBig');
      footer.hide(0).delay(1200).show(0);
    }
    if (about.length) {
      about.hide(0).delay(900).show(0).addClass('animated fadeInUp');
    }


}

$(document).ready(function(){
  animate_about();
  // animate_menu();
  // animate_about();
});


/// HOME ///
// Check if the div is in the window.
//
// function animate_about() {
//
//   var h1 = $('h1');
//   var h2 = $('h2');
//   var h3 = $('h3');
//   var tags = $('.tags');
//   var footer = $('footer');
//
//   h1.hide();
//   h2.hide();
//   h3.hide();
//   tags.hide();
//   footer.hide();
//
//
//
//     $.each( h1, function(key, value) {
//       $(this).hide(0).delay(200*(key+1)).show(0).addClass('animated fadeInUp');
//     });
//
//     $.each( h2, function(key, value) {
//       $(this).hide(0).delay(200*(key+2)).show(0).addClass('animated fadeInUp');
//     });
//
//     $.each( h3, function(key, value) {
//       $(this).hide(0).delay(200*(key+3)).show(0).addClass('animated fadeInUp');
//     });
//
//         $.each( tags, function(key, value) {
//           $(this).hide(0).delay(200*(key+4)).show(0).addClass('animated fadeInUp');
//         });
//             $.each( footer, function(key, value) {
//               $(this).hide(0).delay(200*(key+5)).show(0).addClass('animated fadeInUp');
//             });
// }

//
// function animate_menu() {
//   var menu = $('.menu');
//
//   if (menu.length) {
//     menu.addClass('animated fadeInDownBig');
//   }
//
// }
//
// function animate_about() {
//   var about = $('.about');
//   if (about.length) {
//     about.delay(2000);
//     $('h1').addClass('animated fadeInUp');
//     about.addClass('animated fadeInUp');
//   }
// }

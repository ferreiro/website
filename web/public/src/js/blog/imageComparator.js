jQuery(document).ready(function($){
  // Wait until all images are loaded
  // So the image comparator can calculate
  // correctly the height
  $(window).load(function () {
    setupImageComparator()
  })
});

function setupImageComparator () {
  const imageComparator = $('.compare')

  imageComparator.each(function () {
    const comparator = $(this)

    const images = comparator.find('img')
    const imageBefore = images[0].src
    const imageAfter = images[1].src

    // Create new imageComparator HTML entity
    const newComparatorHtml = comparatorTemplate(imageBefore, imageAfter)
    comparator.html(newComparatorHtml)

    // Delay the creation of comparator
    // So the height is well calculated.
    // Initiate the comparators
    $(".imageComparator__int").twentytwenty({
      // default_offset_pct: 0.7,
      orientation: 'horizontal'
    });
  })
}

function comparatorTemplate (imageA, imageB) {
  return `
  <div class="imageComparator">
    <div class="imageComparator__int">
      <img src="${imageA}" />
      <img src="${imageB}" />
    </div>
  </div>
  `
}
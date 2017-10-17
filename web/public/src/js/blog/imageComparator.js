jQuery(document).ready(function($){
  setupImageComparator()
});

function setupImageComparator () {
  const imageComparator = $('.compare')

  imageComparator.each(function () {
    const comparator = $(this)

    const images = comparator.find('img')
    const imageBefore = images[0].src
    const imageAfter = images[1].src

    // Create new html
    const newComparatorHtml = comparatorTemplate(imageBefore, imageAfter)
    comparator.html(newComparatorHtml)

    // Initiate the comparators
    $(".imageComparator__int").twentytwenty({
      // default_offset_pct: 0.7,
      orientation: 'horizontal'
    });
  })
}

const comparatorTemplate = function (imageA, imageB) {
  return `
  <div class="imageComparator">
    <div class="imageComparator__int">
      <img src="${imageA}" />
      <img src="${imageB}" />
    </div>
  </div>
  `
}
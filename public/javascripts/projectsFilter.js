var projectsFilterButton = $('#projectsFilter_button')
var projectsFilterList = $('#projectsFilter_list')

projectsFilterButton.click(function(event) {
  var e = $(this)
  projectsFilterList.fadeToggle(0)
})

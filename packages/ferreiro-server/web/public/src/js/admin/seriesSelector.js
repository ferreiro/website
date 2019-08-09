class SeriesSelector {
    constructor (data) {
        this.selector = $(data.selector)
        this.currentItem = $(data.currentItem)
        this.currentTitle = $(data.currentTitle)
        this.currentPic = $(data.currentPic)
        this.currentId = $(data.currentId)
        this.dropdownButton = $(data.dropdownButton)
        this.dropdown = $(data.dropdown)
        this.dropdownList = $(data.dropdownList)
        this.dropdownLoader = $(data.dropdownLoader)
        this.dropdownRefreshButton = $(data.dropdownRefreshButton)

        this.fetchDataApi = data.fetchDataApi
        this.dropdownItemClassName = data.dropdownItemClassName
    }

    initialize () {
        this.setupClickEvents()
    }

    setupClickEvents () {
        this.setupOpenDropdown()
        this.setupRefreshDropdown()
    }

    setupOpenDropdown () {
        const that = this

        this.dropdownButton.click(() => {
            if (that.dropdown.is(':visible')) {
                that.hideDropdown()
            } else {
                that.showDropdown()
                that.updateDropdown()
            }
        })
    }

    setupRefreshDropdown () {
        const that = this

        this.dropdownRefreshButton.click((event) => {
            event.preventDefault()
            that.updateDropdown()
        })
    }

    updateDropdown () {
        this.showLoader()
        this.fetchSeriesFromApi()
            .then(series => {
                this.updateDropdownList(series)
            })
            .catch(error => window.alert('Can\'t fetch data from API' + error))
            .finally(this.hideLoader())
    }

    updateDropdownList (series) {
        const dropdownHtml = this.generateDropdownListHtml(series)
        this.dropdownList.html(dropdownHtml)

        this.setupEventsOnDropdownList()
    }

    fetchSeriesFromApi () {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.fetchDataApi,
                type: 'GET',
                dataType: 'json'
            })
                .done(function (response) {
                    resolve(response)
                })
                .fail(function (error) {
                    reject(error)
                })
        })
    }

    generateDropdownListHtml (series) {
        let dropdownListHtml = ''

        // Generate no-selection option
        dropdownListHtml += this.generateSeriesHtml({
            _id: '',
            favicon: '',
            title: 'No Selection'
        })

        const that = this
        series.forEach(singleSeries => {
            dropdownListHtml += that.generateSeriesHtml(singleSeries)
        })

        return dropdownListHtml
    }

    generateSeriesHtml (singleSeries) {
        const favicon = singleSeries.favicon ? singleSeries.favicon : (singleSeries.pic ? singleSeries.pic : '')
        return `
        <div class="${this.dropdownItemClassName}">
            <div class="seriesSelector__dropdown__link"></div>
            <input class="seriesSelector__dropdown__id" type="text" value="${singleSeries._id}" name="selector_series_id">
            <div class="seriesSelector__dropdown__favicon" style="background-image: url(${favicon});"></div>
            <div class="seriesSelector__dropdown__text">${singleSeries.title}</div>
        </div>
    `
    }

    setupEventsOnDropdownList () {
        const that = this

        $('.' + this.dropdownItemClassName).click(event => {
            const seriesId = $(event.target).parent().find('.seriesSelector__dropdown__id').val()
            const seriesTitle = $(event.target).parent().find('.seriesSelector__dropdown__text').html()
            const seriesPic = $(event.target).parent()
                .find('.seriesSelector__dropdown__favicon')
                .css('background-image')  // https://stackoverflow.com/questions/8809876/can-i-get-divs-background-image-url
                // eslint-disable-next-line no-useless-escape
                .replace(/.*\s?url\([\'\"]?/, '')
                // eslint-disable-next-line no-useless-escape
                .replace(/[\'\"]?\).*/, '')

            that.updateCurrentId(seriesId)
            that.updateCurrentTitle(seriesTitle)
            that.updateCurrentPic(seriesPic)
            that.hideDropdown()
        })
    }

    showDropdown () {
        this.dropdown.show()
    }

    hideDropdown () {
        this.dropdown.hide()
    }

    showLoader () {
        this.dropdownLoader.show()
    }

    hideLoader () {
        this.dropdownLoader.hide()
    }

    updateCurrentId (newId) {
        this.currentId.val(newId)
    }

    updateCurrentTitle (newTitle) {
        this.currentTitle.html(newTitle)
    }

    updateCurrentPic (newPic) {
        this.currentPic.css('background-image', 'url(' + newPic + ')')
    }
}

const seriesSelector = new SeriesSelector({
    selector: '#seriesSelector',
    currentItem: '#seriesSelector__current',
    currentTitle: '#seriesSelector__currentName',
    currentPic: '#seriesSelector__currentPic',
    currentId: '#seriesSelector__currentId',
    dropdownButton: '.seriesSelector__openDropdown',
    dropdown: '#seriesSelector__dropdown',
    dropdownList: '#seriesSelector__list',
    dropdownLoader: '#seriesSelector__loader',
    dropdownRefreshButton: '#seriesSelector__refresh',

    fetchDataApi: '/api/v1/blog/series',
    dropdownItemClassName: 'seriesSelector__dropdown__item'
})

seriesSelector.initialize()

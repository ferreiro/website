setupDesktopMenu()
setupMobileMenu()

function setupDesktopMenu () {
    var menu = $('.menu__nav')

    menu.find('a').click(function(event) {
        var menuItem = $(this)

        // When click on current section.
        // Scroll to top.
        if (menuItem.hasClass('item-selected')) {
            if (menuItem.attr('id') !== 'blog') {
                event.preventDefault()

                // Add effect on current button
                menuItem
                    .addClass('animated rubberBand', function () {
                        $(this).removeClass('animated rubberBand')
                    })

                // Scroll page to top
                scrollTop({
                    position: 0,
                    speed: 300
                })
            }
        }
    })
}

function setupMobileMenu () {
    var body = $('body')
    var jfmenu = $('.jfmenu')
    var jfmenuContent = $('.jfmenu_content')
    var jfmenuOverlay = $('.jfmenu_overlay')
    var menuButton = $('.jfmenu__mobileButton')
    var header = $('#menu')

    $(window).resize(function(elem) {
        const deskstopScreen = 1100
        if ($(window).width() > deskstopScreen) {
            hideMenu()
        }
    })

    jfmenuOverlay.click(function() {
        if ($('.jfmenu').hasClass('jfmenu_displayed')) {
            hideMenu()
        }
    })

    // Actions: if click on a menu item which is the current section
    // hide the menu. If click on a item with a submenu, then open it.
    jfmenu.find('li').click(function(event) {
        var e = $(this)
        var submenu_list = e.find('ul')

        var hasClickedOnCurrentPage = e.hasClass('current_section')
        if (hasClickedOnCurrentPage) {
            event.preventDefault() // Don't open url again.
            hideMenu()
        }

        if (submenu_list.length > 0) {
            submenu_list.each(function() {
                var menu = $(this)
                menu.toggleClass('jfmenu_displayed') // Display the submenu
            })
        }
    })


    menuButton.click(function() {
        var e = $(this)

        if (jfmenu.hasClass('jfmenu_displayed')) {
            hideMenu()
        }
        else {
            displayMenu()
        }
    })

    function hideMenu () {
        const headerTopMargin = hasMenuAboveItem() ? getHeaderAboveItemHeigth() : 0
        if (jfmenu.hasClass('jfmenu_displayed')) {
            header.css({ top: headerTopMargin })
            body.removeClass('body_overflow')
            jfmenu.removeClass('jfmenu_displayed')
            jfmenuOverlay.removeClass('fadeIn')
            jfmenuContent.removeClass('fadeInDownBig')
            menuButton.removeClass('jfmenu__mobileButton__active')
        }
    }

    function displayMenu () {
        if (!jfmenu.hasClass('jfmenu_displayed')) {
            header.css({ top: 0 })
            body.addClass('body_overflow')
            jfmenu.addClass('jfmenu_displayed')
            jfmenuOverlay.addClass('animated fadeIn')
            jfmenuContent.addClass('animated fadeInDownBig')
            menuButton.addClass('jfmenu__mobileButton__active')
        }
    }

    function hasMenuAboveItem () {
    // Check if above item exists and is displayed.
        const aboveItem = $('.mostRecentPostAd')
        return aboveItem.length > 0 && aboveItem.is(':visible')
    }

    function getHeaderAboveItemHeigth () {
        const aboveItem = $('.mostRecentPostAd')
        return hasMenuAboveItem() ? aboveItem.outerHeight() : 0
    }
}

function scrollTop (opts) {
    const position = opts && opts.position ? opts.position : 0
    const speed = opts && opts.speed ? opts.speed : 300

    $('html, body').animate({
        scrollTop: opts && opts.position
    }, speed)
}
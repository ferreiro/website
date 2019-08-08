// https://gist.github.com/Zoramite/812525

(function($){
    var baseDomain
    var externalPath

    $.externalLinks = {
        baseDomain: window.location.host,
        ignoreClass: 'ignoreExternal',
        externalClass: 'isExternal',
        rel: 'external'
    }

    $.fn.externalLinks = function() {
        return this.each(function() {
            var container = $(this)

            $('a').on('click', container, function(event){
                var ele = $(this)

                if(isExternalLink(ele)) {
                    event.preventDefault()
                    event.stopPropagation()

                    window.open(this.href, '_blank')
                }
            })
        })
    }

    $(function(){
        // Set up the regex
        baseDomain = new RegExp($.externalLinks.baseDomain, 'i')
        externalPath = /^([a-z\+]*:)?(\/\/)/i
    })

    function isExternalLink(ele) {
        var href = ele.attr('href')

        // Allow a selector for ignoring links
        if(ele.hasClass($.externalLinks.ignoreClass)) {
            return false
        }

        // Allow a selector for specifically externalizing links
        if(ele.hasClass($.externalLinks.externalClass)) {
            return true
        }

        // Allow a rel attribute for specifically externalizing links
        if(ele.attr('rel') === $.externalLinks.rel) {
            return true
        }

        // Allow the base domain to function normally
        if(baseDomain.test(href)) {
            return false
        }

        if(externalPath.test(href)) {
            return true
        }

        return false
    }
}(jQuery))

$(function(){
    $('body').externalLinks()
})
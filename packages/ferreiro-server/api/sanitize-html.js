const sanitizer = require('sanitize-html')

export const sanitizeHtml = (dirtyHtml) => {
    const sanitizerOptions = {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
            'img', 'span', 'iframe', 'data-src',
        ],
        allowedAttributes: {
            '*': [ 'id', 'href', 'align', 'alt', 'center', 'bgcolor' ],
            div: [ 'class' ],
            a: [ 'href', 'name', 'target' ],
            img: [ 'src', 'style', 'data-src' ],
            h1: [ 'id' ],
            h2: [ 'id' ],
            ul: [ 'class' ],
            iframe: [ 'width', 'height', 'src', 'frameborder', 'allow', 'allowfullscreen' ]
        }
    };

    return sanitizer(dirtyHtml, sanitizerOptions)
  }
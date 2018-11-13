const marked = require('marked')
const replaceall = require('replaceall')
const {sanitizeHtml} = require('../sanitize-html')

export const markdownToHtml = (srcMarkdown) => {
    const dirtyHtml = marked(srcMarkdown)
    const htmlSanitized = sanitizeHtml(dirtyHtml);

    // Add syntax highlight class to hmtl
    const outputHtml = replaceall('<pre><code>', "<pre><code class='prettyprint linenums'>", htmlSanitized)

    return outputHtml
  }
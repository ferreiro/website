const marked = require('marked')
const replaceall = require('replaceall')
const {sanitizeHtml} = require('../sanitize-html')

export const markdownToHtml = (srcMarkdown) => {
    const dirtyHtml = marked(srcMarkdown)
    const htmlSanitized = sanitizeHtml(dirtyHtml);

    // NB 1: Add syntax highlight class to hmtl
    const outputHtmlWithSyntaxHighlight = replaceall('<pre><code>', "<pre><code class='prettyprint linenums'>", htmlSanitized)

    // NB 2: Adding Lazy loading to blog post pictures
    const outputHtmlWithLazyImageLoading = replaceall('src="', 'class="lazy" data-src="', outputHtmlWithSyntaxHighlight)

    return outputHtmlWithLazyImageLoading
  }
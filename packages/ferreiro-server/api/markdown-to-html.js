const marked = require('marked')
const replaceall = require('replaceall')
const {sanitizeHtml} = require('./sanitize-html')

// NB: Creating our own Markdown renderer to add more
// functionalities on top of the generated HTML.
const getCustomMarkdownRenderer = () => {
  const renderer = new marked.Renderer()

  renderer.blockquote = (quote) => {
    console.log('quote')
    console.log(quote)
    console.log('----')

    return quote
  }

  renderer.heading = (text, level) => {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  
    return `
    <a name="${escapedText}" class="anchor" href="#${escapedText}">  
      <h${level}>
          <span class="header-link"></span>
          ${text}    
      </h${level}>
    </a>`
  }

  return renderer
}

export const markdownToHtml = (srcMarkdown) => {
    const customRenderer = getCustomMarkdownRenderer()

    const dirtyHtml = marked(srcMarkdown, {renderer: customRenderer})
    const htmlSanitized = sanitizeHtml(dirtyHtml);

    // NB 1: Add syntax highlight class to hmtl
    const outputHtmlWithSyntaxHighlight = replaceall('<pre><code>', "<pre><code class='prettyprint linenums'>", htmlSanitized)

    // NB 2: Adding Lazy loading to blog post pictures
    const outputHtmlWithLazyImageLoading = replaceall('src="', 'class="lazy" data-src="', outputHtmlWithSyntaxHighlight)

    return outputHtmlWithLazyImageLoading
  }
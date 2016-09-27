var pug = require('pug')

var compiledTemplate = pug.compileFile('views/emailTemplate.pug')
var htmlEmail = compiledTemplate({
  name: 'sada'
})

console.log(htmlEmail)

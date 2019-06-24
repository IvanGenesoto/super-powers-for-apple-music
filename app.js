/* global Application */

const app = Application('iTunes') // #debug: Change to 'Music' when updated.

app.includeStandardAdditions = true
app.fixedIndexing = true
module.exports = app

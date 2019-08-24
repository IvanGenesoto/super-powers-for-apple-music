const app = Application('iTunes') /* global Application */ // #debug: Change to 'Music' when updated.

app.includeStandardAdditions = true
app.fixedIndexing = true
module.exports = app

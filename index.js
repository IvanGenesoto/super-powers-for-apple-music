
const shouldCollectionBeProcessed = require('./dialogue/process')
const process = require('./process')

if (shouldCollectionBeProcessed()) process()

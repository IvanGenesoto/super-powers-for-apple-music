
const isTest = true
const shouldCollectionBeProcessed = require('./dialogue/process')
const process = require('./process')

if (shouldCollectionBeProcessed()) process(isTest)

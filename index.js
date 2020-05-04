const isTest = true
const shouldAllBeProcessed = require('./dialogue/which')
const process = require('./process')
const shouldProcessAll = shouldAllBeProcessed()

process(shouldProcessAll, isTest)

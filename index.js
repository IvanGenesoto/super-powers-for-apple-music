const isTest = true
const shouldAllBeProcessed = require('./dialogue/process')
const process = require('./process')
const shouldProcessAll = shouldAllBeProcessed()

process(shouldProcessAll, isTest)

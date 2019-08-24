const isTest = true
const shouldCollectionBeProcessed = require('./dialogue/process')
const process = require('./process')
const shouldProcess = shouldCollectionBeProcessed()

if (shouldProcess) process(isTest)

import {displayWhich, process} from '.'

const isTest = true // #note: Set to false to run full process.
const shouldProcessAll = displayWhich()

process(shouldProcessAll, isTest)

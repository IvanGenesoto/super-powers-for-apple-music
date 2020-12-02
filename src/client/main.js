import {
  shouldAllBeProcessed,
  createState,
  handleSmartPlaylists,
  executeCommands,
  handleState,
  getChildLists,
} from '.'

const isTest = true // #note: Set to false to run full process.
const shouldProcessAll = shouldAllBeProcessed()
const state = createState(shouldProcessAll, isTest)
const this_ = {state}
const childLists = getChildLists('1. Set', state) // #implement: User can set name of commands folder in "Preferences" playlist's description.

isTest || handleSmartPlaylists(state)
isTest || childLists.forEach(executeCommands, this_)
handleState(state)

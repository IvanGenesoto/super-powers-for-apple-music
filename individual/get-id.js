
const display = require('./dialogue/display')
const app = require('./app')
const selection = app.selection()
const [track] = selection
const id = track.id()
const databaseID = track.databaseID()
const persistentID = track.persistentID()
const text = `ID: ${id}\u000aDatabase ID: ${databaseID}\u000aPersistent ID: ${persistentID}`
display(text)

import {app} from '.'

const {displayDialog} = app
const allPlaylists_ = app.playlists()
const allPlaylists = Array.from(allPlaylists_)
const allLists = allPlaylists.map(playlist => ({...playlist.properties(), playlist}))
const list = allLists.find(({name}) => name === 'Disambiguate')
const properties = {...list, playlist: null}

const concatenate = (text, [name, value], index) => {
  const delimiter = index ? '\u000a' : ''
  text += `${delimiter}${name}: ${value}`
  return text
}

const text = Object
  .entries(properties)
  .reduce(concatenate, '')

app.displayDialog(text)

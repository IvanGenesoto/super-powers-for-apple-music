import {app, _getPlaylist} from '.'

const {displayDialog} = app
const tracks = Array.from(_getPlaylist('Library').tracks())
const {length: initialCount} = tracks

const datas = tracks.map(track => ({...track.properties(), track}))

let finalCount = 0

datas.forEach(data => data.name && ++finalCount)

const {buttonReturned} = displayDialog(`${finalCount} of ${initialCount} songs extracted.`)

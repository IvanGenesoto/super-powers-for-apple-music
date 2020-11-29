import {app} from '.'

const {playlists} = app

export const _getPlaylist = playlistName => playlists[playlistName]

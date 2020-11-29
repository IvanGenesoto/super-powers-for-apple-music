import {app} from '..'

const {playlists: _playlists} = app

export const _getPlaylist = playlistName => _playlists[playlistName]

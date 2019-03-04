module.exports = {
  '\u2605': {
    adoptionStateKey: 'didSetRatingByArtist',
    labelField: 'grouping',
    field: 'show', // #note: ★ (artist rating)
    shouldPrefix: true // #enhancement: Adds label to beginning of labelField.
  },
  Genre: {
    // commandName: 'Set Genre',
    commandStateKey: 'shouldDeriveGenreByArtist',
    labelField: 'grouping',
    field: 'comment'
  },
  Vocalist: {
    adoptionStateKey: 'didSetHasVocalistByArtist',
    labelField: 'grouping',
    field: 'category'
  },
  Vocals: { // #note: Playlist names are "Yes" or "No".
    // commandName: 'Set Vocals',
    commandStateKey: 'shouldDeriveHasVocalistByArtist',
    validationWords: ['instrumental'],
    validationValue: 'No',
    labelField: 'grouping',
    field: 'movement'
  },
  Disabled: { // #note: Folder is nested in the "Set Attribute" folder.
    validationWords: ['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition'],
    validationValue: 'Alternate',
    labelField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    fieldValue: false
  },
  Enabled: {
    labelField: 'grouping',
    antiLabel: 'Disabled',
    shouldAntiValidate: true,
    field: 'enabled',
    fieldValue: true
  },
  Disregarded: {
    validationWords: ['interlude', 'intro', 'outro'],
    validationValue: 'Interlude',
    labelField: 'grouping',
    antiLabel: 'Regarded',
    field: 'episodeID'
  },
  Regarded: {
    labelField: 'grouping',
    antiLabel: 'Disregarded',
    shouldAntiValidate: true,
    field: 'episodeID',
    fieldValue: ''
  },
  Rep: {
    labelField: 'grouping'
  },
  Status: { // #note: Playlist names (and hence values) are "Protected", "Rejected", "Retired" or "Unretired".
    // isArtistCommand: true,
    // commandName: 'Set Artist Status',
    commandStateKey: 'didSetStatusByArtist',
    adoptionStateKey: 'didSetStatusByArtist',
    labelField: 'grouping',
    defaultLabelValue: 'Trialing',
    field: 'description'
  },
  Artist: {
    adoptionStateKey: 'didSetGenreByArtist',
    labelField: 'composer',
    field: 'genre'
  },
  Discovered: {
    labelField: 'composer',
    getDefaultLabelValue: track => track.dateAdded(),
    shouldPrefix: true
  },
  Unrated: {
    labelField: 'composer'
  },
  Highest: {
    labelField: 'composer'
  },
  Tracks: {
    labelField: 'composer'
  },
  Composer: {
    labelField: 'composer'
  },
  Mood: {
    labelField: 'composer'
  },
  Energy: {
    labelField: 'composer'
  },
  Original: {
    labelField: 'composer'
  },
  Updated: {
    // isPlaylist: true,
    // isArtistCommand: true,
    // commandName: 'Artist Updated',
    labelField: 'composer',
    labelValue: Date.now().toString(),
    defaultLabelValue: Date.now().toString(),
    field: 'bpm',
    fieldValue: 0,
    defaultFieldValue: 0
  }
}

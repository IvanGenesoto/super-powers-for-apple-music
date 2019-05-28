module.exports = {
  'Status': { // #note: Playlist names (and hence values) are "Protected", "Rejected", "Retired" or "Unretired".
    // commandName: 'Set Artist Status',
    isArtistCommand: true,
    commandStateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    labelField: 'grouping',
    defaultLabelValue: 'Trialing',
    field: 'description',
    isAdoptable: true
  },
  'Artist Rating': { // #note: Alternatively use "★" ("\u2605").
    antiAdoptionStateKey: 'didSetRatingByArtist',
    labelField: 'grouping',
    field: 'show',
    shouldPrefix: true, // #enhancement: Adds label to beginning of labelField.
    isAdoptable: true
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    labelField: 'composer',
    field: 'genre',
    isAdoptable: true
  },
  'Genre': {
    // commandName: 'Set Genre',
    commandStateKey: 'shouldDeriveGenreByArtist',
    labelField: 'grouping',
    field: 'comment'
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetHasVocalistByArtist',
    labelField: 'grouping',
    field: 'category',
    isAdoptable: true
  },
  'Vocals': { // #note: Playlist names are "Yes" or "No".
    // commandName: 'Set Vocals',
    commandStateKey: 'shouldDeriveHasVocalistByArtist',
    validationWords: ['instrumental'],
    validationValue: 'No',
    labelField: 'grouping',
    field: 'movement'
  },
  'Disabled': { // #note: Folder is nested in the "Set Attribute" folder.
    validationWords: ['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition'],
    validationValue: 'Alternate',
    labelField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    fieldValue: false
  },
  'Enabled': {
    labelField: 'grouping',
    antiLabel: 'Disabled',
    shouldAntiValidate: true,
    field: 'enabled',
    fieldValue: true
  },
  'Disregarded': {
    validationWords: ['interlude', 'intro', 'outro'],
    validationValue: 'Interlude',
    labelField: 'grouping',
    antiLabel: 'Regarded',
    field: 'episodeID'
  },
  'Regarded': {
    labelField: 'grouping',
    antiLabel: 'Disregarded',
    shouldAntiValidate: true,
    field: 'episodeID',
    fieldValue: ''
  },
  'Proxy': {
    labelField: 'grouping'
  },
  'Discovered': {
    labelField: 'composer',
    getDefaultLabelValue: track => track.dateAdded(),
    shouldPrefix: true,
    isAdoptable: true
  },
  'Unrated': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Highest': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Tracks': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Composer': {
    labelField: 'composer'
  },
  'Mood': {
    labelField: 'composer'
  },
  'Energy': {
    labelField: 'composer'
  },
  'Original Genre': {
    labelField: 'composer'
  },
  'Updated': {
    // isPlaylist: true,
    // commandName: 'Set Artist Updated',
    isArtistCommand: true,
    labelField: 'composer',
    labelValue: Date.now().toString(),
    defaultLabelValue: Date.now().toString(),
    field: 'bpm',
    fieldValue: 0,
    defaultFieldValue: 0,
    isAdoptable: true
  }
}

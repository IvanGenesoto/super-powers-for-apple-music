module.exports = {
  'Artist Rating': { // #note: Alternatively use "★" ("\u2605").
    antiAdoptionStateKey: 'didSetRatingByArtist',
    labelField: 'grouping',
    field: 'show',
    shouldPrefix: true, // #implement: Adds label to beginning of labelField.
    isAdoptable: true
  },
  'Artist Status': { // #note: Playlist name (and hence value) is "Protected", "Rejected", "Retired" or "Automatic".
    isArtistCommand: true,
    commandStateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    automaticStateKey: 'shouldDeriveStatusByArtist',
    labelField: 'grouping',
    defaultLabelValue: 'Trialing',
    field: 'description',
    isAdoptable: true
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    labelField: 'composer',
    field: 'genre',
    isAdoptable: true
  },
  'Genre': {
    commandStateKey: 'shouldDeriveGenreByArtist',
    labelField: 'grouping',
    field: 'comment'
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetVocalsByArtist',
    labelField: 'grouping',
    field: 'category',
    isAdoptable: true
  },
  'Vocals': { // #note: Playlist name (and hence value) is "Yes" or "No".
    commandStateKey: 'shouldDeriveVocalsByArtist',
    validationWordsArrays: [['instrumental']],
    validationValues: ['No'],
    labelField: 'grouping',
    field: 'movement'
  },
  'Disabled': { // #note: Folder is nested in the "Set Attribute" folder.
    validationWordsArrays: [['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition']],
    validationValues: ['Alternate'],
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
    validationWordsArrays: [['interlude', 'intro', 'outro'], ['feat.']],
    validationValues: ['Interlude', 'Featuring'],
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
  'Artist Updated': { // #note: Playlist name (and hence value) is "Yes" or "No".
    isArtistCommand: true,
    labelField: 'composer',
    labelValue: Date(), // #implement: Date is truncated.
    defaultLabelValue: 'No',
    field: 'bpm',
    fieldValue: 0,
    defaultFieldValue: 500,
    isAdoptable: true
  }
}

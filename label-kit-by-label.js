module.exports = {
  'Artist Status': { // #note: Playlist name (and hence value) is "Protected", "Rejected", "Retired" or "Automatic".
    commandStateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    automaticStateKey: 'shouldDeriveRatingByArtist',
    labelField: 'grouping',
    defaultValue: 'Trialing',
    field: 'description',
    isAdoptable: true
  },
  'Artist Updated': { // #note: Playlist name (and hence value) is "Yes" or "No".
    labelField: 'composer',
    value: Date(), // #implement: Date is truncated.
    defaultValue: 'No',
    field: 'bpm',
    fieldValue: 0,
    defaultFieldValue: 500,
    isAdoptable: true
  },
  'Artist Rating': { // #note: Alternatively use "★" ("\u2605").
    antiAdoptionStateKey: 'didSetRatingByArtist',
    labelField: 'grouping',
    shouldPrefix: true,
    isAdoptable: true
  },
  'Artist Star Rating': { // #note: Not actually used as label.
    field: 'show',
    isAdoptable: true
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    labelField: 'grouping',
    field: 'genre',
    isAdoptable: true
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetVocalsByArtist',
    labelField: 'grouping',
    field: 'category',
    isAdoptable: true
  },
  'Artist Discovered': {
    labelField: 'composer',
    getDefaultValue: track => track.dateAdded(),
    shouldPrefix: true,
    isAdoptable: true
  },
  'Rating': { // #note: Not actually used as label.
    field: 'rating'
  },
  'Genre': {
    commandStateKey: 'shouldDeriveGenreByArtist',
    labelField: 'grouping',
    field: 'comment'
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
    labelField: 'grouping',
    fieldValue: 'Yes'
  },
  'Songs': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Rated Songs': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Unrated Songs': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Highest Rating': {
    labelField: 'composer',
    isAdoptable: true
  },
  'Composer': {
    labelField: 'composer'
  },
  'Original Genre': {
    labelField: 'composer'
  }
}

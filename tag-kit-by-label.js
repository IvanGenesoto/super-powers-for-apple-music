const getDateString = require('./get/date-string')

module.exports = {
  'Artist Status': { // #note: Playlist name (and hence value) is "Protected", "Rejected", "Retired" or "Automatic".
    stateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    automaticStateKey: 'shouldDeriveRatingByArtist',
    labelField: 'grouping',
    defaultValue: 'Trialing',
    field: 'comment',
    isAdoptable: true
  },
  'Artist Updated': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'didUpdateByArtist',
    labelField: 'composer',
    value: getDateString(),
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
  'Artist Star Rating': {
    labelField: 'composer',
    field: 'category',
    isAdoptable: true
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    labelField: 'grouping',
    field: 'description',
    isAdoptable: true
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetVocalsByArtist',
    labelField: 'grouping',
    field: 'description',
    fieldValue: 'pop',
    defaultFieldValue: 'wave',
    isAdoptable: true
  },
  'Artist Discovered': {
    labelField: 'composer',
    getDefaultValue: track => getDateString(track.dateAdded()),
    shouldPrefix: true,
    isAdoptable: true
  },
  'Rating': {
    field: 'rating'
  },
  'Song Genre': {
    stateKey: 'shouldDeriveGenreByArtist',
    labelField: 'grouping',
    field: 'genre'
  },
  'Song Vocals': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'shouldDeriveVocalsByArtist',
    validationWordsArrays: [['instrumental']],
    validationValues: ['No'],
    labelField: 'grouping',
    field: 'genre',
    fieldValue: 'pop',
    defaultFieldValue: 'wave'
  },
  'Plays': { // #note: Playlist name (and hence value) is "Yes" or "No".
    labelField: 'grouping',
    field: 'movementNumber',
    isInteger: true
  },
  'Disabled': { // #note: Folder is nested in the "Set Attribute" folder.
    validationWordsArrays: [['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition']],
    validationValues: ['Alternate'], // #note: Additional values are "Duplicate", "Replaced by Alternate" and "Wrong Artist".
    labelField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    fieldValue: false
  },
  'Enabled': { // #note: Possible values are "Alternate to Unavailable," "Not an Alternate" and "Replacement Alternate".
    labelField: 'grouping',
    antiLabel: 'Disabled',
    shouldAntiValidate: true,
    field: 'enabled',
    fieldValue: true
  },
  'Disregarded': {
    validationWordsArrays: [['interlude', 'intro', 'outro'], ['feat.'], ['instrumental']],
    validationValues: ['Interlude', 'Featuring', 'Atypical'],
    labelField: 'grouping',
    antiLabel: 'Regarded',
    field: 'movement'
  },
  'Regarded': { // note: Possible values are "Not an Interlude" and "Not Featuring".
    labelField: 'grouping',
    antiLabel: 'Disregarded',
    shouldAntiValidate: true
  },
  'Proxy': {
    labelField: 'composer',
    value: 'Yes'
  },
  'Total Songs': {
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

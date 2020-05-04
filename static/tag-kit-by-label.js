const getDateString = require('../get/date-string')
const getInteger = require('../get/integer')

module.exports = {
  'Artist Status': { // #note: Playlist name (and hence value) is "Protected", "Rejected", "Retired" or "Automatic".
    stateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    automaticStateKey: 'shouldDeriveRatingByArtist',
    tagField: 'grouping',
    defaultValue: 'Trialing',
    field: 'comment',
    isAdoptable: true
  },
  'Artist Updated': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'didUpdateByArtist',
    antiAdoptionStateKey: 'didUpdateByArtist',
    tagField: 'composer',
    value: getDateString(),
    defaultValue: getDateString(new Date(0)),
    field: 'movementNumber',
    fieldValue: 0,
    defaultFieldValue: 600,
    isAdoptable: true
  },
  'Artist Rating': { // #note: Alternatively use "★" ("\u2605").
    antiAdoptionStateKey: 'didSetRatingByArtist',
    tagField: 'grouping',
    shouldPrefix: true,
    isAdoptable: true
  },
  'Artist Star Rating': {
    tagField: 'composer',
    field: 'category',
    isAdoptable: true
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    tagField: 'grouping',
    field: 'description',
    isAdoptable: true
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetVocalsByArtist',
    tagField: 'grouping',
    field: 'description',
    fieldValue: 'pop',
    defaultFieldValue: 'wave',
    isAdoptable: true
  },
  'Artist Discovered': {
    tagField: 'composer',
    getDefaultValue: track => getDateString(track.dateAdded()),
    shouldPrefix: true,
    isAdoptable: true
  },
  'Rating': {
    field: 'rating'
  },
  'Song Genre': { // #note: Playlist name (and hence value) is a genre.
    stateKey: 'shouldDeriveGenreByArtist',
    tagField: 'grouping',
    field: 'genre'
  },
  'Song Vocals': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'shouldDeriveVocalsByArtist',
    validationWordsArrays: [['instrumental']],
    validationValues: ['No'],
    tagField: 'grouping',
    field: 'genre',
    fieldValue: 'pop',
    defaultFieldValue: 'wave'
  },
  'Plays': {
    tagField: 'grouping',
    getValue: getInteger,
    getDefaultValue: getInteger.bind({isDefault: true}),
    field: 'bpm',
    getFieldValue: getInteger,
    getDefaultFieldValue: getInteger.bind({isDefault: true})
  },
  'Played': { // #note: Playlist name (and hence value) is "Yes" or "No".
    tagField: 'grouping',
    triggeredLabel: 'Plays',
    value: getDateString(),
    defaultValue: getDateString(new Date(0)),
    field: 'year',
    fieldValue: 0,
    defaultFieldValue: 600
  },
  'Disabled': { // #note: Folder is nested in the "Set Attribute" folder.
    validationWordsArrays: [['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition']],
    validationValues: ['Alternate'], // #note: Additional values are "Duplicate", "Replaced" and "Not Artist".
    tagField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    fieldValue: false
  },
  'Enabled': { // #note: Possible values are "Replacement," "Not Alternate" and "Available".
    tagField: 'grouping',
    antiLabel: 'Disabled',
    shouldAntiValidate: true,
    field: 'enabled',
    fieldValue: true
  },
  'Disregarded': {
    validationWordsArrays: [['interlude', 'intro', 'outro'], ['feat.'], ['instrumental']],
    validationValues: ['Interlude', 'Featuring', 'Atypical'],
    tagField: 'grouping',
    antiLabel: 'Regarded',
    field: 'movement'
  },
  'Regarded': { // note: Possible values are "Not Interlude," "Not Featuring" and "Not Atypical".
    tagField: 'grouping',
    antiLabel: 'Disregarded',
    shouldAntiValidate: true
  },
  'Proxy': {
    tagField: 'composer',
    value: 'Yes'
  },
  'Total Songs': {
    tagField: 'composer',
    isAdoptable: true
  },
  'Rated Songs': {
    tagField: 'composer',
    isAdoptable: true
  },
  'Unrated Songs': {
    tagField: 'composer',
    isAdoptable: true
  },
  'Highest Rating': {
    tagField: 'composer',
    isAdoptable: true
  },
  'Composer': {
    tagField: 'composer'
  },
  'Original Genre': {
    tagField: 'composer'
  }
}

/// import {getDateString, thrower, getInteger} from '..'
import {getDateString, thrower, artistStatusEnum} from '..'

export const fieldKitEnum = Object.freeze({
  __proto__: thrower,
  'Artist Status': { // #note: Playlist name (and hence value) is "Protected", "Rejected", "Retired" or "Automatic".
    stateKey: 'didSetStatusByArtist',
    antiAdoptionStateKey: 'didSetStatusByArtist',
    automaticStateKey: 'shouldDeriveRatingByArtist',
    enum_: artistStatusEnum,
    tagField: 'grouping',
    defaultTagValue: 'Trialing',
    defaultAdoptionFieldValue: 'Trialing',
    field: 'comment',
    isAdoptable: true,
  },
  'Artist Updated': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'didUpdateByArtist',
    antiAdoptionStateKey: 'didUpdateByArtist',
    tagField: 'composer',
    tagValue: getDateString(),
    defaultTagValue: '1970/01/01',
    field: 'movementNumber',
    fieldValue: 0,
    defaultFieldValue: 600,
    getDefaultAdoptionFieldValue: value => !value || value === '1970/01/01' ? 600 : 0,
    isAdoptable: true,
  },
  'Artist Rating': {
    antiAdoptionStateKey: 'didSetRatingByArtist',
    field: 'bpm',
    isAdoptable: true,
  },
  'Artist Star Rating': {
    tagField: 'composer',
    field: 'description',
    isAdoptable: true,
  },
  'Artist Genre': {
    antiAdoptionStateKey: 'didSetGenreByArtist',
    tagField: 'grouping',
    field: 'category',
    isAdoptable: true,
  },
  'Artist Vocals': {
    antiAdoptionStateKey: 'didSetVocalsByArtist',
    tagField: 'grouping',
    field: 'category',
    fieldValue: 'pop',
    defaultFieldValue: 'wave',
    defaultAdoptionFieldValue: null,
    isAdoptable: true,
  },
  'Artist Discovered': {
    tagField: 'composer',
    getDefaultTagValue: song => getDateString(song.dateAdded),
    shouldPrefix: true,
    isAdoptable: true,
  },
  'Rating': {
    field: 'rating',
  },
  'Song Genre': { // #note: Playlist name (and hence value) is a genre.
    stateKey: 'shouldDeriveGenreByArtist',
    tagField: 'grouping',
    field: 'genre',
  },
  'Song Vocals': { // #note: Playlist name (and hence value) is "Yes" or "No".
    stateKey: 'shouldDeriveVocalsByArtist',
    validationWordsArrays: [['instrumental']],
    validationValues: ['No'],
    tagField: 'grouping',
    field: 'genre',
    fieldValue: 'pop',
    defaultFieldValue: 'wave',
  },
  /// 'Plays': {
  ///   tagField: 'grouping',
  ///   getTagValue: getInteger,
  ///   getDefaultTagValue: getInteger.bind({isDefault: true}),
  ///   field: 'bpm',
  ///   getFieldValue: getInteger,
  ///   getDefaultFieldValue: getInteger.bind({isDefault: true})
  /// },
  /// 'Played': { // #note: Playlist name (and hence value) is "Yes" or "No".
  ///   tagField: 'grouping',
  ///   triggeredLabel: 'Plays',
  ///   tagValue: getDateString(),
  ///   defaultTagValue: '1970/01/01',
  ///   field: 'year',
  ///   fieldValue: 0,
  ///   defaultFieldValue: 600
  /// },
  'Disabled': { // #note: Possible values are "Alternate", "Duplicate", "Not Artist" and "Replaced".
    validationWordsArrays: [['alternate', 'alternative', 'version', 'acoustic', 'mix', 'edition']], // #note: "mix" also covers "remix".
    validationValues: ['Alternate'],
    tagField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    fieldValue: false,
  },
  'Enabled': { // #note: Possible values are "Available", "Not Alternate" and "Replacement".
    tagField: 'grouping',
    antiLabel: 'Disabled',
    shouldAntiValidate: true,
    field: 'enabled',
    fieldValue: true,
  },
  'Disregarded': { // #note: Possible values are "Atypical", "Featuring" and "Interlude".
    validationWordsArrays: [['interlude', 'intro', 'outro'], ['feat.'], ['instrumental']],
    validationValues: ['Interlude', 'Featuring', 'Atypical'],
    tagField: 'grouping',
    antiLabel: 'Regarded',
    field: 'movement',
    fieldValue: '',
  },
  'Regarded': { // #note: Possible values are "Interlude", "Not Featuring" and "Not Interlude".
    tagField: 'grouping',
    antiLabel: 'Disregarded',
    shouldAntiValidate: true,
    field: 'movement',
    fieldValue: '✓',
  },
  'Proxy': {
    tagField: 'composer',
    tagValue: 'Yes',
  },
  'Enabled Songs': {
    tagField: 'composer',
    isAdoptable: true,
  },
  'Regarded Songs': {
    tagField: 'composer',
    isAdoptable: true,
  },
  'Rated Songs': {
    tagField: 'composer',
    isAdoptable: true,
  },
  'Unrated Songs': {
    tagField: 'composer',
    isAdoptable: true,
  },
  'Highest Rating': {
    tagField: 'composer',
    isAdoptable: true,
  },
  'Composer': {
    tagField: 'composer',
  },
  'Original Genre': {
    tagField: 'composer',
  },
})

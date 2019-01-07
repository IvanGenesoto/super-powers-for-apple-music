module.exports = function createCommandKitByName() {

  const {state} = this

  const {
    shouldDeriveGenreByArtist,
    shouldDeriveHasVocalistByArtist,
    didSetStatusByArtist
  } = state

  return ({
    'Updated Artist': {
      isPlaylist: true,
      isArtistCommand: true,
      effects: [
        {
          label: 'Updated',
          value: Date.now().toString() // #enhancement: Convert to YYYY/MM/DD format. Try moment.js
        },
        {
          field: 'bpm',
          value: 0
        }
      ]
    },
    'Set Artist Status': { // #note: Playlist names (and hence values) are "Protected", "Rejected", "Retired" or "Unretired".
      isArtistCommand: true,
      valueByArtist: didSetStatusByArtist,
      effects: [
        {label: 'Status'},
        {field: 'description'}
      ]
    },
    'Set Vocals': { // #note: Playlist names are "Yes" or "No".
      valueByArtist: shouldDeriveHasVocalistByArtist,
      validationWords: ['instrumental'],
      validationName: 'No',
      effects: [
        {label: 'Vocals'},
        {field: 'show'}
      ]
    },
    'Set Genre': {
      valueByArtist: shouldDeriveGenreByArtist,
      value: true,
      effects: [
        {field: 'comment'},
        {label: 'Song'}
      ]
    },
    'Disabled': { // #note: Folder is nested in the "Set Attribute" folder.
      validationWords: ['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition'],
      validationName: 'Alternate',
      effects: [
        {
          field: 'enabled',
          value: false
        },
        {
          shouldUseFolderNameAsLabel: true,
          antiLabel: 'Enabled'
        }
      ]
    },
    'Enabled': {
      effects: [
        {
          field: 'enabled',
          value: true
        },
        {
          shouldUseFolderNameAsLabel: true,
          antiLabel: 'Disabled',
          shouldAntiValidate: true
        }
      ]
    },
    'Disregarded': {
      validationWords: ['interlude', 'intro', 'outro'],
      validationName: 'Interlude',
      effects: [
        {
          field: 'episodeID'
        },
        {
          shouldUseFolderNameAsLabel: true,
          antiLabel: 'Regarded'
        }
      ]
    },
    'Regarded': {
      effects: [{
        shouldUseFolderNameAsLabel: true,
        antiLabel: 'Disregarded',
        shouldAntiValidate: true
      }]
    }
    // 'Reject Aritst': {
    //   isArtistCommand: true,
    //   valueByArtist: statusByArtist,
    //   value: 'Protected',
    //   effects: [{
    //     label: 'Status',
    //     value: 'Rejected'
    //   }]
    // },
    // 'Set Artist to Vocalist': {
    //   isArtistCommand: true,
    //   valueByArtist: shouldDeriveHasVocalistByArtist,
    //   value: false,
    //   effects: [{
    //     label: 'Vocalist',
    //     value: 'true'
    //   }]
    // },
    // 'Set Artist to Instrumentalist': {
    //   isArtistCommand: true,
    //   valueByArtist: shouldDeriveHasVocalistByArtist,
    //   value: false,
    //   effects: [{
    //     label: 'Vocalist',
    //     value: 'false'
    //   }]
    // },
    // 'Set Song to Instrumental': {
    //   valueByArtist: shouldDeriveHasVocalistByArtist,
    //   value: true,
    //   effects: [{
    //     label: 'Vocals',
    //     value: 'false'
    //   }]
    // },
    // 'Retire Artist': {
    //   isArtistCommand: true,
    //   effects: [{
    //     label: 'Retired',
    //     value: 'true'
    //   }]
    // },
    // 'Unretire Artist': {
    //   isArtistCommand: true,
    //   effects: [{
    //     label: 'Retired',
    //     value: 'false'
    //   }]
    // },
    // 'Set Artist Genre': {
    //   isFolder: true,
    //   isArtistCommand: true,
    //   valueByArtist: tracksToAdoptGenreByArtist,
    //   value: null,
    //   effects: [{field: 'genre'}]},
    // 'Set Artist Genre + Vocalist': {
    //   isFolder: true,
    //   isArtistCommand: true,
    //   actions: [
    //     {
    //       valueByArtist: tracksToAdoptGenreByArtist,
    //       value: null
    //     },
    //     {
    //       valueByArtist: tracksToAdoptVocalistByArtist,
    //       value: null
    //     }
    //   ],
    //   effects: [
    //     {
    //       field: 'genre'
    //     },
    //     {
    //       label: 'Vocalist',
    //       value: 'true'
    //     }
    //   ]
    // },
    // 'Set Artist Genre + Instrumentalist': {
    //   isFolder: true,
    //   isArtistCommand: true,
    //   actions: [
    //     {
    //       valueByArtist: tracksToAdoptGenreByArtist,
    //       value: null
    //     },
    //     {
    //       valueByArtist: tracksToAdoptVocalistByArtist,
    //       value: null
    //     }
    //   ],
    //   effects: [
    //     {
    //       field: 'genre'
    //     },
    //     {
    //       label: 'Vocalist',
    //       value: 'false'
    //     }
    //   ]
    // },
    // 'Set Vocalist Genre': {
    //   isFolder: true,
    //   actions: [
    //     {
    //     },
    //     {
    //       valueByArtist: shouldDeriveHasVocalistByArtist,
    //       value: true
    //     }
    //   ],
    //   effects: [
    //     {
    //       label: 'Vocals',
    //       value: 'true',
    //       isActionWarranted: doesHasVocalsMatchArtist
    //     },
    //     {
    //       field: 'comment',
    //       shouldTruncate: true
    //     },
    //     {
    //       label: 'Song',
    //       shouldTruncate: true,
    //       valueByArtist: shouldDeriveGenreByArtist,
    //       valueByArtistValue: true,
    //       isActionWarranted: doesGenreMatchArtist
    //     }
    //   ]
    // },
    // 'Set Instrumental Genre': {
    //   isFolder: true,
    //   actions: [
    //     {
    //       valueByArtist: shouldDeriveGenreByArtist,
    //       value: true
    //     },
    //     {
    //       valueByArtist: shouldDeriveHasVocalistByArtist,
    //       value: true
    //     }
    //   ],
    //   effects: [
    //     {
    //       label: 'Vocals',
    //       value: 'false'
    //     },
    //     {
    //       field: 'comment',
    //       shouldTruncate: true
    //     },
    //     {
    //       label: 'Song',
    //       shouldTruncate: true
    //     }
    //   ]
    // }
  })
}

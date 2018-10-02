const doesNameIncludeWord = require('../multi-use/is-action-warranted/does-name-include-word')
const doesHasVocalsMatchArtist = require('../multi-use/does-has-vocalist-match-artist')
const doesGenreMatchArtist = require('../multi-use/does-genre-match-artist')

module.exports = function createCommandKitByName() {

  const {
    wasUpdatedByArtist,
    tracksToDeriveStatusByArtist,
    tracksToDeriveGenreByArtist,
    tracksToDeriveVocalistByArtist,
    shouldInferGenreByArtist,
    shouldInferVocalistByArtist
  } = this

  return ({
    'Protect Artist': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: tracksToDeriveStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Protected'
      }]
    },
    'Reject Aritst': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: tracksToDeriveStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Rejected'
      }]
    },
    'Set Artist to Vocalist': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: false,
      effects: [{
        label: 'Vocalist',
        value: 'true'
      }]
    },
    'Set Artist to Instrumentalist': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: false,
      effects: [{
        label: 'Vocalist',
        value: 'false'
      }]
    },
    'Set Song to Vocals': {
      isPlaylist: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: true,
      effects: [{
        label: 'Vocals',
        value: 'true'
      }]
    },
    'Set Song to Instrumental': {
      isPlaylist: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: true,
      validation: {words: ['instrumental']},
      effects: [{
        label: 'Vocals',
        value: 'false'
      }]
    },
    'Was Updated': {
      isArtistCommand: true,
      valueByArtist: wasUpdatedByArtist,
      value: true,
      effects: [
        {
          field: 'episodeID',
          value: Date.now().toString()
        },
        {
          field: 'bpm',
          value: 0
        }
      ]
    },
    'Set Artist Genre': {
      isArtistCommand: true,
      valueByArtist: tracksToDeriveGenreByArtist,
      value: null,
      effects: [{field: 'genre'}]},
    'Set Artist Genre + Vocalist': {
      isArtistCommand: true,
      actions: [
        {
          valueByArtist: tracksToDeriveGenreByArtist,
          value: null
        },
        {
          valueByArtist: tracksToDeriveVocalistByArtist,
          value: null
        }
      ],
      effects: [
        {
          field: 'genre'
        },
        {
          label: 'Vocalist',
          value: 'true'
        }
      ]
    },
    'Set Artist Genre + Instrumentalist': {
      isArtistCommand: true,
      actions: [
        {
          valueByArtist: tracksToDeriveGenreByArtist,
          value: null
        },
        {
          valueByArtist: tracksToDeriveVocalistByArtist,
          value: null
        }
      ],
      effects: [
        {
          field: 'genre'
        },
        {
          label: 'Vocalist',
          value: 'false'
        }
      ]
    },
    'Set Song Genre': {
      actions: [{
        valueByArtist: shouldInferGenreByArtist,
        value: true
      }],
      effects: [
        {
          field: 'comment',
          shouldTruncate: true
        },
        {
          label: 'Song',
          shouldTruncate: true
        }
      ]
    },
    'Set Song Genre + Vocals': {
      actions: [
        {
        },
        {
          valueByArtist: shouldInferVocalistByArtist,
          value: true
        }
      ],
      effects: [
        {
          label: 'Vocals',
          value: 'true',
          isActionWarranted: doesHasVocalsMatchArtist
        },
        {
          field: 'comment',
          shouldTruncate: true
        },
        {
          label: 'Song',
          shouldTruncate: true,
          valueByArtist: shouldInferGenreByArtist,
          valueByArtistValue: true,
          isActionWarranted: doesGenreMatchArtist
        }
      ]
    },
    'Set Song Genre + Instrumental': {
      actions: [
        {
          valueByArtist: shouldInferGenreByArtist,
          value: true
        },
        {
          valueByArtist: shouldInferVocalistByArtist,
          value: true
        }
      ],
      effects: [
        {
          label: 'Vocals',
          value: 'false'
        },
        {
          field: 'comment',
          shouldTruncate: true
        },
        {
          label: 'Song',
          shouldTruncate: true
        }
      ]
    },
    'Disable Song': {
      validation: {
        words: ['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition'],
        playlistName: 'Alternate'
      },
      effects: [
        {
          field: 'enabled',
          value: false
        },
        {
          field: 'grouping',
          label: 'Disabled',
          antiLabel: 'Enabled'
        }
      ]
    },
    'Enable Song': {effects: [
      {
        field: 'enabled',
        value: true
      },
      {
        label: 'Enabled',
        antiLabel: 'Disabled',
        validationCommandName: 'Disable Song',
        isActionWarranted: doesNameIncludeWord
      }
    ]},
    'Disregard Song': {
      validation: {
        words: ['interlude', 'intro', 'outro'],
        playlistName: 'Interlude'
      },
      effects: [{
        label: 'Disregarded',
        antiLabel: 'Regarded'
      }]
    },
    'Regard Song': {effects: [{
      field: 'grouping',
      label: 'Regarded',
      antiLabel: 'Disregarded',
      validationCommandName: 'Disregard Song',
      isActionWarranted: doesNameIncludeWord
    }]},
    'Retire Artist': {
      isArtistCommand: true,
      effects: [{
        field: 'grouping',
        label: 'Retired',
        value: 'true'
      }]
    },
    'Unretire Artist': {
      isArtistCommand: true,
      effects: [{
        field: 'grouping',
        label: 'Retired',
        value: 'false'
      }]
    }
  })
}

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
      isArtistCommand: true,
      valueByArtist: tracksToDeriveStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Protected'
      }]
    },
    'Reject Aritst': {
      isArtistCommand: true,
      valueByArtist: tracksToDeriveStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Rejected'
      }]
    },
    'Set Artist to Vocalist': {
      isArtistCommand: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: false,
      effects: [{
        label: 'Vocalist',
        value: 'true'
      }]
    },
    'Set Artist to Instrumentalist': {
      isArtistCommand: true,
      valueByArtist: shouldInferVocalistByArtist,
      value: false,
      effects: [{
        label: 'Vocalist',
        value: 'false'
      }]
    },
    'Set Song to Vocals': {
      valueByArtist: shouldInferVocalistByArtist,
      value: true,
      effects: [{
        label: 'Vocals',
        value: 'true'
      }]
    },
    'Set Song to Instrumental': {
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
    },
    'Set Artist Genre': {
      isFolder: true,
      isArtistCommand: true,
      valueByArtist: tracksToDeriveGenreByArtist,
      value: null,
      effects: [{field: 'genre'}]},
    'Set Artist Genre + Vocalist': {
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
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
      isFolder: true,
      field: 'grouping',
      label: 'Regarded',
      antiLabel: 'Disregarded',
      validationCommandName: 'Disregard Song',
      isActionWarranted: doesNameIncludeWord
    }]}
  })
}

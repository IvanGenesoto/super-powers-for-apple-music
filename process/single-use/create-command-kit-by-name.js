module.exports = function createCommandKitByName() {

  const {
    tracksToSetStatusByArtist,
    wasUpdatedByArtist
  } = this

  return ({
    'Protect Artist': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: tracksToSetStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Protected',
        arrayToPushToByArtist: tracksToSetStatusByArtist
      }]
    },
    'Reject Aritst': {
      isPlaylist: true,
      isArtistCommand: true,
      valueByArtist: tracksToSetStatusByArtist,
      value: null,
      effects: [{
        label: 'Status',
        value: 'Rejected',
        arrayToPushToByArtist: tracksToSetStatusByArtist
      }]
    },
    'Set Artist to Vocalist': {
      isPlaylist: true,
      isArtistCommand: true,
      effects: [{
        label: 'Vocalist',
        value: 'true'
      }]
    },
    'Set Artist to Instrumentalist': {
      isPlaylist: true,
      isArtistCommand: true,
      effects: [{
        label: 'Vocalist',
        value: 'false'
      }]
    },
    'Set Song to Vocals': {
      isPlaylist: true,
      effects: [{
        label: 'Vocals',
        value: 'true'
      }]
    },
    'Set Song to Instrumental': {
      isPlaylist: true,
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
      effects: [{field: 'genre'}]},
    'Set Artist Genre + Vocalist': {
      isArtistCommand: true,
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
    'Set Song Genre': {effects: [
      {
        field: 'comment',
        shouldTruncate: true
      },
      {
        label: 'Song',
        shouldTruncate: true
      }
    ]},
    'Set Song Genre + Vocals': {effects: [
      {
        label: 'Vocals',
        value: 'true'
      },
      {
        field: 'comment',
        shouldTruncate: true
      },
      {
        label: 'Song',
        shouldTruncate: true
      }
    ]},
    'Set Song Genre + Instrumental': {effects: [
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
    ]},
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
        validationCommandName: 'Disable Song'
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
      validationCommandName: 'Disregard Song'
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

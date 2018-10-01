module.exports = [
  {
    label: 'Composer',
    labelField: 'composer'
  },
  {
    label: 'Default',
    labelField: 'composer'
  },
  {
    field: 'genre',
    commands: [
      {parentName: 'Set Artist Genre'},
      {parentName: 'Set Artist Genre + Vocalist'},
      {parentName: 'Set Artist Genre + Instrumentalist'}
    ]
  },
  {
    label: 'Song',
    labelField: 'grouping',
    field: 'comment',
    commands: [
      {parentName: 'Set Song Genre', truncate: ' Song'},
      {parentName: 'Set Song Genre + Vocals', truncate: ' Song'},
      {parentName: 'Set Song Genre + Instrumental', truncate: ' Song'}
    ]
  },
  {
    label: 'Disabled',
    labelField: 'grouping',
    antiLabel: 'Enabled',
    field: 'enabled',
    validation: {
      matches: ['alternate', 'version', 'acoustic', 'remix', 'mix', 'edition'],
      labelValue: 'Alternate',
      fieldValue: false
    },
    commands: [{parentName: 'Disable Song', fieldValue: false}]
  },
  {
    label: 'Enabled',
    labelField: 'grouping',
    antiLabel: 'Disabled',
    field: 'enabled',
    fieldValue: true,
    commands: [{parentName: 'Enable Song', fieldValue: true, shouldAntiValidate: true}]
  },
  {
    label: 'Disregarded',
    labelField: 'grouping',
    antiLabel: 'Regarded',
    validation: {
      matches: ['interlude', 'intro', 'outro'],
      labelValue: 'Interlude'
    },
    commands: [{parentName: 'Disregard Song'}]
  },
  {
    label: 'Regarded',
    labelField: 'grouping',
    antiLabel: 'Disregarded',
    commands: [{parentName: 'Regard Song', shouldAntiValidate: true}]
  },
  {
    label: 'Vocalist',
    labelField: 'grouping',
    commands: [
      {name: 'Set Artist to Vocalist', labelValue: 'true'},
      {name: 'Set Artist to Instrumental', labelValue: 'false'},
      {parentName: 'Set Artist Genre + Vocalist', labelValue: 'true'},
      {parentName: 'Set Artist Genre + Instrumentalist', labelValue: 'false'}
    ]
  },
  {
    label: 'Vocals',
    labelField: 'grouping',
    validation: {
      matches: ['instrumental'],
      labelValue: 'false'
    },
    commands: [
      {name: 'Set Song to Vocals', labelValue: 'true'},
      {name: 'Set Song to Instrumental', labelValue: 'false'},
      {parentName: 'Set Song Genre + Vocals', labelValue: 'true'},
      {parentName: 'Set Song Genre + Instrumental', labelValue: 'false'}
    ]
  },
  {
    label: 'Retired',
    labelField: 'grouping',
    commands: [
      {name: 'Retire', labelValue: 'true'},
      {name: 'Unretire', labelValue: 'false'}
    ]
  },
  {
    label: 'Status',
    labelField: 'grouping',
    commands: [
      {name: 'Protect', labelValue: 'Protected'},
      {name: 'Reject', labelValue: 'Rejected'}
    ]
  },
  {
    field: 'episodeID',
    commands: [{name: 'Was Updated', fieldValue: Date.now().toString()}]
  },
  {
    field: 'bpm',
    commands: [{name: 'Was Updated', fieldValue: 0}]
  }
]

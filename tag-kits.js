module.exports = [
  {
    label: 'Composer',
    field: 'composer'
  },
  {
    label: 'Ungenred',
    field: 'composer'
  },
  {
    label: 'Disabled',
    field: 'grouping',
    antiLabel: 'Enabled',
    fieldEntry: ['enabled', false],
    validators: ['alternate', 'version', 'acoustic', 'remix', 'mix'],
    validatedValue: 'Alternate',
    command: 'Disable'
  },
  {
    label: 'Enabled',
    field: 'grouping',
    antiLabel: 'Disabled',
    fieldEntry: ['enabled', true],
    command: 'Enable'
  },
  {
    label: 'Disregarded',
    field: 'grouping',
    validators: ['interlude', 'intro', 'outro'],
    validatedValue: 'Interlude',
    command: 'Disregard'
  },
  {
    label: 'Vocals',
    field: 'grouping',
    validators: ['instrumental'],
    validatedValue: false,
    trueCommand: 'Set Song to Vocal',
    falseCommand: 'Set Song to Instrumental'
  },
  {
    label: 'Vocalist',
    field: 'grouping',
    trueCommand: 'Set Vocal Artist Genre',
    falseCommand: 'Set Instrumental Artist Genre'
  }
]

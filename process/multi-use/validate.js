const labelKitByLabel = require('../../label-kit-by-label')
const executeCommand = require('./execute-command')

module.exports = function validate(track, antiLabel) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {data} = this
  const {name} = data
  const lowerCaseName = name.toLowerCase()
  const filter = ([unused, {validationWords}]) => validationWords && validationWords.find(find)
  const find = word => lowerCaseName.includes(word)

  const doesNameIncludeValidationWord = () => {
    const labelKit = labelKitByLabel[antiLabel]
    const wrappedLabelKit = {labelKit}
    const filteredEntries = Object.entries(wrappedLabelKit).filter(filter)
    const {length} = filteredEntries
    return !!length
  }

  const callExecuteCommand = ([label, labelKit]) => executeCommand.call({
    ...this, label, labelKit, value: labelKit.validationValue
  }, track)

  if (antiLabel) return doesNameIncludeValidationWord()

  Object
    .entries(labelKitByLabel)
    .filter(filter)
    .forEach(callExecuteCommand)
}

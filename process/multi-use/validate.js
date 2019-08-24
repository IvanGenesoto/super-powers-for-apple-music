const labelKitByLabel = require('../../label-kit-by-label')
const executeCommand = require('./execute-command')

module.exports = function validate(track, antiLabel) { // #mustBeCalledInTryBlock: true, #mustHaveData: true

  const {data} = this
  const {name} = data
  const lowerCaseName = name.toLowerCase()

  const antiValidate = () => {
    const labelKit = labelKitByLabel[antiLabel]
    const wrappedLabelKit = {labelKit}
    const validateWithThis = validateEntry.bind({isAnti: true})
    const validatedEntries = Object.entries(wrappedLabelKit).filter(validateWithThis)
    const [hasValidatedEntry] = validatedEntries
    return hasValidatedEntry
  }

  const validateEntry = function ([label, labelKit]) {
    const {isAnti} = this
    const {validationWordsArrays, validationValues} = labelKit
    const filterWithThis = validateName.bind({label, labelKit, validationValues, isAnti})
    if (!validationWordsArrays) return
    return validationWordsArrays.filter(filterWithThis)
  }

  const validateName = function (validationWords, index) {
    const {label, labelKit, validationValues, isAnti} = this
    const find = word => lowerCaseName.includes(word.toLowerCase())
    const match = validationWords.find(find)
    const value = validationValues[index]
    if (!match) return
    if (isAnti) return true
    executeCommand.call({...this, label, labelKit, value, didValidate: true}, track)
  }

  if (antiLabel) return antiValidate()

  Object
    .entries(labelKitByLabel)
    .forEach(validateEntry)
}

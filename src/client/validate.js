import {tagKitByLabel, executeCommand} from '.'

export function validate(track, antiLabel) { // #mustBeCalledInTryBlock, #mustPassData

  const {data} = this
  const {name} = data
  const lowerCaseName = name.toLowerCase()

  const antiValidate = () => {
    const tagKit = tagKitByLabel[antiLabel]
    const wrappedLabelKit = {tagKit}
    const validateEntryWithThis = validateEntry.bind({isAnti: true})
    const validatedEntries = Object.entries(wrappedLabelKit).filter(validateEntryWithThis)
    const [hasValidatedEntry] = validatedEntries
    return hasValidatedEntry
  }

  const validateEntry = function ([label, tagKit]) {
    const {isAnti} = this
    const {validationWordsArrays, validationValues} = tagKit
    const validateNameWithThis = validateName.bind({label, tagKit, validationValues, isAnti})
    if (!validationWordsArrays) return
    return validationWordsArrays.filter(validateNameWithThis)
  }

  const validateName = function (validationWords, index) {
    const {label, tagKit, validationValues, isAnti} = this
    const find = word => lowerCaseName.includes(word.toLowerCase())
    const match = validationWords.find(find)
    const value = validationValues[index]
    if (!match) return
    if (isAnti) return true
    executeCommand.call({...this, label, tagKit, value, didValidate: true}, track)
  }

  if (antiLabel) return antiValidate()

  Object
    .entries(tagKitByLabel)
    .forEach(validateEntry)
}

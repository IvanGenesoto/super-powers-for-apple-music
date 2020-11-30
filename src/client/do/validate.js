import {tagKitByLabel, executeCommand} from '..'

export function validate(song, antiLabel) { // #mustBeCalledInTryBlock, #mustPassSong

  const {name} = song
  const lowerCaseName = name.toLowerCase()

  const antiValidate = () => {
    const tagKit = tagKitByLabel[antiLabel]
    const wrappedLabelKit = {tagKit}
    const validateEntryWithThis = validateEntry.bind({...this, isAnti: true})
    const validatedEntries = Object.entries(wrappedLabelKit).filter(validateEntryWithThis)
    const [hasValidatedEntry] = validatedEntries
    return hasValidatedEntry
  }

  const validateEntry = function ([label, tagKit]) {
    const {validationWordsArrays, validationValues} = tagKit
    const this_ = {...this, label, tagKit, validationValues}
    if (!validationWordsArrays) return
    return validationWordsArrays.filter(validateName, this_)
  }

  const validateName = function (validationWords, index) {
    const {validationValues, label, isAnti} = this
    const find = word => lowerCaseName.includes(word.toLowerCase())
    const match = validationWords.find(find)
    const value = validationValues[index]
    const this_ = {...this, didValidate: true}
    if (!match) return
    if (isAnti) return true
    executeCommand.call(this_, song, label, value)
  }

  if (antiLabel) return antiValidate()

  Object
    .entries(tagKitByLabel)
    .forEach(validateEntry, this)
}

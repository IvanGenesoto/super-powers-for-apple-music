import {fieldKitEnum, executeCommand} from '..'

export const validate = function (song, antiLabel) { // #mustBeCalledInTryBlock

  const {name} = song
  const lowerCaseName = name.toLowerCase()

  const antiValidate = () => {
    const fieldKit = fieldKitEnum[antiLabel]
    const wrappedFieldKit = {fieldKit}
    const validateEntryWithThis = validateEntry.bind({...this, isAnti: true})
    const validatedEntries = Object.entries(wrappedFieldKit).filter(validateEntryWithThis)
    const [hasValidatedEntry] = validatedEntries
    return hasValidatedEntry
  }

  const validateEntry = function ([label, fieldKit]) {
    const {validationWordsArrays, validationValues} = fieldKit
    const this_ = {...this, label, fieldKit, validationValues}
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
    .entries(fieldKitEnum)
    .forEach(validateEntry, this)
}

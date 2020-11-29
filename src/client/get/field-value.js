import {tagKitByLabel} from '../static/tag-kit-by-label'

export function getFieldValue(label) { // #mustPassData

  const {data} = this
  const tagKit = tagKitByLabel[label]
  const {field} = tagKit

  return data[field]
}

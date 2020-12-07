import {thrower} from '..'

export const artistStatusEnum = Object.freeze({
  __proto__: thrower,
  'Trialing': {},
  'Protected': {isImmutable: true},
  'Following': {},
  'Rejected': {isImmutable: true, isBad: true},
  'Dismissed': {isBad: true},
  'Retired': {isImmutable: true},
})

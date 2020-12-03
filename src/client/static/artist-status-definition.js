export const artistStatusDefinition = {
  'Trialing': {},
  'Protected': {isImmutable: true},
  'Following': {},
  'Rejected': {isImmutable: true, isBad: true},
  'Dismissed': {isBad: true},
  'Retired': {isImmutable: true},
}

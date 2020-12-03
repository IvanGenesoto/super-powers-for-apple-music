export const createEnum = (definition, name = 'anonymous', option = {}) => {

  const quote = name =>
      typeof name === 'string' && name.includes(' ') ? `"${name}"`
    : typeof name === 'symbol' ? name.toString()
    : name

  const cloneObject = (key, value, prototype) => {
    const object = Object.entries(value).reduce(append, createObject(key, prototype))
    const symbols = Object.getOwnPropertySymbols(value)
    const entries = symbols.map(symbol => [symbol, value[symbol]])
    return entries.reduce(append, object)
  }

  const createObject = (key, prototype) =>
      nameType !== 'none' && prototype ? {__proto__: createPrototype(key, prototype)}
    : keyType !== 'none' ? {__proto__: createPrototype(key, prototype)}
    : {__proto__: createPrototype(key, prototype)}

  const createPrototype = (value, prototype = null) =>
      nameType !== 'none' && prototype ? Object.create(prototype, {[nameKey]: {value}})
    : keyType !== 'none' && !prototype ? Object.create(prototype, {[keyKey]: {value}})
    : Object.create(prototype)

  const append = (object, [key, value]) => {
    object[key] = clone(key, value)
    return object
  }

  const clone = (key, value) => freeze(
      Array.isArray(value) ? value.map(clone)
    : value && typeof value === 'object' ? cloneObject(key, value)
    : value,
  )

  const {shouldFreeze = true, nameType = 'string', keyType = 'string'} = option
  const nameKey = nameType === 'symbol' ? Symbol.for('name') : 'name'
  const keyKey = keyType === 'symbol' ? Symbol.for('key') : 'key'
  const throw_ = (unused, key) => throw new ReferenceError(getMessage(key))
  const getMessage = key => `Enumeral ${name_}.${quote(key)} does not exist`
  const name_ = quote(name)
  const {freeze} = shouldFreeze ? Object : {freeze: object => object}
  const handler = freeze({__proto__: null, get: throw_})
  const prototype = freeze({__proto__: null})
  const prototypeProxy = new Proxy(prototype, handler)
  const isArray = Array.isArray(definition)
  const appendObject = (object, key) => (object[key] = {}) && object
  const definition_ = isArray ? definition.reduce(appendObject, {}) : definition
  const enum_ = cloneObject(name, definition_, prototypeProxy)
  const keys = Object.keys(enum_)
  const symbols = Object.getOwnPropertySymbols(enum_)
  const symbolEntries = symbols.map(symbol => [symbol, enum_[symbol]])
  const values = []
  const symbolValues = []

  const checkValues = function ([key, value]) {
    const {isSymbol} = this
    const items = isSymbol ? symbolValues : values
    const index = items.indexOf(value)
    const propertyNames = isSymbol ? symbols : keys
    const key_ = propertyNames[index]
    const issue = value ? `are the same ${typeof value}` : `are both ${value}`
    const first = `${name_}.${quote(key_)}`
    const second = `${name_}.${quote(key)}`
    if (index + 1) throw new TypeError(`Enumerals ${first} and ${second} ${issue}`)
    items.push(value)
  }

  Object.entries(enum_).forEach(checkValues)
  symbolEntries.forEach(checkValues, {isSymbol: true})

  return freeze(enum_)
}

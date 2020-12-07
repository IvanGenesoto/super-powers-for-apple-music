const throw_ = (unused, key) => throw new ReferenceError(getMessage(key))
const getMessage = key => `${key} does not exist`
const prototype = Object.freeze({__proto__: null})
const handler = Object.freeze({__proto__: null, get: throw_})

export const thrower = new Proxy(prototype, handler)

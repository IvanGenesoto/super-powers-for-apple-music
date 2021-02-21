const throw_ = (unused, key) => throw new ReferenceError(`${key} does not exist`)
const handler = Object.freeze({__proto__: null, get: throw_})
const prototype = Object.freeze({__proto__: null})

export const thrower = new Proxy(prototype, handler)

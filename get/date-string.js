module.exports = (date = new Date()) => {

  const date_ = date.toLocaleDateString(undefined, {
    year: 'numeric', month: '2-digit', day: '2-digit'
  })

  const [month, day, year] = date_.split('/')

  return [year, month, day].join('/')
}

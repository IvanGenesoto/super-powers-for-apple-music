export const getDateString = (date = new Date()) => {

  const configuration = {year: 'numeric', month: '2-digit', day: '2-digit'}
  const date_ = date.toLocaleDateString(undefined, configuration)
  const [month, day, year] = date_.split('/')

  return [year, month, day].join('/')
}

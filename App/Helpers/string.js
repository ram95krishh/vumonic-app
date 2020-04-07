import upperFirst from 'lodash/upperFirst'

export const isString = (string) => typeof string === 'string'

export const toTitleCase = (str) => {
  if (typeof str !== 'string') return ''
  return str.trim().split(' ').map((word) => {
    return upperFirst(word)
  }).join(' ')
}

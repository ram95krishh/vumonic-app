import moment from 'moment'

const getModifiedMomentDuration = (momentDuration) => {
  return momentDuration
    .replace('minute', 'min')
    .replace('hour', 'hr')
    .replace('a few seconds ago', '1 min ago')
    .replace(/(\ban\b)|(\ba\b)/g, '1')
}

export const getTimeDifference = (time, format = '') => {
  if (format) {
    return getModifiedMomentDuration(moment(time, format).fromNow())
  }
  return getModifiedMomentDuration(moment(time).fromNow())
}

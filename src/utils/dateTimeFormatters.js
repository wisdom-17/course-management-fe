/**
 * Formats a date object to a string in the format dd/mm/yyyy
 * @param {Date} dateObj
 * @returns String in the format dd/mm/yyyy
 */
export const formatDate = (dateObj) => {
  const localeStringDate = dateObj
    .toLocaleString('en-GB', {
      timeZone: 'UTC',
    })
    .split(',')[0]

  return localeStringDate
}

const daysBetween = (date1: Date, date2: Date): number => {
  return Math.round(
    Math.abs((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24))
  )
}

const getDay = (date: Date): string => {
  const numDays = daysBetween(new Date(Date.now()), date)
  if (numDays === 0) {
    return 'Today'
  } else if (numDays === 1) {
    return 'Yesterday'
  } else {
    return date.toLocaleString('en-us', { weekday: 'long' })
  }
}

export const formatDateTime = (datetime: string): string => {
  const newDate = new Date(datetime),
    day = getDay(newDate),
    formatTime = newDate
      .toLocaleTimeString([], {
        timeZone: 'America/Los_Angeles',
        timeZoneName: 'shortGeneric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace('AM', '')
      .replace('PM', '')
  return `${day} at ${formatTime}`
}

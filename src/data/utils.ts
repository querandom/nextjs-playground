import { AwesomeEvent } from './types'

export function filterEventsByDate(
  events: AwesomeEvent[],
  dateFilter: { year: number; month: number }
) {
  const { year, month } = dateFilter

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}

export function filterFeaturedEvents(events: AwesomeEvent[]) {
  return events.filter((event) => event.isFeatured)
}

export function getEventById(events: AwesomeEvent[], id: string) {
  return events.find((event) => event.id === id)
}

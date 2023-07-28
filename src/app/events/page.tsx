import EventList from '@/components/events/event-list'
import EventsSearch from '@/components/events/events-search'
import { getAllEvents } from '@/data/dummy-data'

function EventsPage() {
  const events = getAllEvents()

  return (
    <>
      <EventsSearch />
      <EventList items={events} />
    </>
  )
}

export default EventsPage

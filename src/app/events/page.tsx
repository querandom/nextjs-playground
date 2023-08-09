import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import EventsSearchBar from './events-search-bar'

async function EventsPage() {
  const events = await fetchEvents()

  return (
    <>
      <EventsSearchBar />
      <EventList items={events} />
    </>
  )
}

export default EventsPage

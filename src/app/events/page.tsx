import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import EventsSearchBar from './events-search-bar'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'NextJS Events',
  description: 'All events.',
}

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

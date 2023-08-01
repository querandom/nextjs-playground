'use client'

import EventList from '@/components/events/event-list'
import EventsSearch from '@/components/events/events-search'
import { getAllEvents } from '@/data/dummy-data'
import { useRouter } from 'next/navigation'

function EventsPage() {
  const events = getAllEvents()
  const router = useRouter()

  function onSearchHandler({ year, month }: { year: string; month: string }) {
    const eventPage = `/events/${year}/${month}`

    router.push(eventPage)
  }

  return (
    <>
      <EventsSearch onSearch={onSearchHandler} />
      <EventList items={events} />
    </>
  )
}

export default EventsPage

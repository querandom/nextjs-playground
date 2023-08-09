import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { filterFeaturedEvents } from '@/data/utils'

export default async function Home() {
  const events = await fetchEvents()
  const featuredEvents = filterFeaturedEvents(events)

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

import EventList from '@/components/events/event-list'
import { getFeaturedEvents } from '@/data/dummy-data'

export default function Home() {
  const events = getFeaturedEvents()

  return (
    <div>
      <EventList items={events} />
    </div>
  )
}

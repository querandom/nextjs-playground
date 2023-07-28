import EventContent from '@/components/event-detail/event-content'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventSummary from '@/components/event-detail/event-summary'
import { getEventById } from '@/data/dummy-data'

export default function EventDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const event = getEventById(id)

  if (!event) {
    return <p>Event not found</p>
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

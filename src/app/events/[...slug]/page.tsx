import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { fetchEvents } from '@/data/fetch-events'
import { filterEventsByDate } from '@/data/utils'
import { parseSlug } from './utils'
import { Metadata } from 'next/types'

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const { year, month } = parseSlug(params.slug)
  return {
    title: `Filtered Events`,
    description: `All events for ${year}/${month}`,
  }
}

export interface FilteredEventsProps {
  params: { slug: string[] }
}

export default async function FilteredEvents({ params }: FilteredEventsProps) {
  const { year, month } = parseSlug(params.slug)

  if (isNaN(year) || isNaN(month)) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filters. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    )
  }

  const events = await fetchEvents()
  const filteredEvents = filterEventsByDate(events, {
    year: year,
    month: month,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    )
  }

  const date = new Date(year, month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { getFilteredEvents } from '@/data/dummy-data'

export interface FilteredEventsProps {
  params: { slug: string[] }
}

export default function FilteredEvents({ params }: FilteredEventsProps) {
  const [yearValue, monthValue] = params.slug

  const yearNumb = +yearValue
  const monthNumb = +monthValue

  if (isNaN(yearNumb) || isNaN(monthNumb)) {
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

  const filteredEvents = getFilteredEvents({ year: yearNumb, month: monthNumb })

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

  const date = new Date(yearNumb, monthNumb - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

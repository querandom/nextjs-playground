import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { getAllEvents } from '@/data/dummy-data'
import { AwesomeEvent } from '@/data/types'
import { filterEventsByDate } from '@/data/utils'
import { useEvents } from '@/hooks/use-events'
import { GetServerSideProps } from 'next/types'

export interface FilteredEventsProps {
  date?: {
    year: number
    month: number
  }
  hasError?: boolean
  events?: AwesomeEvent[]
}

export default function FilteredEvents({
  hasError,
  events,
  date,
}: FilteredEventsProps) {
  if (hasError) {
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

  if (!events || events.length === 0) {
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

  const displayDate =
    date?.year && date?.month
      ? new Date(date?.year, date?.month - 1)
      : new Date()

  return (
    <>
      <ResultsTitle date={displayDate} />
      <EventList items={events} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  FilteredEventsProps
> = async (context) => {
  const { params } = context
  const [yearValue, monthValue] = (params?.slug as string[] | undefined) || []
  const year = +yearValue
  const month = +monthValue

  if (isNaN(year) || isNaN(month)) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
    }
  }

  const allEvents = await getAllEvents()
  const filteredEvents = filterEventsByDate(allEvents, { year, month })
  return {
    props: {
      events: filteredEvents,
      date: {
        year,
        month,
      },
    },
  }
}

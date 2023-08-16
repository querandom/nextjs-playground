// Below my implementation of the example:
import Head from 'next/head'

import { useEffect, useState } from 'react'

import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'

import { AwesomeEvent } from '@/data/types'
import { useParams } from 'next/navigation'
import { useEvents } from '@/hooks/use-events'

export interface FilteredEventsPageProps {
  date?: {
    year: number
    month: number
  }
  hasError?: boolean
  events?: AwesomeEvent[]
}

export default function FilteredEventsPage(props: FilteredEventsPageProps) {
  const [loadedEvents, setLoadedEvents] = useState<AwesomeEvent[]>()
  const params = useParams()

  const filterData = params.slug

  const { events, error } = useEvents()

  useEffect(() => {
    if (events) {
      const events: AwesomeEvent[] = []

      for (const key in events) {
        events.push(events[key])
      }

      setLoadedEvents(events)
    }
  }, [events])

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`A list of filtered events.`} />
    </Head>
  )

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    )
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  )

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

/*
*
My implementation:
import EventList from '@/components/events/event-list'
import ResultsTitle from '@/components/events/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert'
import { getAllEvents } from '@/data/dummy-data'
import { AwesomeEvent } from '@/data/types'
import { filterEventsByDate } from '@/data/utils'
import Head from 'next/head'
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
  const head = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${date?.year}/${date?.month}`}
      />
    </Head>
  )

  if (hasError) {
    return (
      <>
        {head}
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
        {head}
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
      {head}
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
**/

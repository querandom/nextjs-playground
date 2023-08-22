import EventList from '@/components/events/event-list'
import { fetchEvents } from '@/data/fetch-events'
import { filterFeaturedEvents } from '@/data/utils'
import { Metadata } from 'next'
import NewsletterRegistration from '@/components/input/newsletter-registration'

// export const metadata: Metadata = {
//   title: 'NextJS Events',
//   description: 'This is description for engine crawlers.',
// }

export default async function Home() {
  const events = await fetchEvents()
  const featuredEvents = filterFeaturedEvents(events)

  return (
    <div>
      {/* <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="This is description for engine crawlers."
        />
      </Head> */}
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
}

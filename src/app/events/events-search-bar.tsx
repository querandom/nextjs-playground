'use client'

import { useRouter } from 'next/navigation'

import EventsSearch from '@/components/events/events-search'

export default function EventsSearchBar() {
  const router = useRouter()

  function onSearchHandler({ year, month }: { year: string; month: string }) {
    const eventPage = `/events/${year}/${month}`

    router.push(eventPage)
  }

  return <EventsSearch onSearch={onSearchHandler} />
}

import useSWR from 'swr'

import { EVENTS_URL } from '@/constants'
import { fetchEvents } from '@/data/fetch-events'

export const useEvents = () => {
  const { data, error, isLoading } = useSWR(EVENTS_URL, fetchEvents)

  return { events: data, error, isLoading }
}

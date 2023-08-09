import { EVENTS_URL } from '@/constants'
import { fetcher } from '@/utils/fetcher'
import { AwesomeEvent } from './types'
import { fromObjectToArray } from '@/utils/from-object-to-array'

export interface EventsData {
  [key: string]: AwesomeEvent
}

export const fetchEvents = async (): Promise<AwesomeEvent[]> => {
  const response = await fetcher<EventsData>(EVENTS_URL)
  const eventsArray = fromObjectToArray(response)

  return eventsArray
}

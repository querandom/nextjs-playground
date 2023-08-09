import { AwesomeEvent } from '@/data/types'
import EventItem from './event-item'

import classes from './event-list.module.css'

export interface EventListProps {
  items: AwesomeEvent[]
}
export default function EventList({ items }: EventListProps) {
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem
          key={item.id}
          title={item.title}
          id={item.id}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </ul>
  )
}

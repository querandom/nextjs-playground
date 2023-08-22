import { useEffect, useState } from 'react'
import classes from './comment-list.module.css'
import { Comment } from './types'
import { fetcher } from '@/utils/fetcher'

export interface CommentList {
  eventId: string
}

function CommentList({ eventId }: CommentList) {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const result = await fetcher<{ comments: Comment[] }>(
        `/api/events/${eventId}/comments`
      )
      const comments = result.comments
      setComments(comments)
    }

    fetchEvents()
  }, [eventId])
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((data) => (
        <li key={data.id}>
          <p>{data.text}</p>
          <div>
            By <address>{data.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList

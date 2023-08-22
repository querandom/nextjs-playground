'use client'
import { useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import { CommentPostData } from './types'
import { fetcher } from '@/utils/fetcher'

export interface CommentsProps {
  eventId: string
}

export default function Comments(props: CommentsProps) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  async function addCommentHandler(commentData: CommentPostData) {
    // send data to API
    try {
      await fetcher(`/api/events/${eventId}/comments`, {
        method: 'post',
        body: JSON.stringify(commentData),
      })
    } catch (e) {
      console.log('Error posting comment')
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId} />}
    </section>
  )
}

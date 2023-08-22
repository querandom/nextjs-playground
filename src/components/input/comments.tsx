'use client'
import { useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import { CommentPostData } from './types'
import { fetcher } from '@/utils/fetcher'
import { Comment } from './types'
import { useNotificationContext } from '@/store/notification-context'

export interface CommentsProps {
  eventId: string
}

export default function Comments(props: CommentsProps) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [loadingEvents, setLoadingEvents] = useState(false)

  const notificationCtx = useNotificationContext()

  useEffect(() => {
    let loading = true

    async function fetchEvents() {
      setLoadingEvents(true)
      const result = await fetcher<{ comments: Comment[] }>(
        `/api/events/${eventId}/comments`
      )
      if (loading) {
        const comments = result.comments

        setLoadingEvents(false)
        setComments(comments)
      }
    }

    if (showComments) {
      fetchEvents()
    }

    return () => {
      loading = false
    }
  }, [eventId, showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  async function addCommentHandler(commentData: CommentPostData) {
    try {
      notificationCtx.showNotification({
        title: 'Posting comment...',
        message: 'Saving comment for this event.',
        status: 'pending',
      })
      const newComment = await fetch(`/api/events/${eventId}/comments`, {
        method: 'post',
        body: JSON.stringify(commentData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }

          return response.json().then((data: { message?: string }) => {
            throw new Error(data?.message || 'Something went wrong!')
          })
        })
        .then((data: { comment: Comment }) => {
          notificationCtx.showNotification({
            title: 'Success!',
            message: 'Successfully comment posted.',
            status: 'success',
          })
          return data.comment
        })

      setComments((prev) => [newComment, ...prev])
    } catch (e: any) {
      notificationCtx.showNotification({
        title: 'Posting comment...',
        message: e?.message || 'Something went wrong!',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loadingEvents && <p>Loading comments...</p>}
      {showComments && !loadingEvents && <CommentList comments={comments} />}
    </section>
  )
}

import classes from './comment-list.module.css'
import { Comment } from './types'

export interface CommentListProps {
  comments: Comment[]
}

function CommentList({ comments }: CommentListProps) {
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

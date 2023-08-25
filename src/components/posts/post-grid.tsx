import { Post } from '@libs/post-utils'
import classes from './post-grid.module.css'

import PostItem from './post-item'

export interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <ul className={classes.grid}>
      {posts.map((p) => (
        <PostItem key={p.slug} post={p} />
      ))}
    </ul>
  )
}

import { Post } from '@libs/post-utils'
import classes from './all-posts.module.css'
import PostGrid from './post-grid'

export interface AllPostsProps {
  posts: Post[]
}

export default function AllPosts({ posts }: AllPostsProps) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}

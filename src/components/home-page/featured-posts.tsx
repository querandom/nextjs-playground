import { Post } from '@libs/post-utils'
import PostGrid from '../posts/post-grid'
import classes from './featured-posts.module.css'

export interface FeaturedPostsProps {
  posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  )
}

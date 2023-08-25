import AllPosts from '@/components/posts/all-posts'
import { getAllPosts } from '@libs/post-utils'

export default function AllPostsPage() {
  const allPosts = getAllPosts()

  return <AllPosts posts={allPosts} />
}

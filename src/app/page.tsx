import FeaturedPosts from '@/components/home-page/featured-posts'
import Hero from '@/components/home-page/hero'
import { getFeaturedPosts } from '@libs/post-utils'
import type { Post } from '@libs/post-utils'
import { Metadata } from 'next/types'

export interface HomePageProps {
  posts: Post[]
}

export default function HomePage() {
  const posts = getFeaturedPosts()

  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  )
}

// export const revalidate = 60
// export function getStaticProps() {
//   const featuredPosts = getFeaturedPosts()

//   return {
//     props: {
//       posts: featuredPosts,
//     },
//     revalidate: 60,
//   }
// }

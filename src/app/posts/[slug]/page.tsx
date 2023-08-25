import PostContent from '@/components/posts/post-detail/post-content'
import {
  getAllPosts,
  getPostData,
  getPostSlugFromFileName,
  getPostsFiles,
} from '@libs/post-utils'
import { Metadata } from 'next'

interface Params {
  slug: string
}

export interface PostPageProps {
  params: Params
}

export const generateMetadata = ({ params }: { params: Params }): Metadata => {
  const { slug } = params
  const post = getPostData(slug)

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const { slug } = params
  const post = getPostData(slug)

  if (!post) {
    return <p>Post not found</p>
  }

  return <PostContent post={post} />
}

// export const revalidate = 60
// true is default
// export const dynamicParams = true
export const dynamicParams = false

export const generateStaticParams = (): Params[] => {
  const postsFiles = getPostsFiles()

  return postsFiles.map((fileName) => {
    return {
      slug: getPostSlugFromFileName(fileName),
    }
  })
}

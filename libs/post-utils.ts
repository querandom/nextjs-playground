import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

export interface PostData {
  data: {
    title: string
    date: string
    image: string
    excerpt: string
    isFeatured: boolean
  }
  content: string
}

export interface Post {
  slug: string
  title: string
  date: string
  image: string
  excerpt: string
  isFeatured: boolean
  content: string
}

const postsDir = path.join(process.cwd(), 'content/posts')

export function getPostsFiles() {
  return fs.readdirSync(postsDir)
}

export function getPostSlugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, '')
}

function getPostFileNameFromSlug(slug: string) {
  return `${slug}.md`
}

export function getPostData(fileIdentifier: string) {
  const postSlug = getPostSlugFromFileName(fileIdentifier)

  const filePath = path.join(postsDir, getPostFileNameFromSlug(postSlug))
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const { data, content } = matter(fileContent)

  const postData: Post = {
    slug: postSlug,
    // data cannot be properly typed
    ...(data as any),
    content,
  }

  return postData
}

export function getAllPosts() {
  const postFiles = getPostsFiles()

  const allPostsData = postFiles.map(getPostData)
  const sortedPosts = allPostsData.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  )

  return sortedPosts
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter((p) => p.isFeatured)

  return featuredPosts
}

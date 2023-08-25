import Image from 'next/image'
import ReactMarkDown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

import PostHeader from './post-header'

import classes from './post-content.module.css'
import { Post } from '@libs/post-utils'

export interface PostContentProps {
  post: Post
}

export default function PostContent({ post }: PostContentProps) {
  const { title, slug, image, content } = post
  const getImagePath = (imgName: string) => `/images/posts/${slug}/${imgName}`
  const imagePath = getImagePath(image)

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkDown
        components={{
          p(paragraphProps) {
            const { node, children } = paragraphProps
            const child = node.children[0]

            if (child.type === 'element' && child.tagName == 'img') {
              const src = child.properties?.src
              const alt = child.properties?.alt
              return (
                <div className={classes.image}>
                  <Image
                    src={getImagePath(
                      typeof src === 'string' && !!src ? src : ''
                    )}
                    alt={typeof alt === 'string' && !!alt ? alt : ''}
                    width={600}
                    height={300}
                  />
                </div>
              )
            }
            return <p>{children}</p>
          },
          code(codeProps) {
            const { children, className } = codeProps
            const match = /language-(\w+)/.exec(className || '')

            if (match) {
              return (
                <SyntaxHighlighter language={match[1]} style={atomDark}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              )
            }
            return <code {...codeProps} />
          },
          // img({ src, alt }) {
          //   if (!src) {
          //     return
          //   }

          //   return (
          //     <div className={classes.image}>
          //       <Image
          //         src={getImagePath(src)}
          //         alt={alt || ''}
          //         width={600}
          //         height={300}
          //       />
          //     </div>
          //   )
          // },
        }}
      >
        {content}
      </ReactMarkDown>
    </article>
  )
}

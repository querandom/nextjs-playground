import Image from 'next/image'

import classes from './post-header.module.css'

export interface PostHeaderProps {
  title: string
  image: string
}

export default function PostHeader({ title, image }: PostHeaderProps) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} height={150} width={200} priority={true} />
    </header>
  )
}

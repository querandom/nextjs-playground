import Link from 'next/link'

import classes from './button.module.css'

export interface ButtonProps extends React.PropsWithChildren {
  link?: string
  onClick?: () => void
}
export default function Button({ link, onClick, children }: ButtonProps) {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  )
}

import classes from './logistics-item.module.css'

export interface LogisticsItemProps extends React.PropsWithChildren {
  icon: React.ReactNode
}

function LogisticsItem(props: LogisticsItemProps) {
  const { icon } = props

  return (
    <li className={classes.item}>
      <span className={classes.icon}>{icon}</span>
      <span className={classes.content}>{props.children}</span>
    </li>
  )
}

export default LogisticsItem

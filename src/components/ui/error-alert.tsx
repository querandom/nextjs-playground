import classes from './error-alert.module.css'

export interface ErrorAlertProps extends React.PropsWithChildren {}

export default function ErrorAlert(props: ErrorAlertProps) {
  return <div className={classes.alert}>{props.children}</div>
}

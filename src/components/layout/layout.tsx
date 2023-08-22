'use client'
import { Fragment, PropsWithChildren } from 'react'

import MainHeader from '../main-header/main-header'
import Notification from '../ui/notification'
import { useNotificationContext } from '../../store/notification-context'

export default function Layout(props: PropsWithChildren) {
  const notificationCtx = useNotificationContext()

  const activeNotification = notificationCtx.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  )
}

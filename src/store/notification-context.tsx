'use client'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Notification {
  title: string
  message: string
  status: string
}

interface Context {
  notification: Notification | null
  showNotification: (notificationData: Notification) => void
  hideNotification: () => void
}

const NotificationContext = createContext<Context>({
  notification: null,
  showNotification: () => null,
  hideNotification: () => null,
})

export const useNotificationContext = () => {
  return useContext(NotificationContext)
}

export function NotificationContextProvider(props: PropsWithChildren) {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null)

  function showNotificationHandler(notificationData: Notification) {
    setActiveNotification(notificationData)
  }

  function hideNotificationHandler() {
    setActiveNotification(null)
  }

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification?.status === 'error')
    ) {
      const timeout = setTimeout(() => {
        setActiveNotification(null)
      }, 3000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [activeNotification])

  const contextValue: Context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={contextValue}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

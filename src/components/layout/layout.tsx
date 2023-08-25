import { PropsWithChildren } from 'react'
import MainNavigation from './main-navigation'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavigation />
      {children}
    </>
  )
}

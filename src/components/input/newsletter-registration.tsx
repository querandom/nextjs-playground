'use client'

import { FormEvent, useRef, useState } from 'react'
import classes from './newsletter-registration.module.css'
import { useNotificationContext } from '@/store/notification-context'

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false)
  const notificationCtx = useNotificationContext()

  const emailRef = useRef<HTMLInputElement>(null)

  async function registrationHandler(event: FormEvent) {
    event.preventDefault()

    const enteredEmail = emailRef.current?.value
    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      setIsInvalid(true)
      return
    }

    try {
      notificationCtx.showNotification({
        title: 'Signing up...',
        message: 'Registering for newsletter.',
        status: 'pending',
      })

      await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!')
          })
        })
        .then((data) => {
          notificationCtx.showNotification({
            title: 'Success!',
            message: 'Successfully registered for newsletter.',
            status: 'success',
          })

          return data
        })
    } catch (e: any) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: e?.message || 'Something went wrong!',
        status: 'error',
      })
    }
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
            onChange={() => setIsInvalid(false)}
          />
          <button disabled={isInvalid}>Register</button>
        </div>
        {isInvalid && <p>Please enter a valid email address!</p>}
      </form>
    </section>
  )
}

export default NewsletterRegistration

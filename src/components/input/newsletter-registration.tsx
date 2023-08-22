'use client'

import { FormEvent, useRef, useState } from 'react'
import classes from './newsletter-registration.module.css'
import { fetcher } from '@/utils/fetcher'

function NewsletterRegistration() {
  const [isInvalid, setIsInvalid] = useState(false)

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
      await fetcher('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
        }),
      })
    } catch (e) {
      console.log('Error subscribing to newsletter')
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

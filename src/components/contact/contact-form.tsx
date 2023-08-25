'use client'

import { FormEvent, useEffect, useState } from 'react'
import classes from './contact-form.module.css'
import Notification from '../ui/notification'

interface ContactDetails {
  email: string
  name: string
  message: string
}

async function sendContactData(contactDetails: ContactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      contentType: 'application/json',
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')

  const [requestStatus, setRequestStatus] = useState<string | null>(null)

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault()

    setRequestStatus('pending')

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      })
      setRequestStatus('success')
      setEnteredEmail('')
      setEnteredName('')
      setEnteredMessage('')
    } catch (e) {
      setRequestStatus('error')
    }
  }

  let notification
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message....',
      message: 'Your message is on its way',
    }
  } else if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!',
    }
  } else if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: 'Please try again later!',
    }
  }

  return (
    <section className={classes.contact}>
      <h1>Hey how can I help you?</h1>

      <form action="" className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="name">Your Name</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  )
}

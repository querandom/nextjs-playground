'use client'

import { FormEvent, useRef } from 'react'
import Button from '../ui/button'

import classes from './events-search.module.css'

export default function EventsSearch() {
  const yearRef = useRef()
  const monthRef = useRef()

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
      <div className={classes.controls}>
        <div className={classes.controls}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>

          <div className={classes.controls}>
            <label htmlFor="month">Month</label>
            <select name="month" id="month" ref={monthRef}>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  )
}

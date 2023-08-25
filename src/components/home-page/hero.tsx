import Image from 'next/image'

import classes from './hero.module.css'

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/querandom.jpg"
          alt="An image showing me"
          height={300}
          width={300}
        />
      </div>
      <h1>{`Hi, I'm Pablo`}</h1>
      <p>I blog about random stuff.</p>
    </section>
  )
}

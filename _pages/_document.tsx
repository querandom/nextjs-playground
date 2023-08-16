import Document, { Head, Html, Main, NextScript } from 'next/document'
import { JSX } from 'react'

export default class MyApp extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

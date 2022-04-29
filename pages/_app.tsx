import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/layout.scss'
import '../styles/index.scss'
import '../styles/cardItem.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

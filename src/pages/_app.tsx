import { AppProps } from 'next/app'
import { MessageContextProvider } from '../contexts/messageContext'
import './_app.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MessageContextProvider>
      <Component {...pageProps} />
    </MessageContextProvider>
  )
}

export default MyApp

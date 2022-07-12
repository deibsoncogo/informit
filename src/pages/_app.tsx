import { AppProps } from 'next/app'
import { MessageContextProvider } from '../contexts/messageContext'
import './_app.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MessageContextProvider>
      <Component {...pageProps} />
    </MessageContextProvider>
  )
}

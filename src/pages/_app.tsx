import { AppProps } from 'next/app'
import { CommitContextProvider } from '../contexts/commitContext'
import { MessageContextProvider } from '../contexts/messageContext'
import './_app.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommitContextProvider>
      <MessageContextProvider>
        <Component {...pageProps} />
      </MessageContextProvider>
    </CommitContextProvider>
  )
}

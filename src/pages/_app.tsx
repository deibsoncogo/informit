import { AppProps } from 'next/app'
import { Header } from '../components/header'
import { CommitContextProvider } from '../contexts/commitContext'
import { MessageContextProvider } from '../contexts/messageContext'
import './_app.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommitContextProvider>
      <MessageContextProvider>
        <Header />
        <Component {...pageProps} />
      </MessageContextProvider>
    </CommitContextProvider>
  )
}

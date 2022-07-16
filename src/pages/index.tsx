import { useEffect } from 'react'
import { Header } from '../components/header'
import { ListCommit } from '../components/listCommit'
import { Search } from '../components/search'
import { UseMessage } from '../contexts/messageContext'
import style from './index.module.scss'

export default function Index() {
  const { CreateMessage } = UseMessage()

  useEffect(() => {
    setTimeout(() => {
      CreateMessage({
        description: 'Para entrar em contato utilizei o WhatsApp, (16) 99708-4454',
        isError: false,
      })
    }, 1000 * 60 * 30)
  }, [CreateMessage])

  return (
    <div className={style.index}>
      <title>Informit</title>

      <Header />
      <Search />
      <ListCommit />
    </div>
  )
}

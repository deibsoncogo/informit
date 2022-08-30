import { UseMessage } from '../../contexts/messageContext'
import style from './style.module.scss'

export function Header() {
  const { message } = UseMessage()

  return (
    <header className={style.header}>
      <h1 className={style.title}>
        Informit
      </h1>

      <strong id={message?.isError ? style.error : ''} className={style.message}>
        {message?.description}
      </strong>
    </header>
  )
}

import style from './style.module.scss'

type TProps = {
  message: string
  url: string
  author: string
  date: string
}

export function Commit({ message, url, author, date }: TProps) {
  return (
    <div className={style.commit}>
      <span className={style.information}>
        <strong className={style.message}>{message}</strong>
        <p className={style.url}>{url}</p>
      </span>

      <span className={style.information}>
        <p>{author}</p>
        <p>{date}</p>
      </span>
    </div>
  )
}

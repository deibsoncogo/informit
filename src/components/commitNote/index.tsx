import style from './style.module.scss'

type TProps = {
  commitMessage: string
  commitUrl: string
}

export function CommitNote({ commitMessage, commitUrl }: TProps) {
  return (
    <div className={style.commitNote}>
      <strong className={style.message}>{commitMessage}</strong>

      <a href={commitUrl} target='_blank' rel='noreferrer'>
        <p className={style.url}>{commitUrl}</p>
      </a>
    </div>
  )
}

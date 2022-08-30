import style from './style.module.scss'

type TProps = {
  commitMessage: string
  commitUrl: string
  commitDate: string
  authorName: string
  authorLogin: string
  authorAvatarUrl: string
  authorHtmlUrl: string
  repositoryFullName: string
  repositoryName: string
  repositoryDescription: string
}

export function Commit({
  commitMessage, commitUrl, commitDate, authorName, authorLogin, authorAvatarUrl, authorHtmlUrl,
  repositoryFullName, repositoryName, repositoryDescription,
}: TProps) {
  const urlRepository = `https://github.com/${repositoryFullName}`
  const newDate = new Date(commitDate)

  return (
    <aside className={style.commit}>
      <div className={style.commitNote}>
        <strong>{commitMessage}</strong>

        <a tabIndex={-1} href={commitUrl} target='_blank' className={style.commitUrl}>
          <p>{commitUrl}</p>
        </a>
      </div>

      <div className={style.commitExtra}>
        <span className={style.information}>
          <a
            tabIndex={-1}
            href={urlRepository}
            target='_blank'
            title={`
              ${repositoryName || ''}
              ${repositoryDescription || ''}
            `}
          >
            <strong className={style.repositoryName}>{repositoryName}</strong>
          </a>

          <a tabIndex={-1} href={authorHtmlUrl} target='_blank' title={authorLogin}>
            <strong className={style.authorName}>{authorName}</strong>
          </a>
        </span>

        <span className={style.dateTime}>
          <strong className={style.time} title={newDate.toTimeString()}>
            {newDate.toLocaleTimeString()}
          </strong>

          <strong
            className={style.date}
            title={newDate.toLocaleDateString(
              [],
              { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' },
            )}
          >
            {newDate.toLocaleDateString()}
          </strong>
        </span>

        <a tabIndex={-1} href={authorHtmlUrl} target='_blank'>
          <img src={authorAvatarUrl} alt='Avatar' className={style.avatar} />
        </a>
      </div>
    </aside>
  )
}

import style from './style.module.scss'

type TProps = {
  commitDate: string
  authorName: string
  authorLogin: string
  authorAvatarUrl: string
  authorHtmlUrl: string
  repositoryFullName: string
  repositoryName: string
  repositoryDescription: string
  repositoryOwnerType: string
}

export function CommitExtra({
  commitDate, authorName, authorLogin, authorAvatarUrl, authorHtmlUrl,
  repositoryFullName, repositoryName, repositoryDescription, repositoryOwnerType,
}: TProps) {
  const newDate = new Date(commitDate)

  return (
    <div className={style.commitExtra}>
      <span className={style.information}>
        <a
          href={`https://github.com/${repositoryFullName}`}
          title={repositoryDescription}
          id={repositoryOwnerType}
          target='_blank'
          rel='noreferrer'
        >
          <strong className={style.repositoryName}>{repositoryName}</strong>
        </a>

        <a
          href={authorHtmlUrl}
          title={`login: ${authorLogin}`}
          target='_blank'
          rel='noreferrer'
        >
          <p className={style.authorName}>{authorName}</p>
        </a>
      </span>

      <span className={style.dateTime}>
        <strong
          className={style.time}
          title={newDate.toTimeString()}
        >{newDate.toLocaleTimeString()}
        </strong>

        <p
          className={style.date}
          title={newDate.toLocaleDateString(
            [],
            { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' },
          )}
        >
          {newDate.toLocaleDateString()}
        </p>
      </span>

      <a href={authorHtmlUrl} target='_blank' rel='noreferrer'>
        <img className={style.avatar} src={authorAvatarUrl} alt='Foto' />
      </a>
    </div>
  )
}

/* eslint-disable camelcase */
import { UseCommit } from '../../contexts/commitContext'
import { Commit } from '../commit'
import style from './style.module.scss'

export function ListCommit() {
  const { commits } = UseCommit()

  const messageError = 'Erro 404'

  return (
    <div className={style.listCommit}>
      {commits?.map(({ sha, html_url, commit, author, repository }) => (
        <Commit
          key={sha + Math.random()}
          commitMessage={commit ? commit.message : messageError}
          commitUrl={html_url || messageError}
          commitDate={commit ? commit.author.date : messageError}
          authorName={commit ? commit.author.name : messageError}
          authorLogin={author ? author.login : messageError}
          authorAvatarUrl={author ? author.avatar_url : messageError}
          authorHtmlUrl={author ? author.html_url : messageError}
          repositoryFullName={repository ? repository.full_name : messageError}
          repositoryName={repository ? repository.name : messageError}
          repositoryDescription={repository ? repository.description : messageError}
        />
      ))}
    </div>
  )
}

/* eslint-disable camelcase */
import { UseCommit } from '../../contexts/commitContext'
import { Commit } from '../commit'
import style from './style.module.scss'

export function ListCommit() {
  const { commits } = UseCommit()

  return (
    <div className={style.listCommit}>
      <section className={style.commitNote}>
        {commits?.map(({ sha, html_url, commit, author, repository }) => (
          <Commit
            key={sha}
            commitMessage={commit.message}
            commitUrl={html_url}
            commitDate={commit.author.date}
            authorName={commit.author.name}
            authorLogin={author.login}
            authorAvatarUrl={author.avatar_url}
            authorHtmlUrl={author.html_url}
            repositoryFullName={repository.full_name}
            repositoryName={repository.name}
            repositoryDescription={repository.description}
          />
        ))}
      </section>
    </div>
  )
}

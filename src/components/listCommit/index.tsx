/* eslint-disable camelcase */
import { UseCommit } from '../../contexts/commitContext'
import { CommitExtra } from '../commitExtra'
import { CommitNote } from '../commitNote'
import style from './style.module.scss'

export function ListCommit() {
  const { commits } = UseCommit()

  return (
    <div className={style.listCommit}>
      <section className={style.commitNote}>
        {commits?.map(({ sha, html_url, commit }) => (
          <CommitNote
            key={sha}
            commitMessage={commit.message}
            commitUrl={html_url}
          />
        ))}
      </section>

      <section className={style.commitExtra}>
        {commits?.map(({ sha, commit, author, repository }) => (
          <CommitExtra
            key={sha}
            commitDate={commit.author.date}
            authorName={commit.author.name}
            authorLogin={author.login}
            authorAvatarUrl={author.avatar_url}
            authorHtmlUrl={author.html_url}
            repositoryFullName={repository.full_name}
            repositoryName={repository.name}
            repositoryDescription={repository.description}
            repositoryOwnerType={repository.owner.type}
          />
        ))}
      </section>
    </div>
  )
}

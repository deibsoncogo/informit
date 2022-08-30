import { Fragment } from 'react'
import { UseCommit } from '../../contexts/commitContext'
import { NumberRandomInteger } from '../../utils/numberRandomInteger'
import { Commit } from '../commit'
import style from './style.module.scss'

export function ListCommit() {
  const hoursInterval = 6
  let hourNext = 24
  let commitFirst = true
  let dateLast: undefined | string[]

  const { commits } = UseCommit()

  function ImplementationSeparatorCommit(dateTime: string) {
    const date = String(dateTime).match(/\d+/g).splice(0, 3)
    const hour = new Date(dateTime).getHours()

    if (dateLast && (date[0] !== dateLast[0] || date[1] !== dateLast[1] || date[2] !== dateLast[2])) {
      hourNext = 24
    }

    dateLast = date

    if (hour < hourNext) {
      while (hour < hourNext) {
        hourNext -= hoursInterval
      }

      if (!commitFirst) {
        return (
          <div className={style.separatorCommit}>
            <div className={style.separator} />
          </div>
        )
      }

      commitFirst = false
    }
  }

  return (
    <section className={style.listCommit}>
      {commits?.map(({ sha, html_url, commit, author, repository }) => (
        <Fragment key={NumberRandomInteger()}>
          {ImplementationSeparatorCommit(commit.author.date)}

          <Commit
            key={sha + NumberRandomInteger()}
            commitMessage={commit ? commit.message : undefined}
            commitUrl={html_url || undefined}
            commitDate={commit ? commit.author.date : undefined}
            authorName={commit ? commit.author.name : undefined}
            authorLogin={author ? author.login : undefined}
            authorAvatarUrl={author ? author.avatar_url : undefined}
            authorHtmlUrl={author ? author.html_url : undefined}
            repositoryFullName={repository ? repository.full_name : undefined}
            repositoryName={repository ? repository.name : undefined}
            repositoryDescription={repository ? repository.description : undefined}
          />
        </Fragment>
      ))}
    </section>
  )
}

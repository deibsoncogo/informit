import { Fragment, useState } from 'react'
import { UseCommit } from '../../contexts/commitContext'
import { NumberRandomInteger } from '../../utils/numberRandomInteger'
import { Commit } from '../commit'
import style from './style.module.scss'

export function ListCommit() {
  const hoursInterval = 6
  const [hourNext, setHourNext] = useState(24)
  const [dateLast, setDateLast] = useState(undefined)
  const [commitFirst, setCommitFirst] = useState(true)

  const { commits } = UseCommit()

  console.clear()

  function ImplementationDividerCommit(dateTime) {
    const date = String(dateTime).match(/\d+/g).splice(0, 3)
    const hour = new Date(dateTime).getHours()
    console.log('-----> commit', date, hour)

    if (dateLast && (date[0] !== dateLast[0] || date[1] !== dateLast[1] || date[2] !== dateLast[2])) {
      setHourNext(24)
    }

    setDateLast(date)

    if (hour < hourNext) {
      while (hour < hourNext) {
        setHourNext(hourNext - hoursInterval)
        console.log('hourNext =>', typeof hourNext, hourNext)
      }

      if (!commitFirst) {
        console.log('SEPARADOR APLICADO \n')

        setCommitFirst(false)
        return <section className={style.dividerCommit}><p /></section>
      }
    }

    console.log('FIM \n')
  }

  return (
    <div className={style.listCommit}>
      {commits?.map(({ sha, html_url, commit, author, repository }) => (
        <Fragment key={NumberRandomInteger()}>
          {ImplementationDividerCommit(commit.author.date)}

          <Commit
            key={sha + NumberRandomInteger()}
            commitMessage={commit ? commit.message : ''}
            commitUrl={html_url || ''}
            commitDate={commit ? commit.author.date : ''}
            authorName={commit ? commit.author.name : ''}
            authorLogin={author ? author.login : ''}
            authorAvatarUrl={author ? author.avatar_url : ''}
            authorHtmlUrl={author ? author.html_url : ''}
            repositoryFullName={repository ? repository.full_name : ''}
            repositoryName={repository ? repository.name : ''}
            repositoryDescription={repository ? repository.description : ''}
          />
        </Fragment>
      ))}
    </div>
  )
}

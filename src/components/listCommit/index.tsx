import { UseCommit } from '../../contexts/commitContext'
import { Commit } from '../commit'
import style from './style.module.scss'

export function ListCommit() {
  const { commits } = UseCommit()

  return (
    <div className={style.listCommit}>
      {commits?.map((commit) => (
        <Commit
          key={commit.sha}
          message={commit.commit.message}
          url={commit.html_url}
          author='Deibson Cogo'
          date='12/07/2022'
        />
      ))}
    </div>
  )
}

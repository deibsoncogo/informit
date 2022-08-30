import { ListCommit } from '../components/listCommit'
import { Search } from '../components/search'
import style from './index.module.scss'

export default function Index() {
  return (
    <main className={style.index}>
      <title>Informit</title>

      <Search />
      <ListCommit />
    </main>
  )
}

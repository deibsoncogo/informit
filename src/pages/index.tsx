import { Header } from '../components/header'
import { ListCommit } from '../components/listCommit'
import { Search } from '../components/search'
import style from './index.module.scss'

export default function Index() {
  return (
    <div className={style.index}>
      <Header />

      <main>
        <Search />
        <ListCommit />
      </main>

      <footer />
    </div>
  )
}

import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { UseCommit } from '../../contexts/commitContext'
import { UseMessage } from '../../contexts/messageContext'
import style from './style.module.scss'

export function Search() {
  const { CreateMessage, DeleteMessage } = UseMessage()
  const { SaveCommits } = UseCommit()

  const [d, m, y] = new Date().toLocaleDateString().split('/')

  const [repository, setRepository] = useState('')
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(`${y}-${m}-${d}`)

  useEffect(() => {
    setRepository(localStorage.getItem('@informit:repository') || '')
    setAuthor(localStorage.getItem('@informit:author') || '')
    setEmail(localStorage.getItem('@informit:email') || '')
  }, [])

  async function SearchCommits(event: FormEvent) {
    event.preventDefault()

    SaveCommits(undefined)

    if (!repository && !author && !email && !date) {
      return CreateMessage({ description: 'Não foi informado nenhum critério de pesquisa', isError: true })
    }

    if (repository && (!author && !email && !date)) {
      return CreateMessage({ description: 'Informe mais um critério de pesquisa', isError: true })
    }

    const [yy, mm, dd] = date.split('-')

    if (new Date(Number(yy), Number(mm) - 1, Number(dd)) > new Date()) {
      return CreateMessage({ description: 'Não é possível informar data futura', isError: true })
    }

    const url = `https://api.github.com/search/commits?q=
      ${repository && `repo:${repository}+`}
      ${author && `author:${author}+`}
      ${email && `author-email:${email}+`}
      ${date && `author-date:${date}`}
    &per_page=100&page=1&sort=author-date&order=desc`

    await axios.get(url)
      .then((response) => {
        localStorage.clear()
        repository && localStorage.setItem('@informit:repository', repository)
        author && localStorage.setItem('@informit:author', author)
        email && localStorage.setItem('@informit:email', email)

        SaveCommits(response.data.items)

        DeleteMessage()

        if (response.data.total_count < 1) {
          return CreateMessage({ description: 'Não existe commit para ser recuperado', isError: false })
        }

        if (response.data.total_count > 100) {
          return CreateMessage({ description: 'Só é possível recuperar 100 commits por vez', isError: true })
        }

        return true
      })
      .catch((error) => {
        console.error('error =>', error)

        SaveCommits(undefined)

        CreateMessage({
          description: error.response.status === 422
            ? 'Critério de pesquisa inválido'
            : 'Aconteceu um erro inesperado',
          isError: true,
        })
      })
  }

  return (
    <form className={style.search}>
      <div className={style.searchSubGroup}>
        <span className={`${style.spanSearch} ${style.repository}`}>
          <label htmlFor='repository'>Nome do repositório</label>
          <input
            type='text'
            name='repository'
            spellCheck='false'
            placeholder='github/readme'
            value={repository}
            onChange={(event) => { setRepository(event.target.value) }}
            id='repository'
          />
        </span>

        <span className={`${style.spanSearch} ${style.author}`}>
          <label htmlFor='author'>Login do autor</label>
          <input
            type='text'
            name='author'
            spellCheck='false'
            placeholder='dev'
            value={author}
            onChange={(event) => { setAuthor(event.target.value) }}
            id='author'
          />
        </span>
      </div>

      <div className={style.searchSubGroup}>
        <span className={`${style.spanSearch} ${style.email}`}>
          <label htmlFor='email'>E-mail do autor</label>
          <input
            type='email'
            name='email'
            spellCheck='false'
            placeholder='dev@github.com'
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            id='email'
          />
        </span>

        <span className={`${style.spanSearch} ${style.date}`}>
          <label htmlFor='date'>Data do commit</label>
          <input
            type='date'
            name='date'
            placeholder='13/07/2022'
            value={date}
            onChange={(event) => { setDate(event.target.value) }}
            id='date'
          />
        </span>
      </div>

      <button type='submit' onClick={(event) => { SearchCommits(event) }} className={style.buttonSearch}>
        Buscar
      </button>
    </form>
  )
}

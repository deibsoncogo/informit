import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { TCommit, UseCommit } from '../../contexts/commitContext'
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

    DeleteMessage()
    SaveCommits(undefined)

    if (!repository && !author && !email && !date) {
      return CreateMessage({ description: 'Não foi informado nenhum critério de pesquisa', isError: true })
    }

    if (date) {
      const [yy, mm, dd] = date.split('-')

      if (new Date(Number(yy), Number(mm) - 1, Number(dd)) > new Date()) {
        return CreateMessage({ description: 'Não é possível informar uma data futura', isError: true })
      }
    }

    if (repository) {
      try {
        await axios.get(`https://api.github.com/repos/${repository}/commits?per_page=100&page=1`)
      } catch (error) {
        return CreateMessage({ description: 'Nome completo do repositório inválido', isError: true })
      }
    }

    if (author) {
      try {
        await axios.get(`https://api.github.com/users/${author}`)
      } catch (error) {
        return CreateMessage({ description: 'Login do autor inválido', isError: true })
      }
    }

    try {
      const isOnlyRepository = repository && (!author && !email && !date)
      let baseUrl: string

      if (isOnlyRepository) {
        baseUrl = `https://api.github.com/repos/${repository}/commits?per_page=100&page=1`
      } else {
        baseUrl = `https://api.github.com/search/commits?q=
        ${author && `author:${author}+`}
        ${email && `author-email:${email}+`}
        ${date && `author-date:${date}+`}
        ${repository && `repo:${repository}+`}
      &per_page=100&page=1&sort=author-date&order=desc`
      }

      const response = await axios.get(baseUrl)

      localStorage.clear()
      repository && localStorage.setItem('@informit:repository', repository)
      author && localStorage.setItem('@informit:author', author)
      email && localStorage.setItem('@informit:email', email)

      let data: TCommit[]

      if (isOnlyRepository) {
        data = response.data
      } else {
        data = response.data.items
      }

      if (isOnlyRepository) {
        for (const commit of data) {
          const [owner, name] = repository.split('/')

          const commitRepository = {
            repository: {
              name,
              full_name: repository,
              description: '',
              owner: { login: owner },
            },
          }

          Object.assign(commit, commitRepository)
        }
      }

      SaveCommits(data)

      if (data.length < 1) {
        return CreateMessage({ description: 'Não existe commit para ser recuperado', isError: false })
      }

      if (data.length >= 100) {
        return CreateMessage({
          description: 'Só é possível recuperar os últimos 100 commits por vez',
          isError: true,
        })
      }

      return CreateMessage({
        description: `Foi encontrado ${data.length} commit${data.length > 1 && 's'}`,
        isError: false,
      })
    } catch (error) {
      console.error('error =>', error)
      return CreateMessage({ description: 'Aconteceu um erro inesperado', isError: true })
    }
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

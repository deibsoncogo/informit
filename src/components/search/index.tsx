import { FormEvent, useState } from 'react'
import axios from 'axios'
import { UseCommit } from '../../contexts/commitContext'
import { UseMessage } from '../../contexts/messageContext'
import style from './style.module.scss'

export function Search() {
  const { CreateMessage, DeleteMessage } = UseMessage()
  const { SaveCommits } = UseCommit()

  const [owner, setOwner] = useState('')
  const [repository, setRepository] = useState('')
  const [author, setAuthor] = useState('')
  const [periodTo, setPeriodTo] = useState('')
  const [periodFrom, setPeriodFrom] = useState('')

  async function SearchCommits(event: FormEvent) {
    event.preventDefault()

    if (!owner) {
      return CreateMessage({ description: 'Não foi informado o login do proprietário', isError: true })
    }

    if (!repository) {
      return CreateMessage({ description: 'Não foi informado o nome do repositório', isError: true })
    }

    await axios.get(`https://api.github.com/repos/${owner}/${repository}/commits?per_page=100&page=1`)
      .then((response) => {
        SaveCommits(response.data)

        DeleteMessage()

        response.data.length > 100 && CreateMessage({
          description: 'Você ultrapassou o limite de 100 commits por pesquisa',
          isError: true,
        })
      })
      .catch((error) => {
        localStorage.clear()

        SaveCommits(undefined)

        CreateMessage({
          description: error.response.status === 404
            ? 'Dados informado não pertencem a nenhum repositório'
            : 'Aconteceu um erro inesperado',
          isError: true,
        })
      })
  }

  return (
    <form className={style.search}>
      <span>
        <label htmlFor='owner'>Proprietário</label>
        <input
          type='text'
          id='owner'
          name='owner'
          placeholder='github'
          value={owner}
          onChange={(event) => { setOwner(event.target.value) }}
        />
      </span>

      <span>
        <label htmlFor='repository'>Repositório</label>
        <input
          type='text'
          id='repository'
          name='repository'
          placeholder='readme'
          value={repository}
          onChange={(event) => { setRepository(event.target.value) }}
        />
      </span>

      <span>
        <label htmlFor='author'>Autor</label>
        <input
          disabled
          type='text'
          id='author'
          name='author'
          placeholder='dev'
          value={author}
          onChange={(event) => { setAuthor(event.target.value) }}
        />
      </span>

      <span>
        <label htmlFor='periodTo'>Período inicial</label>
        <input
          disabled
          type='datetime-local'
          id='periodTo'
          name='periodTo'
          value={periodTo}
          onChange={(event) => { setPeriodTo(event.target.value) }}
        />
      </span>

      <span>
        <label htmlFor='periodFrom'>Período final</label>
        <input
          disabled
          type='datetime-local'
          id='periodFrom'
          name='periodFrom'
          value={periodFrom}
          onChange={(event) => { setPeriodFrom(event.target.value) }}
        />
      </span>

      <button type='submit' onClick={(event) => { SearchCommits(event) }} className={style.buttonSearch}>
        Buscar
      </button>
    </form>
  )
}

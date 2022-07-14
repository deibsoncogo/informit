import { createContext, ReactNode, useContext, useState } from 'react'

type TCommit = {
  sha: string
  commit: {
    author: {
      name: string
      date: string
    }
    message: string
  }
  author: {
    login: string
    avatar_url: string
    html_url: string
  }
  repository: {
    full_name: string
    name: string
    owner: {
      login: string
      type: string
    }
    description: string
  }
  html_url: string
}

type TCommitContext = {
  commits: TCommit[]
  SaveCommits: (data: TCommit[]) => void
}

type TCommitContextProvider = {
  children: ReactNode,
}

const CommitContext = createContext({} as TCommitContext)

export function CommitContextProvider({ children }: TCommitContextProvider) {
  const [commits, setCommits] = useState<TCommit[]>()

  function SaveCommits(data: TCommit[]): void {
    setCommits(data)
  }

  return (
    <CommitContext.Provider value={{
      commits,
      SaveCommits,
    }}
    >
      {children}
    </CommitContext.Provider>
  )
}

export const UseCommit = () => useContext(CommitContext)

import { createContext, ReactNode, useContext, useState } from 'react'

type TCommit = {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
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

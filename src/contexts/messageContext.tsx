import { createContext, ReactNode, useState, useContext } from 'react'

type TMessage = {
  description: string
  isError: boolean
}

type TMessageContext = {
  message: TMessage
  CreateMessage: ({ description, isError }: TMessage) => void
  DeleteMessage: () => void
}

type TMessageContextProvider = {
  children: ReactNode,
}

const MessageContext = createContext({} as TMessageContext)

export function MessageContextProvider({ children }: TMessageContextProvider) {
  const [message, setMessage] = useState<TMessage>()

  function CreateMessage({ description, isError }: TMessage): void {
    setMessage({ description, isError })
  }

  function DeleteMessage(): void {
    setMessage(null)
  }

  return (
    <MessageContext.Provider value={{
      message,
      CreateMessage,
      DeleteMessage,
    }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export const UseMessage = () => useContext(MessageContext)

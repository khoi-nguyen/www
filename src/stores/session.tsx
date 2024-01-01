import { createContext, useContext } from 'solid-js'
import { login, logout, isAdmin } from '~/server/auth'

interface SessionProviderProps {
  children?: JSX.Element
}

export function makeContext() {
  const admin = createServerData$(isAdmin)
  const [_, handleLogout] = createServerAction$(logout)
  const [loggingIn, { Form }] = createServerAction$(login)
  const PasswordField = () => <input type="password" name="password" />

  return [
    () => admin() === true,
    {
      logout: () => {
        handleLogout()
      },
      loggingIn,
      PasswordField,
      Form,
    },
  ] as const
}

type SessionContextType = ReturnType<typeof makeContext>
const SessionContext = createContext<SessionContextType>()
export const useSession = () => useContext(SessionContext)!

export function SessionProvider(props: SessionProviderProps) {
  return <SessionContext.Provider value={makeContext()}>{props.children}</SessionContext.Provider>
}

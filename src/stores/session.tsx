import { createContext, useContext } from 'solid-js';
import { createServerData$, createServerAction$ } from 'solid-start/server';
import { logout, isLoggedIn } from '~/lib/server/auth';

interface SessionProviderProps {
  children?: JSX.Element;
}

export function makeContext() {
  const admin = createServerData$(async (_, event) => {
    return await isLoggedIn(event.request);
  });

  const [_, handleLogout] = createServerAction$(async (_, event) => {
    return await logout(event.request);
  });

  return [
    () => admin() === true,
    {
      logout: () => {
        handleLogout();
      },
    },
  ] as const;
}

type SessionContextType = ReturnType<typeof makeContext>;
const SessionContext = createContext<SessionContextType>();
export const useSession = () => useContext(SessionContext);

export function SessionProvider(props: SessionProviderProps) {
  return <SessionContext.Provider value={makeContext()}>{props.children}</SessionContext.Provider>;
}

import meta from './login.json';
import { createServerData$, createServerAction$ } from 'solid-start/server';
import { login, logout, isLoggedIn } from '~/lib/server/auth';

export default () => {
  const [loggingIn, { Form }] = createServerAction$(async (data: FormData, event) => {
    const password = data.get('password') as string;
    return login(event.request, password);
  });

  const isAdmin = createServerData$(async (_, event) => {
    return await isLoggedIn(event.request);
  });

  const [_, handleLogout] = createServerAction$(async (_, event) => {
    return await logout(event.request);
  });

  return (
    <Page meta={meta}>
      <Show when={!isAdmin()}>
        <Form>
          <label for="password">Password: </label>
          <input type="password" name="password" />
          <input type="submit" disabled={loggingIn.pending} />
        </Form>
      </Show>
      <Show when={isAdmin()}>
        <button
          onClick={() => {
            handleLogout();
          }}
        >
          Log out
        </button>
      </Show>
    </Page>
  );
};

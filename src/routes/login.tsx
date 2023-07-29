import meta from './login.json';
import { createServerAction$ } from 'solid-start/server';
import { login } from '~/lib/server/auth';

export default () => {
  const [loggingIn, { Form }] = createServerAction$(async (data: FormData, event) => {
    const password = data.get('password') as string;
    return login(event.request, password);
  });

  const [admin, { logout }] = useSession()!;

  return (
    <Page meta={meta}>
      <Show when={!admin()}>
        <Form>
          <label for="password">Password: </label>
          <input type="password" name="password" />
          <input type="submit" disabled={loggingIn.pending} />
        </Form>
      </Show>
      <Show when={admin()}>
        <p>You are already logged in.</p>
        <button onClick={logout}>Log out</button>
      </Show>
    </Page>
  );
};

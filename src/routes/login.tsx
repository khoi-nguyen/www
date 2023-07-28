import { createServerAction$ } from 'solid-start/server';
import { login } from '~/lib/auth';

export const meta = {
  title: 'Login',
  description: 'Login page',
};

export default () => {
  const [loggingIn, { Form }] = createServerAction$(async (data: FormData, { request }) => {
    const password = data.get('password') as string;
    return login(request, password);
  });

  return (
    <Page meta={meta}>
      <Form>
        <label for="password">Password: </label>
        <input type="password" name="password" />
        <input type="submit" disabled={loggingIn.pending} />
      </Form>
    </Page>
  );
};

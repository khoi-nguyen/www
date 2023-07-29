import meta from './login.json';

export default () => {
  const [admin, { logout, PasswordField, Form }] = useSession();

  return (
    <Page meta={meta}>
      <Show when={!admin()}>
        <Form>
          <label for="password">Password: </label>
          <PasswordField />
          <input type="submit" />
        </Form>
      </Show>
      <Show when={admin()}>
        <p>You are already logged in.</p>
        <button onClick={logout}>Log out</button>
      </Show>
    </Page>
  );
};

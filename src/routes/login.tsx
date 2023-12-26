import meta from './login.json';

export default () => {
  const [admin, { logout, loggingIn, PasswordField, Form }] = useSession();

  return (
    <Page meta={meta}>
      <Show when={!admin()}>
        <Form>
          <label for="password">Password: </label>
          <PasswordField />
          <input type="submit" />
        </Form>
        <Show when={loggingIn.error}>{(error) => <p>{error().formError}</p>}</Show>
      </Show>
      <Show when={admin()}>
        <p>You are already logged in.</p>
        <Button onClick={logout}>Log out</Button>
      </Show>
    </Page>
  );
};

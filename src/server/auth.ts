import { createCookieSessionStorage, FormError } from 'solid-start';

const storage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 30 * 24 * 3600,
    name: 'session',
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SECRET_KEY || 'secret_key'],
    secure: process.env.NODE_END === 'production',
  },
});

const fromRequest = (event: ServerFunctionEvent) => {
  return storage.getSession(event.request.headers.get('Cookie'));
};

export async function login(data: FormData, event: ServerFunctionEvent) {
  const session = await fromRequest(event);
  const admin = data.get('password') === (process.env.ADMIN_PASSWORD || 'admin');
  if (!admin) {
    throw new FormError('The password you have entered is incorrect.');
  }
  session.set('admin', admin);
  return new Response('Logged in', {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export async function isAdmin(_: void, event: ServerFunctionEvent) {
  const session = await fromRequest(event);
  return session.get('admin');
}

export async function logout(_: void, event: ServerFunctionEvent) {
  const session = await fromRequest(event);
  return new Response('Logged out', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

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

const fromRequest = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'));
};

export async function login(request: Request, password: string) {
  const session = await fromRequest(request);
  const admin = password === (process.env.ADMIN_PASSWORD || 'admin');
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

export async function isLoggedIn(request: Request) {
  const session = await fromRequest(request);
  return session.get('admin');
}

export async function logout(request: Request) {
  const session = await fromRequest(request);
  return new Response('Logged out', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

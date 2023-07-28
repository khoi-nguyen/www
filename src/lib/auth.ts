import { createCookieSessionStorage, redirect } from 'solid-start';

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
  session.set('admin', admin);
  return new Response(admin ? 'Logged in' : 'Authentication failed', {
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
  return redirect('/', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

// @refresh reload
import './root.scss'
import { Suspense } from 'solid-js'
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts } from 'solid-start'
import { lang } from '~/lib/signals'
import { SessionProvider } from '~/stores/session'

export default function Root() {
  return (
    <Html lang={lang()}>
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <SessionProvider>
              <Routes>
                <FileRoutes />
              </Routes>
            </SessionProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}

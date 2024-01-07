import { HttpStatusCode } from 'solid-start/server'

const meta: Metadata = {
  title: 'Page Not Found',
  subtitle: '404 Error',
  description: 'The requested page does not exist',
}

export default () => (
  <Page meta={meta}>
    <HttpStatusCode code={404} />
  </Page>
)

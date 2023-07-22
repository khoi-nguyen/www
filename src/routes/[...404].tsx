import { HttpStatusCode } from 'solid-start/server';

export const meta = {
  title: 'Page Not Found',
  subtitle: '404 Error',
  description: 'The requested page does not exist',
};

export default () => (
  <Page meta={meta}>
    <HttpStatusCode code={404} />
  </Page>
);

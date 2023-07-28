import meta from './404.json';
import { HttpStatusCode } from 'solid-start/server';

export default () => (
  <Page meta={meta}>
    <HttpStatusCode code={404} />
  </Page>
);

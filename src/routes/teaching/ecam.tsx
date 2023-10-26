import meta from './ecam.json';
import logo from '~/assets/ecam.svg';

type Metadata = Parameters<typeof Meta>[0];
interface Page extends Metadata {
  path: string;
}

const title = (page: Page) => {
  let suffix = '';
  if (page.path.endsWith('-b/')) {
    suffix = ' (B)';
  }
  return (
    <>
      {page.title}
      {suffix}
    </>
  );
};

export default () => {
  return (
    <Page meta={meta}>
      <div class="has-text-centered">
        <img src={logo} alt="ECAM Brussels Engineering School" style={{ 'max-height': '200px' }} />
      </div>
      <Explorer
        filter={(page) => page.subtitle?.startsWith('ECAM') === true}
        pattern={`teaching/.*/index\.json$`}
        title={title}
      />
    </Page>
  );
};

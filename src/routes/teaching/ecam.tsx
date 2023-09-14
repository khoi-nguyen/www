import meta from './ecam.json';
import logo from '~/assets/ecam.svg';

export default () => {
  return (
    <Page meta={meta}>
      <div class="has-text-centered">
        <img src={logo} alt="ECAM Brussels Engineering School" style={{ 'max-height': '200px' }} />
      </div>
      <Explorer
        filter={(page) => page.subtitle?.startsWith('ECAM') === true}
        pattern={`teaching/.*/index\.json$`}
        showPath
      />
    </Page>
  );
};

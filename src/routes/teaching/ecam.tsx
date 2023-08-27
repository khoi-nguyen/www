import meta from './ecam.json';

export default () => {
  return (
    <Page meta={meta}>
      <Explorer
        filter={(page) => page.subtitle?.startsWith('ECAM') === true}
        pattern={`teaching/.*/index\.json$`}
      />
    </Page>
  );
};

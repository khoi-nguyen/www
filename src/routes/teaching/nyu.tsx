import meta from './nyu.json';

export default () => {
  return (
    <Page meta={meta}>
      <Explorer
        filter={(page) => page.subtitle?.startsWith('NYU') === true}
        pattern={`teaching/.*/index\.json$`}
      />
    </Page>
  );
};

import meta from './index.json';

export default () => {
  return (
    <Page meta={meta}>
      <h2>Current Courses</h2>
      <Explorer pattern="teaching/.*/index.json$" filter={(page) => page.current === true} />
    </Page>
  );
};

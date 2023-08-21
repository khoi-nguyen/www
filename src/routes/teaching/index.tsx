import meta from './index.json';

export default () => {
  return (
    <Page meta={meta}>
      <h2>Courses</h2>
      <Explorer pattern="teaching/.*/index.json$" />
    </Page>
  );
};

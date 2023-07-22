export const meta = {
  title: 'Teaching',
  description: "List of all the courses I've taught since September 2023",
};

export default () => (
  <Page meta={meta}>
    <h2>Courses</h2>
    <Explorer pattern="teaching/.*/index.tsx$" />
  </Page>
);

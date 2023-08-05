import meta from './index.json';

export default () => {
  const [search, setSearch] = createSignal('');

  return (
    <Page meta={meta}>
      <div class="columns">
        <h2>Courses</h2>
        <div class="is-vcentered">
          <label>
            Search: <input value={search()} onInput={(event) => setSearch(event.target.value)} />
          </label>
        </div>
      </div>
      <Explorer pattern="teaching/.*/index.json$" filter={search()} />
    </Page>
  );
};

import meta from './index.json';
import type { Page } from '~/components/Explorer';

function isMatch(page: Page, searchString: string): boolean {
  if (!searchString) {
    return true;
  }
  for (const [_, value] of Object.entries(page)) {
    if (typeof value === 'string' || value instanceof String) {
      if (value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
        return true;
      }
    }
  }
  return false;
}

export default () => {
  const [search, setSearch] = createSignal('');
  return (
    <Page meta={meta}>
      <div class="columns is-vcentered">
        <h1>Teaching</h1>
        <div>
          <input
            type="text"
            value={search()}
            onInput={(event) => setSearch(event.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <h2>Current Courses</h2>
      <Explorer
        pattern="teaching/.*/index.json$"
        filter={(page) => page.current === true && isMatch(page, search())}
        showFlags
      />
      <h2>Archive</h2>
      <Explorer
        pattern="teaching/.*/index.json$"
        filter={(page) => page.current === false && isMatch(page, search())}
        showFlags
      />
    </Page>
  );
};

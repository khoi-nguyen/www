import meta from './index.json';
import type { Page } from '~/components/Explorer';

function transform(str: string): string {
  return value.toLowerCase();
}

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
  const [showArchive, setShowArchive] = createSignal(false);

  createEffect(() => {
    if (search() && !showArchive()) {
      setShowArchive(true);
    } else if (!search()) {
      setShowArchive(false);
    }
  });

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
      <details open={showArchive()}>
        <summary>Show previous courses</summary>
        <Explorer
          pattern="teaching/.*/index.json$"
          filter={(page) => page.current === false && isMatch(page, search())}
          showFlags
        />
      </details>
    </Page>
  );
};

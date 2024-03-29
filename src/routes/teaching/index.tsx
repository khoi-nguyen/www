import type { Page } from '~/components/Explorer'

const meta: Metadata = {
  title: 'Teaching',
  description: "List of all the courses I've taught since September 2023",
  hideHeader: true,
}

function isMatch(page: Page, searchString: string): boolean {
  if (!searchString) {
    return true
  }
  for (const [_, value] of Object.entries(page)) {
    if (typeof value === 'string' || value instanceof String) {
      if (value.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
        return true
      }
    }
  }
  return false
}

function title(page: Page) {
  if (!page.split) {
    return page.title
  }
  const suffix = page.path.endsWith('-b/') ? ' (B)' : ' (A)'
  return page.title + suffix
}

export default () => {
  const [search, setSearch] = createSignal('')

  const [showArchive, setShowArchive] = createSignal(true)
  const toggle = () => setShowArchive(!showArchive())
  createEffect(() => {
    if (search() && !showArchive()) {
      setShowArchive(true)
    }
  })

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
        title={title}
      />
      <h2>Archive</h2>
      <details open onToggle={toggle}>
        <summary>{showArchive() ? 'Hide' : 'Show'} previous courses</summary>
        <Explorer
          pattern="teaching/.*/index.json$"
          filter={(page) => page.current === false && isMatch(page, search())}
          showFlags
        />
      </details>
    </Page>
  )
}

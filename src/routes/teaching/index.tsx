import meta from './index.json';

export default () => {
  const [search, setSearch] = createSignal('');
  return (
    <Page meta={meta}>
      <div class="columns is-vcentered">
        <h1>Teaching</h1>
        <div>
          <input type="text" value={search()} onInput={(event) => setSearch(event.target.value)} />
        </div>
      </div>
      <h2>Current Courses</h2>
      <Explorer
        pattern="teaching/.*/index.json$"
        filter={(page) =>
          page.current === true && (!search() || page.title.indexOf(search()) !== -1)
        }
        showFlags
      />
      <h2>Archive</h2>
      <Explorer
        pattern="teaching/.*/index.json$"
        filter={(page) =>
          page.current === false && (!search() || page.title.indexOf(search()) !== -1)
        }
        showFlags
      />
    </Page>
  );
};

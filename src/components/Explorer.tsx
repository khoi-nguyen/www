interface ExplorerProps {
  filter?: string;
  pattern: string;
}

export default function Explorer(props: ExplorerProps) {
  const navigate = useNavigate();
  const modules = import.meta.glob('~/routes/**/*.json');
  const [pages] = createResource(props.pattern, async (pattern) => {
    const regex = new RegExp(pattern);
    return await Promise.all(
      Object.keys(modules)
        .filter((path) => {
          return regex.test(path.replace('~/routes', ''));
        })
        .map(async (path) => {
          const meta = (await modules[path]()) as Parameters<typeof Meta>[0];
          return {
            path: path.replace(/\/src\/routes(.*?)(index)?\.json$/, '$1'),
            ...meta,
          };
        }),
    );
  });
  const filtered = () => {
    return (pages() || []).filter((page) => {
      return (
        Object.entries(page).filter(([_, value]) => {
          return value
            .toString()
            .toLowerCase()
            .includes((props.filter || '').toLowerCase());
        }).length > 0
      );
    });
  };

  return (
    <div class="grid">
      <For each={filtered()}>
        {(page) => (
          <article class="card" onClick={() => navigate(page.path)} style={{ cursor: 'pointer' }}>
            <hgroup>
              <h3>
                <A href={page.path}>{page.title}</A>
              </h3>
              <Show when={page.subtitle}>
                <h4>{page.subtitle}</h4>
              </Show>
              {page.description}
            </hgroup>
          </article>
        )}
      </For>
    </div>
  );
}

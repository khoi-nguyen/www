export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter((path) => path);
  const modules = import.meta.glob('~/routes/**/*.json');
  const [links] = createResource(async () => {
    return await Promise.all(
      parts.map(async (_, i) => {
        const path = '/' + parts.slice(0, i + 1).join('/');
        const key: keyof typeof modules = [path, path + '/index']
          .map((s) => `/src/routes${s}.json`)
          .filter((p) => Object.keys(modules).includes(p))[0];
        const meta = (await modules[key]()) as Parameters<typeof Meta>[0];
        return {
          ...meta,
          path,
        };
      }),
    );
  });

  return (
    <Show when={!links.loading && links()!.length}>
      <nav id="breadcrumbs">
        <ul>
          <li>
            <A href="/">
              <strong>nguyen.me.uk</strong>
            </A>
          </li>
          <For each={links()}>
            {(link) => (
              <li>
                <A href={link.path}>{link.title}</A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </Show>
  );
}

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter((path) => path);
  const modules = import.meta.glob('~/routes/**/*.tsx', { import: 'meta' });
  const [links] = createResource(async () => {
    return await Promise.all(
      parts.map(async (_, i) => {
        const path = '/' + parts.slice(0, i + 1).join('/');
        const key: keyof typeof modules = [path, path + '/index']
          .map((s) => `/src/routes${s}.tsx`)
          .filter((p) => Object.keys(modules).includes(p))[0];
        const meta = (await modules[key]()) as Parameters<typeof Meta>[0];
        return {
          title: meta.title,
          path,
        };
      }),
    );
  });

  return (
    <Show when={links}>
      <nav id="breadcrumbs">
        <ul>
          <li>
            <A href="/">nguyen.me.uk</A>
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

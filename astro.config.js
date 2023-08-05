import node from '@astrojs/node';
import { defineConfig } from 'astro/config';
import start from 'solid-start/astro';
import AutoImport from 'unplugin-auto-import/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    AutoImport({
      include: [/\.[tj]sx?$/],
      dirs: ['./src/components'],
      imports: [
        {
          '~/lib/literals': ['py', 'tex'],
          '~/stores/session': ['useSession'],
          'solid-js': [
            'children',
            'createEffect',
            'createResource',
            'createSignal',
            'mergeProps',
            'onCleanup',
            'onMount',
            'Component',
            'Dynamic',
            'For',
            'Match',
            'Show',
            'Suspense',
            'Switch',
          ],
          'solid-start': ['A', 'useLocation', 'useNavigate'],
        },
        {
          from: 'solid-js',
          imports: ['Component', 'JSX'],
          type: true,
        },
      ],
    }),
    start(),
  ],
  vite: {
    worker: {
      format: 'es',
    },
  },
});

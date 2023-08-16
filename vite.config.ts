import solid from 'solid-start/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
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
            'on',
            'onCleanup',
            'onMount',
            'Dynamic',
            'For',
            'Match',
            'Show',
            'Suspense',
            'Switch',
          ],
          'solid-js/store': ['createStore'],
          'solid-start': ['A', 'useLocation', 'useNavigate'],
          'solid-start/server': ['createServerAction$', 'createServerData$'],
        },
        {
          from: 'solid-js',
          imports: ['Component', 'JSX'],
          type: true,
        },
        {
          from: 'solid-start',
          imports: ['ServerFunctionEvent'],
          type: true,
        },
      ],
    }),
    solid(),
  ],
  worker: {
    format: 'es',
  },
});

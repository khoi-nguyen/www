import solid from 'solid-start/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/],
      dirs: ['./src/components', './src/components/maths'],
      imports: [
        {
          '~/lib/literals': [
            'jupyter',
            'py',
            'plot',
            'tex',
            'mermaid',
            'react',
            'svelte',
            'js',
            'ts',
            'html',
          ],
          '~/stores/session': ['useSession'],
          '~/stores/boards': ['useBoards'],
          '~/lib/request': ['request'],
          'solid-js': [
            'children',
            'createEffect',
            'createMemo',
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
          '~/gql/gql': ['graphql'],
          'solid-js/store': ['createStore'],
          'solid-start': ['A', 'useLocation', 'useNavigate', 'useRouteData'],
          'solid-start/server': ['createServerAction$', 'createServerData$'],
          'dedent-js': [['default', 'dedent']],
        },
        {
          from: '~/components/Meta',
          imports: ['Metadata'],
          type: true,
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
})

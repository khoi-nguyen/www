import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  documents: ['src/**/*.tsx'],
  schema: 'http://localhost:8000/graphql',
  emitLegacyCommonJSImports: false,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        scalars: { MathExpression: { input: 'string', output: 'string' } },
      },
    },
  },
}

export default config

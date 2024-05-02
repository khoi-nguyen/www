import type { CodegenConfig } from '@graphql-codegen/cli'

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://api.nguyen.me.uk/graphql'
    : 'http://localhost:8000/graphql'

const config: CodegenConfig = {
  overwrite: true,
  documents: ['src/**/*.tsx'],
  schema: url,
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

import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { request as gRequest } from 'graphql-request'

type Args = Parameters<typeof gRequest>
export function request<T extends Args[1]>(
  query: T,
  variables: VariablesOf<T>,
): Promise<ResultOf<T>> {
  return gRequest('http://localhost:8000', query, variables as Args[2]) as Promise<ResultOf<T>>
}

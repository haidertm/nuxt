import { print, type DocumentNode } from 'graphql';

export const queryFormatter = (query: DocumentNode) => {
  if (typeof query === 'object' && query.kind === 'Document') {
    return print(query);
  }
  return query;
}

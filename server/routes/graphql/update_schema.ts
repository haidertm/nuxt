import * as fs from 'node:fs';
import * as path from 'node:path';
import { getIntrospectionQuery } from 'graphql/utilities';
import { buildClientSchema, printSchema } from 'graphql';

import { defineEventHandler } from 'h3';

const m2BaseUrl = process.env.NUXT_PUBLIC_MAGENTO_BASE_URL;
const baseUrl = m2BaseUrl?.endsWith('/') ? m2BaseUrl : m2BaseUrl + '/';

const updateSchema = async () => {
  const endpoint = baseUrl + 'graphql';
  const outputFilePath = `./schema.graphql`;
  const introspectionQuery = getIntrospectionQuery();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const result = await response.json();

  // Convert the introspection result to a GraphQL schema object
  const schema = buildClientSchema(result.data);

  // Convert the GraphQL schema object to a string in SDL format
  const schemaSDL = printSchema(schema);

  // If no file or path, create one
  const directoryPath = path.dirname(outputFilePath);
  fs.mkdirSync(directoryPath, { recursive: true });

  // Write the SDL string to the output file
  fs.writeFileSync(outputFilePath, schemaSDL);
  return true;
};

export default defineEventHandler(async () => {
  try {
    return updateSchema();
  } catch (error) {
    return error;
  }
});

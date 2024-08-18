import axios, { type AxiosInstance } from 'axios';
import { print } from 'graphql';
import { gql } from 'graphql-tag';

let axiosClient: AxiosInstance | undefined = undefined;

function logRequest (query: string, variables: string, userToken: string | null) {
  console.log('elastic-suite>>debug>>token', userToken);
  console.log('elastic-suite>>debug>>Query:', query);
  console.log('elastic-suite>>debug>>Variables:', variables);
}

function getClient () {
  // let { graphql: storeCode } = config.extensions.elasticSuite;
  const url = 'https://m2dev.trepanel.ae/graphql';

  if (!url) {
    return false;
  }

  if (!axiosClient) {
    axiosClient = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        'Store': 'default'
      }
    });
  }

  return {
    query: async (query: any, variables: any, userToken = null) => {
      let queryString = query;
      if (userToken && axiosClient) {
        axiosClient.defaults.headers['Authorization'] = 'Bearer ' + userToken;
      }

      // Check if the query is an AST object and convert it to a string if needed
      if (typeof query === 'object' && query.kind === 'Document') {
        queryString = print(query);
      }
      logRequest(queryString, variables, userToken);

      // Log the headers that will be sent with the request
      console.log('elastic-suite>>axios>>Request Headers:', axiosClient?.defaults.headers);

      try {
        // console.log('elastic-suite>>>Query and Variables to send:', JSON.stringify({ query, variables }));
        const response = await axiosClient?.post('', {
          // query: queryString,
          query: queryString,
          variables
        });
        // console.log('elastic-suite>>axios>>Request:', response.config); // Print the request details
        // console.log('elastic-suite>>axios>>Response:', response.data); // Print the response data
        return response?.data;
      } catch (error) {
        console.error('Error executing querysd:', error);
        throw error;
      }
    }
  };
}

export { getClient };

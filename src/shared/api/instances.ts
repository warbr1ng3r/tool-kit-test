import { GraphQLClient } from 'graphql-request';

export const api = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
});

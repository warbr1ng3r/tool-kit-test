import { gql } from 'graphql-request';

export type Owner = {
  login: string;
};

export type Repository = {
  id: string;
  name: string;
  owner: Owner;
  stargazerCount: number;
  updatedAt: string;
  description?: string;
};

export type RepositoryEdge = {
  node: Repository;
};

export type SearchResult = {
  search: {
    edges: RepositoryEdge[];
    pageInfo: {
      startCursor: string;
      endCursor: string;
    };
    repositoryCount: number;
  };
};

export const GQL_reposByName = gql`
  query (
    $name: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    search(
      query: $name
      type: REPOSITORY
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
      }
    }
  }
`;

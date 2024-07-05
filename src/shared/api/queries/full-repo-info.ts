import { gql } from 'graphql-request';

export type Owner = {
  login: string;
  url: string;
  avatarUrl?: string;
};

export type Language = {
  name: string;
};

export type Languages = {
  nodes: Language[];
};

export type RepositoryInfo = {
  repository: {
    name: string;
    stargazerCount: number;
    updatedAt: string;
    owner: Owner;
    languages: Languages;
    description?: string;
  };
};

export const GQL_fullRepoInfo = gql`
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      updatedAt
      owner {
        login
        url
        avatarUrl
      }
      languages(first: 100) {
        nodes {
          name
        }
      }
      description
    }
  }
`;

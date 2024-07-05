import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/api/instances';
import {
  GQL_reposByName,
  SearchResult
} from '@/shared/api/queries/repos-by-name';
import { $name } from 'src/widgets/name-searchbar';
import {
  goPreviousPage,
  goNextPage,
  $currentPage,
  $totalPages
} from '@/widgets/repos-paginator';
import { KEYS_LOCAL_STORAGE, setLocalItemFx } from '@/shared/local-storage';
import { appStarted } from '@/shared/config/app';

export const $data = createStore<
  | {
      id: string;
      name: string;
      login: string;
    }[]
  | null
>(null);
export const $error = createStore<string>('');
export const $pending = createStore(false);

const $startCursor = createStore('');
const $endCursor = createStore('');
sample({
  clock: $name,
  filter: (name) => name !== localStorage.getItem(KEYS_LOCAL_STORAGE.name),
  target: $currentPage.reinit
});

sample({
  clock: appStarted,
  fn: () => {
    return localStorage.getItem(KEYS_LOCAL_STORAGE.startCursor) || '';
  },
  target: $startCursor
});
sample({
  clock: $startCursor,
  fn: (value) => {
    return {
      value: value,
      key: KEYS_LOCAL_STORAGE.startCursor
    };
  },
  target: setLocalItemFx
});

sample({
  clock: appStarted,
  fn: () => {
    return localStorage.getItem(KEYS_LOCAL_STORAGE.endCursor) || '';
  },
  target: $endCursor
});
sample({
  clock: $endCursor,
  fn: (value) => {
    return {
      value: value,
      key: KEYS_LOCAL_STORAGE.endCursor
    };
  },
  target: setLocalItemFx
});

const getNameReposFx = createEffect<
  {
    name: string;
    after?: string;
    before?: string;
  },
  SearchResult
>(async ({ name, after, before }) => {
  if (before) {
    return await api.request(GQL_reposByName, {
      name: name,
      last: 10,
      before
    });
  } else {
    return await api.request(GQL_reposByName, {
      name: name,
      first: 10,
      after
    });
  }
});

$startCursor.on(
  getNameReposFx.doneData,
  (_, payload) => payload.search.pageInfo.startCursor
);
$endCursor.on(
  getNameReposFx.doneData,
  (_, payload) => payload.search.pageInfo.endCursor
);

$data
  .on(getNameReposFx.doneData, (_, payload) =>
    payload.search.edges.map((el) => {
      return {
        id: el.node.id,
        name: el.node.name,
        login: el.node.owner.login
      };
    })
  )
  .reset($name);

$error
  .on(getNameReposFx.failData, (_, payload) => payload.message)
  .reset($name);

$pending.on(getNameReposFx.pending, (_, payload) => payload);

sample({
  source: {
    name: $name
  },
  target: [getNameReposFx, $currentPage.reinit]
});

sample({
  clock: goNextPage,
  source: {
    name: $name,
    endCursor: $endCursor
  },
  fn: (source) => {
    return {
      name: source.name,
      after: source.endCursor
    };
  },
  target: getNameReposFx
});

sample({
  clock: goPreviousPage,
  source: {
    name: $name,
    startCursor: $startCursor
  },
  fn: (source) => {
    return {
      name: source.name,
      before: source.startCursor
    };
  },
  target: getNameReposFx
});

sample({
  clock: getNameReposFx.doneData,
  fn: (result) => {
    return result.search.repositoryCount;
  },
  target: $totalPages
});

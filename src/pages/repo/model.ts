import { createEffect, createEvent, createStore, sample } from 'effector';
import { api } from '@/shared/api/instances';
import { $name } from 'src/widgets/name-searchbar';
import {
  GQL_fullRepoInfo,
  RepositoryInfo
} from '@/shared/api/queries/full-repo-info';

export const $data = createStore<RepositoryInfo['repository'] | null>(null);
export const $error = createStore<string>('');
export const $pending = createStore(false);

export const pageOpened = createEvent<{ name: string; owner: string }>();

const getRepoFx = createEffect<{ name: string; owner: string }, RepositoryInfo>(
  async ({ name, owner }) => {
    return await api.request(GQL_fullRepoInfo, {
      name,
      owner
    });
  }
);

sample({
  clock: pageOpened,
  target: getRepoFx
});

$data.on(getRepoFx.doneData, (_, payload) => payload.repository).reset($name);
$error.on(getRepoFx.failData, (_, payload) => payload.message).reset($name);
$pending.on(getRepoFx.pending, (_, payload) => payload);

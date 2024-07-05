import { createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum/debounce';
import { KEYS_LOCAL_STORAGE, setLocalItemFx } from '@/shared/local-storage';
import { appStarted } from '@/shared/config/app';

export const $name = createStore('');
export const $uiName = createStore('');

export const changeUsername = createEvent<string>();
const debouncedChangeUsername = debounce(changeUsername, 800);

$uiName.on(changeUsername, (_, payload) => payload);
$name.on(debouncedChangeUsername, (_, payload) => payload);

sample({
  clock: appStarted,
  fn: () => {
    return localStorage.getItem(KEYS_LOCAL_STORAGE.name) || '';
  },
  target: changeUsername
});

sample({
  clock: $name,
  fn: (value) => {
    return {
      value,
      key: KEYS_LOCAL_STORAGE.name
    };
  },
  target: setLocalItemFx
});

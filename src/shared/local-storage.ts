import { createEffect } from 'effector';

export const KEYS_LOCAL_STORAGE = {
  name: 'tool-kit-name',
  currentPage: 'tool-kit-current-page',
  startCursor: 'tool-kit-start-cursor',
  endCursor: 'tool-kit-end-cursor'
} as const;

export const setLocalItemFx = createEffect<
  {
    value: string;
    key: (typeof KEYS_LOCAL_STORAGE)[keyof typeof KEYS_LOCAL_STORAGE];
  },
  void
>(({ value, key }) => {
  localStorage.setItem(key, value);
});

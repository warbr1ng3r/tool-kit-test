import { createEvent, createStore } from 'effector';

export const $currentPage = createStore(1);
export const $totalPages = createStore(0);
export const goNextPage = createEvent();
export const goPreviousPage = createEvent();

$currentPage
  .on(goNextPage, (page) => page + 1)
  .on(goPreviousPage, (page) => page - 1);

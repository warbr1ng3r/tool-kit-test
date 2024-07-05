import { Paginator } from '@/shared/ui/paginator';
import { useUnit } from 'effector-react/effector-react.umd';
import { $currentPage, $totalPages, goNextPage, goPreviousPage } from './model';

export const ReposPaginator = ({ disabled }: { disabled?: boolean }) => {
  const [totalPages, currentPage] = useUnit([$totalPages, $currentPage]);
  return (
    <Paginator
      totalPages={Math.ceil(totalPages / 10)}
      currentPage={currentPage}
      onPageNext={goNextPage}
      onPagePrevious={goPreviousPage}
      maxPageNumbersToShow={10}
      disabled={disabled}
    />
  );
};

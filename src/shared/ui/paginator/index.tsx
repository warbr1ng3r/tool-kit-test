import styles from './style.module.css';
import { FC } from 'react';

type Props = {
  totalPages: number;
  currentPage: number;
  onPageNext: () => void;
  onPagePrevious: () => void;
  disabled?: boolean;
  maxPageNumbersToShow: number;
};

export const Paginator: FC<Props> = ({
  totalPages,
  currentPage,
  onPageNext,
  onPagePrevious,
  maxPageNumbersToShow,
  disabled
}) => {
  if (totalPages === 0) {
    return <></>;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfWindow = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfWindow);
    let endPage = Math.min(totalPages, currentPage + halfWindow);

    if (currentPage <= halfWindow) {
      endPage = Math.min(totalPages, maxPageNumbersToShow);
    }

    if (currentPage + halfWindow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <span className={styles.dots} key="start-ellipsis">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={i === currentPage ? styles.activeButton : styles.button}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span className={styles.dots} key="end-ellipsis">
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.paginator}>
      <button
        className={styles.interactiveButton}
        onClick={onPagePrevious}
        disabled={currentPage === 1 || disabled}
      >
        Предыдущая
      </button>
      {renderPageNumbers()}
      <button
        className={styles.interactiveButton}
        onClick={onPageNext}
        disabled={currentPage === totalPages || disabled}
      >
        Следующая
      </button>
    </div>
  );
};

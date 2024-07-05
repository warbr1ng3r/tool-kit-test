import styles from './style.module.css';
import { ChangeEventHandler, FC } from 'react';

type Props = {
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

export const SearchBar: FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Поиск...'}
        className={styles.searchBar}
      />
    </div>
  );
};

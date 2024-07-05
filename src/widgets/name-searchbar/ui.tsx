import { SearchBar } from '@/shared/ui/searchbar';
import { useUnit } from 'effector-react';
import { $uiName, changeUsername } from './model';

export const NameSearchbar = () => {
  const value = useUnit($uiName);

  return (
    <SearchBar
      value={value}
      onChange={(val) => changeUsername(val.currentTarget.value)}
    />
  );
};

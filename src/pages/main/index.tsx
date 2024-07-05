import { $name, NameSearchbar } from 'src/widgets/name-searchbar';
import { useUnit } from 'effector-react';
import { $data, $error, $pending } from '@/pages/main/model';
import { ReposList } from '@/entities/repos-list';
import { ReposPaginator } from '@/widgets/repos-paginator';
export * from './model';

export const MainPage = () => {
  const [name, data, error, loading] = useUnit([
    $name,
    $data,
    $error,
    $pending
  ]);
  return (
    <div>
      <NameSearchbar />
      <ReposList
        error={error}
        name={name}
        repositories={data}
        loading={loading}
      />
      <ReposPaginator disabled={loading} />
    </div>
  );
};

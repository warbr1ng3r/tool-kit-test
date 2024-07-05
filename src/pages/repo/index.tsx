import { useUnit } from 'effector-react';
import { $data, $error, $pending, pageOpened } from './model';
import { RepoCard } from '@/entities/repo-card';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
export * from './model';

export const RepoPage = () => {
  const [data, error, loading] = useUnit([$data, $error, $pending]);
  const { login, name } = useParams();
  useEffect(() => {
    pageOpened({ owner: login || '', name: name || '' });
  }, []);

  return <RepoCard error={error} loading={loading} info={data} />;
};

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { RepositoryInfo } from '@/shared/api/queries/full-repo-info';

type Props = {
  error: string;
  info: RepositoryInfo['repository'] | null;
  loading: boolean;
};

export const RepoCard: FC<Props> = ({ error, info, loading }) => {
  if (loading) {
    return <h2>Loading</h2>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!info) {
    return <></>;
  }
  const { name, stargazerCount, updatedAt, owner, languages, description } =
    info;

  return (
    <div>
      <Link to="/">Go to main</Link>
      <h2>{name}</h2>
      <p>⭐ {stargazerCount}</p>
      <p>Последний коммит: {new Date(updatedAt).toLocaleString()}</p>
      {owner.avatarUrl && (
        <img
          src={owner.avatarUrl}
          alt={owner.login}
          style={{ width: '50px', borderRadius: '50%' }}
        />
      )}
      <p>
        Владелец: <a href={owner.url}>{owner.login}</a>
      </p>
      <h3>Используемые языки:</h3>
      <ul>
        {languages.nodes.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <p>{description}</p>
    </div>
  );
};

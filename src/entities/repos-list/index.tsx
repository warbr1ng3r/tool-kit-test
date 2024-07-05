import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  error: string;
  name: string;
  repositories: { id: string; name: string; login: string }[] | null;
  loading: boolean;
};

export const ReposList: FC<Props> = ({
  error,
  name,
  repositories,
  loading
}) => {
  if (loading) {
    return (
      <div style={{ height: '249px' }}>
        <h2>Loading</h2>
      </div>
    );
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!name || !repositories) {
    return <></>;
  }

  return (
    <div>
      <h2>Repositories of {name}</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <Link to={`repo/${repo.login}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

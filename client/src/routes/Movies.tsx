import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_MOVIES from '../graphql/query/movies';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

interface Movie {
  _id: string;
  name: string;
  description?: string;
}

const Movies = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <>
      <h1>Liste des films</h1>
      {loading ? (
        <div className="d-fluid flex-column items-center justify-center">
          <Spinner />
          <p>Chargement de la liste ...</p>
        </div>
      ) : data && data.movies.length ? (
        <ul>
          {data.movies.map((movie: Movie) => (
            <li key={movie._id}>
              <Link to={`/movies/${movie._id}/update`}>{movie.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Pas de film dispo.</p>
      )}
    </>
  );
};

export default Movies;

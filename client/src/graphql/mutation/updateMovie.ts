import gql from 'graphql-tag';

const UPDATE_MOVIE = gql`
  mutation updateMovie($movieId: ID!, $movieInput: MovieInput) {
    updateMovie(movieId: $movieId, updateMovie: $movieInput) {
      _id
      name
      description
    }
  }
`;

export default UPDATE_MOVIE;

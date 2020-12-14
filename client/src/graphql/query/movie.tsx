import gql from 'graphql-tag';

const GET_MOVIE = gql`
  query movie($movieId: ID!) {
    movie(movieId: $movieId) {
      _id
      name
      description
    }
  }
`;

export default GET_MOVIE;

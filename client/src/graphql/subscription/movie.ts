import gql from 'graphql-tag';

const MOVIE_ADDED = gql`
  subscription {
    movieAdded {
      _id
      name
      description
    }
  }
`;

export default MOVIE_ADDED;

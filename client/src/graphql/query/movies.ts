import gql from 'graphql-tag';

const GET_MOVIES = gql`
  {
    movies {
      _id
      name
      description
    }
  }
`;

export default GET_MOVIES;

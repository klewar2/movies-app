import gql from 'graphql-tag';

const CREATE_MOVIE = gql`
  mutation createMovie($movieInput: MovieInput) {
    createMovie(movieInput: $movieInput) {
      _id
      name
      description
    }
  }
`;

export default CREATE_MOVIE;

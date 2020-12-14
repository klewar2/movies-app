import { gql } from "apollo-server-express";
import { ApolloServerExpressConfig } from "apollo-server-express";
import resolvers from "../resolvers";

const typeDefs = gql`
  type Query {
    movies: [Movie!]!
    movie(movieId: ID!): Movie!
  }
  type Mutation {
    createMovie(movieInput: MovieInput): Movie!
    updateMovie(movieId: ID!, updateMovie: MovieInput): Movie!
  }
  type Subscription {
    movieAdded: Movie
  }
  type Movie {
    _id: ID!
    name: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }
  input MovieInput {
    name: String!
    description: String
  }
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
};

export default schema;

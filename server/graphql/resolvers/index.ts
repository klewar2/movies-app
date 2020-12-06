import {
  MovieQueries,
  MovieMutations,
  MovieSubscription
} from '../mutations/movie';

const rootResolver = {
  Query: {
    ...MovieQueries
  },
  Mutation: {
    ...MovieMutations
  },
  Subscription: {
    ...MovieSubscription
  }
};

export default rootResolver;

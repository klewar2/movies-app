import { PubSub } from 'apollo-server';
import mongoose from 'mongoose';
import Movie from '../../../models/movie';
import { transformMovie } from './merge';

const pubsub = new PubSub();
const MOVIE_ADDED = 'MOVIE_ADDED';

/**
 * Movie Queries
 */
const MovieQueries = {
  movies: async () => {
    try {
      const movies = await Movie.find();
      return movies.map((movie) => transformMovie(movie));
    } catch (err) {
      throw err;
    }
  },
  movie: async (parent: any, { movieId }) => {
    try {
      const movie = await Movie.findById(movieId);
      return transformMovie(movie);
    } catch (err) {
      throw err;
    }
  }
};

/**
 * Movie Mutations
 */
const MovieMutations = {
  createMovie: async (parent: any, { movieInput }: any) => {
    try {
      const newMovie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        name: movieInput.name,
        description: movieInput.description
      });

      const savedMovie = await newMovie.save();
      pubsub.publish(MOVIE_ADDED, {
        movieAdded: transformMovie(savedMovie)
      });

      return savedMovie;
    } catch (err) {
      throw err;
    }
  },
  updateMovie: async (parent: any, { movieId, updateMovie }) => {
    try {
      const movie = await Movie.findByIdAndUpdate(movieId, updateMovie, {
        new: true
      });
      return transformMovie(movie);
    } catch (err) {
      throw err;
    }
  }
};

const MovieSubscription = {
  movieAdded: () => pubsub.asyncIterator([MOVIE_ADDED])
};

export { MovieQueries, MovieMutations, MovieSubscription };

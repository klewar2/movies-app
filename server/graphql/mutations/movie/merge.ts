import dateToString from '../../../helpers/date';
import Movie from '../../../models/movie';

const getMovie = async (id: string) => {
  try {
    const movie: any = await Movie.findById(id);
    return transformMovie(movie);
  } catch (err) {
    throw err;
  }
};

const transformMovie = (movie: any) => {
  return {
    ...movie._doc,
    _id: movie._id,
    createdAt: dateToString(movie._doc.createdAt),
    updatedAt: dateToString(movie._doc.updatedAt)
  };
};

export { getMovie, transformMovie };

import mongoose from 'mongoose';

const movieSchema: mongoose.Schema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

/**
 * Statics method
 */
movieSchema.statics = {
  /**
   * Get Movie
   * @param {ObjectId} id - The objectId of movie
   */
  get(id: string): mongoose.Document {
    return this.findById(id)
      .execAsync()
      .then((movie: any) => {
        if (movie) {
          return movie;
        }
      });
  }
};

export default mongoose.model('Movie', movieSchema);

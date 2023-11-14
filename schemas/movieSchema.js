const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ])
  ),
  director: z.string(),
  year: z.number().int().min(1888).max(2025),
  duration: z.number().int().min(0).max(240),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string(),
});

function validateSchema(object) {
  // safeParse returns a resolved object that validates
  // if the object contains data or if it has an error
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
  // partial() turns every property of our schema into an optional property
  // We can use all the movieSchema for the movie data update
  return movieSchema.partial().safeParse(object);
}

module.exports = {
  validateSchema,
  validatePartialMovie,
};

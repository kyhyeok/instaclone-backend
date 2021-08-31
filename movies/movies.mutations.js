import client from "../client";

export default {
    Mutation: {
        createMovie: (_, { title, year, genre }) =>
          client.movie.create({
            data: {
              title,
              year,
              genre,
            },
          }),
        updateMovie: (_, { id, year }) =>
          client.movie.update({ where: { id }, data: { year } }),
        deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
      },
}
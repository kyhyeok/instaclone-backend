import client from "../../client";

const perPageCount = 5;

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = await client.user.findMany({
        take: perPageCount,
        skip: page > 0 ? (page - 1) * perPageCount : 0,
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
      return users;
    },
  },
};

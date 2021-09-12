import client from "../../client";

const perPageCount = 5;

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const ok = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: perPageCount,
          skip: page > 0 ? (page - 1) * perPageCount : 0,
        });
      const totalFollowers = await client.user.count({
        where: {
          following: { some: { username } },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / perPageCount),
      };
    },
  },
};

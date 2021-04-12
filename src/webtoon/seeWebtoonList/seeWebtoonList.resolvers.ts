import client from "../../client";

export default {
  Query: {
    seeWebtoonList: async (_, __) => {
      return await client.webtoon.findMany({
        where: {
          published: true,
        },
      });
    },
  },
};

import client from "../../client";

export default {
  Query: {
    seeWebtoon: (_, { id }) => {
      return client.webtoon.findUnique({
        where: {
          id,
        },
      });
    },
  },
};

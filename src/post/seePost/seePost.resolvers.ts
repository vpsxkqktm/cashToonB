import client from "../../client";

export default {
  Query: {
    seePost: (_, { id }) => {
      return client.post.findUnique({
        where: {
          id,
        },
      });
    },
  },
};

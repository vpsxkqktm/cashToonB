import client from "../../client";

// 특정 한 개의 게시물만 보여주기 (게시물 id로)
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

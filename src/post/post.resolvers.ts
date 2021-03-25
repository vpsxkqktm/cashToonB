import client from "../client";

export default {
  Post: {
    author: ({ authorId }) => {
      return client.user.findUnique({
        where: {
          id: authorId,
        },
      });
    },
    likes: ({ id }) => {
      return client.like.count({
        where: {
          postId: id,
        },
      });
    },
  },
};

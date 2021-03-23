import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePost: protectResolver(async (_, { id }, { loggedInUser }) => {
      const post = await client.post.findUnique({
        where: {
          id,
        },
        select: {
          authorId: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: "Post not found.",
        };
      } else if (post.authorId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You do not have permission.",
        };
      } else {
        await client.post.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};

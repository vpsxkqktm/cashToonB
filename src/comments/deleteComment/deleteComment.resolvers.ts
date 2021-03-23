import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: {
          id,
        },
        select: {
          authorId: true,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: "Comment not found.",
        };
      } else if (comment.authorId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You do not have permission.",
        };
      } else {
        await client.comment.delete({
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

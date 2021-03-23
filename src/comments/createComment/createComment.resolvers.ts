import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectResolver(
      async (_, { postId, contents }, { loggedInUser }) => {
        const post = await client.post.findUnique({
          where: {
            id: postId,
          },
          select: {
            id: true,
          },
        });
        if (!post) {
          return {
            ok: false,
            error: "Post not found.",
          };
        }
        await client.comment.create({
          data: {
            contents,
            post: {
              connect: {
                id: postId,
              },
            },
            author: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

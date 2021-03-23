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
        // 댓글은 post와 user 양측에게 관계성을 가지므로 반드시 둘다 connect 해주기
        // post = 댓글이 달린 위치, user = 댓글 작성자
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

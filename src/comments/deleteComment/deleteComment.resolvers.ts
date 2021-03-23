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
        // 댓글 주인과 로그인한 사람이 같은 사람인지 꼭 체크해주기
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

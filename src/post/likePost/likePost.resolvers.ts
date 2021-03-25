import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    likePost: protectResolver(async (_, { id }, { loggedInUser }) => {
      const post = await client.post.findUnique({
        where: {
          id,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: "Post not found.",
        };
      }
      // 중복 좋아요(추천) 막기 (같은 ID로 두 번 누르면 좋아요 삭제)
      const like = await client.like.findUnique({
        where: {
          postId_userId: {
            userId: loggedInUser.id,
            postId: id,
          },
        },
      });
      if (like) {
        await client.like.delete({
          where: {
            postId_userId: {
              userId: loggedInUser.id,
              postId: id,
            },
          },
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            post: {
              connect: {
                id: post.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};

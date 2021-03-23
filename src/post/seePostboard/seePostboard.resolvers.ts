import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Query: {
    seePostboard: protectResolver(async (_, __, { loggedInUser }) => {
      return await client.post.findMany({
        where: {
          OR: [
            {
              published: true,
            },
            /* 팔로우한 유저의 게시글 보기
            {
              author: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            */
            {
              authorId: loggedInUser.id,
            },
          ],
        },
      });
    }),
  },
};

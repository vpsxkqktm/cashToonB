import client from "../../client";
import { protectResolver } from "../../users/users.utils";

// 게시판에 올라온 게시글 열람
export default {
  Query: {
    seePostboard: protectResolver(async (_, { offset }, { loggedInUser }) => {
      return await client.post.findMany({
        take: 5,
        skip: offset,
        where: {
          OR: [
            {
              published: true,
            },
            /* 팔로우한 유저의 게시글 모아 보기
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
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};

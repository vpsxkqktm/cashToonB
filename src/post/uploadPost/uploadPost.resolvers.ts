import client from "../../client";
import { protectResolver } from "../../users/users.utils";

// TODO: AWS S3 적용하기
export default {
  Mutation: {
    uploadPost: protectResolver(
      async (_, { contents, file, title }, { loggedInUser }) => {
        // create 할 때는 항상 id를 connect 시켜주기
        // [작성자] id: loggedInUser.id [지금 로그인 되어있는 사람]
        // ↑ 코드 해석 ==> [작성자] = [지금 로그인 되어있는 사람]
        return client.post.create({
          data: {
            title,
            file,
            contents,
            author: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
      }
    ),
  },
};

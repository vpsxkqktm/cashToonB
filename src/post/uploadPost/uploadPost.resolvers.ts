import client from "../../client";
import { uploadS3 } from "../../shared/AWS.utils";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPost: protectResolver(
      async (_, { title, contents, file }, { loggedInUser }) => {
        let fileUrl = null;
        if (file) {
          fileUrl = await uploadS3(file, loggedInUser.id, "post");
        } else {
          fileUrl = "";
        }
        // create 할 때는 항상 id를 connect 시켜주기
        // [작성자] id: loggedInUser.id [지금 로그인 되어있는 사람]
        // ↑ 코드 해석 ==> [작성자] = [지금 로그인 되어있는 사람]
        return client.post.create({
          data: {
            title,
            file: fileUrl,
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

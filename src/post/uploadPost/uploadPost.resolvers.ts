import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPost: protectResolver(
      async (_, { contents, file, title }, { loggedInUser }) => {
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

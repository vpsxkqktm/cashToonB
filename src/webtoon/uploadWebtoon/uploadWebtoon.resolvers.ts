import client from "../../client";
import { MultipleUploadS3, uploadS3 } from "../../shared/AWS.utils";

export default {
  Mutation: {
    uploadWebtoon: async (_, { title, files }, { loggedInUser }) => {
      let fileUrls = null;
      if (files) {
        fileUrls = await MultipleUploadS3(files, loggedInUser.id, "webtoon");
      } else {
        fileUrls = "";
      }
      console.log(fileUrls);
      return client.webtoon.create({
        data: {
          title,
          files: fileUrls,
          author: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      });
    },
  },
};

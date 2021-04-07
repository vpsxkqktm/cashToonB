import client from "../../client";
import { MultipleUploadS3, uploadS3 } from "../../shared/AWS.utils";

export default {
  Mutation: {
    uploadWebtoon: async (_, { title, files }, { loggedInUser }) => {
      const fileUrls = files.map((item) => item);
      //console.log(fileUrls);
      MultipleUploadS3(fileUrls, loggedInUser.id, "webtoon");
    },
  },
};

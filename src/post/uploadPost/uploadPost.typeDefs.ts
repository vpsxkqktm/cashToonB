import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    uploadPost(title: String!, contents: String, file: Upload): Post
  }
`;

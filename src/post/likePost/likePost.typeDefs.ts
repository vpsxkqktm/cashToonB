import { gql } from "apollo-server-core";

export default gql`
  type LikePostResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    likePost(id: Int!): LikePostResult!
  }
`;

import { gql } from "apollo-server-core";

export default gql`
  type DeletePostResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePost(id: Int!): DeletePostResult!
  }
`;

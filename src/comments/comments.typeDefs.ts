import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    author: User!
    contents: String!
    post: Post!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

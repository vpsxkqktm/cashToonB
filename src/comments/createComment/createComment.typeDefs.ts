import { gql } from "apollo-server-core";

// 댓글은 "반드시" 포스트가 존재하는 경우에만 작성 가능
// 따라서 postId: Int!
export default gql`
  type CreateCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createComment(postId: Int!, contents: String!): CreateCommentResult!
  }
`;

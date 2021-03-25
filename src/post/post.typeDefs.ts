import { gql } from "apollo-server-core";

export default gql`
  type Post {
    id: Int!
    author: User!
    title: String!
    published: Boolean!
    file: String
    contents: String
    views: Int!
    likes: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    post: Post!
    createdAt: String!
    updatedAt: String!
  }
`;

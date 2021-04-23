import { gql } from "apollo-server-core";

export default gql`
  type Webtoon {
    id: Int!
    author: User!
    title: String!
    published: Boolean!
    thumbnail: String
    files: [String]!
    views: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

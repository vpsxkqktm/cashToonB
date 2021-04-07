import { gql } from "apollo-server-core";

export default gql`
  type Webtoon {
    id: Int!
    title: String!
    files: [String]!
    views: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

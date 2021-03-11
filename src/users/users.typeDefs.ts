import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`;

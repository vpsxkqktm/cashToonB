import { gql } from "apollo-server";

export default gql`
  type Query {
    dummy: String
  }
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      password: String!
      email: String!
    ): CreateAccountResult!
  }
`;

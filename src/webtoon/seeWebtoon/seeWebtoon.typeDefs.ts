import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeWebtoon(id: Int!): Webtoon!
  }
`;

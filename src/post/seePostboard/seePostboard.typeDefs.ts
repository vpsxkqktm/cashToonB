import { gql } from "apollo-server-core";

// offset: 몇 번 게시글까지 출력했는지 표시
export default gql`
  type Query {
    seePostboard(offset: Int): [Post]
  }
`;

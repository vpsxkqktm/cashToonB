import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) => {
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(), // startsWith: 문장 시작 단어로 검색, toLowerCase: '무조건' 소문자로 검색
          },
        },
        /* pagination 
        "findMany returns a list of records." 
        레코드에 있는 모든 정보를 list로 반환하기 때문에 자료 많으면 요청 보냈을 때 서버 터짐
        반드시 pagination 처리할 것 */
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return users;
    },
  },
};

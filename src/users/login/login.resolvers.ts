import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwordCheck = await bcrypt.compare(password, user.password); // hash 걸어둔 비밀번호 해독
      if (!passwordCheck) {
        return {
          ok: false,
          error: "Password is incorrect.",
        };
      }
      const token = await jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY
      ); // https://randomkeygen.com/ 여기서 비밀번호 하나 랜덤 생성한 다음에 .env 파일에 SECRET_KEY로 선언 및 정의하기
      return {
        ok: true,
        token,
      };
    },
  },
};

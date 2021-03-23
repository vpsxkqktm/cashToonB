import * as bcrypt from "bcrypt";

import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      //username, email 중복 체크
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username or email is already");
        }
        // 비밀번호 hash 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Failed create account.",
        };
      }
    },
  },
};

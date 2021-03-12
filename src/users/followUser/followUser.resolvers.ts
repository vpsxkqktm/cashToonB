import client from "../../client";
import { protectResolver } from "../user.utils";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      const findUser = await client.user.findUnique({ where: { username } });
      if (!findUser) {
        return {
          ok: false,
          error: "That user does not exist.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              username: username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

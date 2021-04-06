import * as jwt from "jsonwebtoken";

import client from "../client";

// jwt 토큰 해독 후, 해당하는 유저 반환
export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: {
          id: verifiedToken["id"],
        },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

// 비로그인 DB 접근 막기
export function protectResolver(ourResolver) {
  return function (root: any, args: any, context: any, info: any) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "plase login first.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

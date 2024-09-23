import { auth } from "../../lib/Firebase/_index";

export const verifyIdToken = async (token: string) => {
    return await auth.verifyIdToken(token);
  };
  
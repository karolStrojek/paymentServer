import { checkUserExist, createUser } from "../services/user.services";

export const createInitUser = async () => {
  if (!(await checkUserExist("test@test.pro"))) {
    await createUser({
      email: "test@test.pro",
      username: "test",
      password: "TEST",
      authenticated: false,
    });
  }
};

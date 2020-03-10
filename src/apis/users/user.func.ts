import { getConnection } from "typeorm";
import { Users } from "../../entity/Users";

interface Data {
  email: string;
  age: number;
  userName: string;
}

export const insertUser = (data: Data) => {
  console.log("mock failed");
  return getConnection()
    .createQueryBuilder()
    .insert()
    .into(Users)
    .values({
      email: data.email,
      age: data.age,
      userName: data.userName,
      userState: "Outstanding Authorization",
      gender: "UNSELECTED"
    })
    .execute();
};

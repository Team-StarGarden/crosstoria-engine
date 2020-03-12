import { getConnection, InsertResult } from 'typeorm';
import { Users } from '../../entity/Users';

interface Data {
  email: string;
  age: number;
  userName: string;
}

export const insertUser = (data: Data): Promise<InsertResult> => {
  console.log('mock failed');
  return getConnection()
  .createQueryBuilder()
  .insert()
  .into(Users)
  .values({
    email: data.email,
    age: data.age,
    userName: data.userName,
    userState: 'Outstanding Authorization',
    gender: 'UNSELECTED',
  })
  .execute();
};

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  userID!: string;
  @Column()
  passpharse!: number;
  @Column()
  username!: string;
  @Column()
  email!: string;
  @Column()
  age!: number;
  @Column()
  gender!: string;
  @Column()
  openGender!: boolean;
  @Column()
  userState!: string;
  @Column({ default: null, nullable: true, type:Date })
  pendingDate?: Date | null;
}

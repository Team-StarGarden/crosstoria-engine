import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  email!: string;
  @Column({ default: null, nullable: true, type: String })
  passpharse?: string | null;
  @Column()
  userName!: string;
  @Column()
  age!: number;
  @Column()
  gender!: string;
  @Column({ default: false })
  openGender!: boolean;
  @Column()
  userState!: string;
  @Column({ default: null, nullable: true, type: Date })
  pendingDate?: Date | null;
}

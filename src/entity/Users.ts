import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryColumn()
  userID!: string;
  @Column()
  email!: string;
  @Column({ default: null, nullable: true, type: String })
  passphrase?: string | null; // must be HASHed with argon2
  @Column()
  userName!: string;
  @Column()
  age!: number;
  @Column({ default: null, nullable: true, type: String })
  gender?: string | null;
  @Column({ default: false })
  openGender!: boolean;
  @Column({ default: 0 })
  charactersCount!: number;
  @Column()
  userState!: string;
  @Column({ default: null, nullable: true, type: Date })
  pendingDate?: Date | null;
}

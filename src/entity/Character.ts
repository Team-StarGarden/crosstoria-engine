import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Character {
  @PrimaryColumn()
  charID!: string;
  @ManyToOne(
    type => Users,
    userID => userID.email
  )
  userID?: Users;
  @Column()
  charName!: string; //must support UNICODE
  @Column({ type: String })
  protraitPath!: string;
  @Column()
  charState!: string;
}

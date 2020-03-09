import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Character {
  @PrimaryColumn()
  charID!: string;
  @ManyToOne(
    () => Users,
    user => user.userID
  )
  userID?: string;
  @Column()
  charName!: string; // must support UNICODE
  @Column({ type: String })
  portraitPath!: string; // path in local file system
  @Column()
  charState!: string;
}

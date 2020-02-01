import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";

@Entity()
export class Profile {
  @ManyToOne(
    type => Character,
    charID => charID.charID
  )
  charID!: Character;
  @Column({ unique: true })
  charProgileItem!: string;
  @Column()
  progileItemName!: string;
  @PrimaryGeneratedColumn("uuid")
  profileItem!: string;
  @Column()
  profileContent!: string;
  @Column()
  charProfileSwitch!: boolean;
  @Column({ nullable: true, type: String })
  charProfileContents?: string | null;
}

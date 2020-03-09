import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class ProfileConfig {
  @PrimaryColumn()
  configId!: string;
  @ManyToOne(
    () => Profile,
    charProfileItem => charProfileItem.charProfileItem
  )
  charProfileItem?: Profile;
  @Column({ default: null, nullable: true, type: String })
  charProfileWhitelist?: string | null;
}

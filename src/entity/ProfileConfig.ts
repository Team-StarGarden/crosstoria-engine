import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class ProfileConfig {
  @PrimaryColumn()
  configId!: string;
  @ManyToOne(
    () => Profile,
    char => char.charProfileItem
  )
  charProfileItem?: Profile;
  @Column({ default: null, nullable: true, type: String })
  charProfileWhitelist?: string | null;
}

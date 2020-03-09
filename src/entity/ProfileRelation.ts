import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class ProfileRelation {
  @PrimaryColumn()
  relationId!: string;
  @ManyToOne(
    () => Profile,
    char => char.charProfileItem
  )
  charProfileItem?: string;
  @Column({ default: null, nullable: true, type: String })
  charProfileTarget?: string | null;
}

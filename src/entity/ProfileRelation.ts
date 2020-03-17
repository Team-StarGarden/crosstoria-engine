import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Profile } from './Profile';
import { Character } from './Character';

@Entity()
export class ProfileRelation {
  @PrimaryColumn()
  relationId!: string;
  @ManyToOne(() => Profile, (char) => char.charProfileItem)
  charProfileItem?: Profile;
  @ManyToOne(() => Character, (charProfileTarget) => charProfileTarget.charID, {
    nullable: true,
  })
  charProfileTarget!: Character | null;
}

import {Column, Entity, ManyToOne} from 'typeorm';
import {Profile} from './Profile';
import {Character} from './Character';
@Entity()
export class ProfileRelation {
  @ManyToOne(
    type => Profile,
    charProfileItem => charProfileItem.charProfileItem,
  )
  charProfileItem?: Profile;
  @ManyToOne(
    type => Character,
    charProfileTarget => charProfileTarget.charID,
    {nullable: true},
  )
  charProfileTarget!: Character | null;
}

import {Column, Entity, ManyToOne} from 'typeorm';
import {Profile} from './Profile';

@Entity()
export class ProfileRelation {
  @ManyToOne(
    () => Profile,
    charProfileItem => charProfileItem.charProfileItem,
  )
  charProfileItem?: Profile;
  @Column({default: null, nullable: true, type: String})
  charProfileTarget?: string | null;
}
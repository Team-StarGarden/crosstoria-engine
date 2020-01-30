import {Column, Entity, ManyToOne} from 'typeorm';
import {Profile} from './Profile';

@Entity()
export class ProfileConfig {
  @ManyToOne(
    () => Profile,
    charProfileItem => charProfileItem.charProfileItem,
  )
  charProfileItem?: Profile;
  @Column({default: null, nullable: true, type: String})
  charProfileWhitelist?: string | null;
}
import {Entity, ManyToOne, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from './Profile';

@Entity()
export class ProfileConfig {
  @ManyToOne(
    type => Profile,
    charProfileItem => charProfileItem.charProfileItem,
  )
  charProfileItem!: Profile;
  @Column({nullable: true, type: String})
  charProfileWhitelist?: string | null;
}


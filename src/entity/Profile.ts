import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {Character} from './Character';

@Entity()
export class Profile {
  @ManyToOne(
    () => Character,
    charID => charID.charID,
  )
  charID?: Character;
  @PrimaryColumn()
  charProfileItem!: string;
  @Column()
  charProfileTopic!: string;
  @Column({default: null, nullable: true, type: String})
  superItem?: string | null;
  @Column()
  charProfileSwitch!: string;
  @Column()
  charProfileContent!: string; // should support emoji and custom emoticons
}

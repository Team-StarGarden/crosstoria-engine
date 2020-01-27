import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {Users} from './Users';

@Entity()
export class Character {
  @PrimaryColumn()
  charID!: string;
  @ManyToOne(
    () => Users,
    userID => userID.email,
  )
  userID?: Users;
  @Column()
  charName!: string; // must support UNICODE
  @Column({type: String})
  portraitPath!: string;
  @Column()
  charState!: string;
}

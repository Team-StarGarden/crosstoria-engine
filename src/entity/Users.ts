import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryColumn()
  public userID: string = "";
  @Column()
  public passpharse: number = 0;
  @Column()
  public username:string='';
  @Column()
  public email: string = "";
  @Column()
  public age: number = 0;
  @Column()
  public gender: string = '';
  @Column()
  public openGender : boolean = false;
  @Column()
  public userState: string = "";
  @Column({ default: null, nullable: true })
  public pendingDate: Date | null = null;
}
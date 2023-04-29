import {BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from ".";

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column('varchar', {
    length: 255,
    nullable: true
  })
  name: string | null

  @ManyToOne(() => User, user => user.book)
  user:User


}

import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Book} from ".";

@Entity()
@Index(['firstname','lastname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column('varchar', {
    length: 255,
    nullable: true
  })
  firstname: string | null

  @Column('varchar', {
    length: 255,
    nullable: true
  })
  lastname: string | null

  @OneToMany(() => Book, book => book.user)
  book:Book[]


}

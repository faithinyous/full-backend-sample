import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
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

}

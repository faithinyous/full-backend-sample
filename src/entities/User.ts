import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'

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

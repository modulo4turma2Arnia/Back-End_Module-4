import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UserEntity } from './user.entity';
 
  
  @Entity('Jewelry')
  export class JewelryEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 32, nullable: false, unique: true })
    type: string;

    @Column({ type: 'text', nullable: false })
    habilities: string;
  
    @Column({ type: 'varchar', length: 256, nullable: false})
    image: string;
     

    @ManyToMany(() => UserEntity, (user) => user.products)
    @JoinTable()
    users: UserEntity[];
  

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
  
    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date;

  }
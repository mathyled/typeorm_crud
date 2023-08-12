import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        name:"nombre"
    })
    firstname: string
    @Column()
    lastname: string
    @Column({
        default: true
    })
    active: boolean
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAd: Date
}
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    title: string;

    @Column('text')
    description?: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    expirationDate: Date;

    @Column({ default: false })
    completed?: boolean;


    @BeforeInsert() 
    modifyCreationDate(){
        //lo modifico para que se muestre la fecha y hora exacta al momento de crear
        this.createdAt = new Date();
    }


}

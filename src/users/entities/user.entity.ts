import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "../../reports/entities/report.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: true })
    admin: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id ', this.id);
    }
    @AfterUpdate()
    logUpdate() {
        console.log('Updated user with id ', this.id);
    }
    @AfterRemove()
    logRemove() {
        console.log('Removeed user with id ', this.id);
    }
}

import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt } from 'sequelize-typescript';

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    user_id: number;

    @Column(DataType.STRING(50))
    full_name?: string;

    @Column(DataType.STRING(20))
    phone_number!: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING(20))
    role: string;

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date;
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  public id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  public firstName: string;

  @Column({ name: 'email', type: 'varchar' })
  public email: string;

  @Column({ name: 'password_hash', type: 'varchar' })
  public passwordHash: string;

  @Column({ name: 'phone_number', type: 'varchar' })
  public phoneNumber: string;
}

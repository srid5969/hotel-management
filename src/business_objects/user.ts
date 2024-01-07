import { Optional } from 'sequelize';

export class User{
    id?:string;
    firstName:string;
    email:string;
    mobile:string;
    middleName: string | null;
    lastName: string | null;
    displayName: string | null;
    gender: string | null;
    dob: string | null;
    profilePicture: string | null;
    bio: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}
export interface UserCreationAttributes extends Optional<User, 'id'> {}
export interface UserEditAttributes extends Optional<User, 'id'> {}

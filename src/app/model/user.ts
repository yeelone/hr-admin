import { UserGroup } from './usergroup';
import { Role } from './role';
import { Profile } from './profile';

export class User {
    id: number;
    username: string;
    password: string;
    id_card: string ;
    picture:   string;
    createdAt: string;
    updatedAt: string;
    group: number;
    groups: UserGroup[];
    roles: Role[];
    profile: Profile;
    state: number;
    token: string;
}

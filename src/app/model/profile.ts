import { Group } from './group';

export class Profile {
    id: number ;
    uuid:   string;
    name:        string;
    job_number:   string;
    id_card:      string;
    bank_card:      string;
    on_board_date: string;
    type_card: string;
    phone: string;
    gender: string;
    birth_day: string;
    status: string;
    source: string;
    school: string;
    graduation_date: string;
    specialty: string;
    last_company: string;
    first_job_date: string;
    workage: number
    nation: string;
    marital_status: string;
    account_location: string;
    address: string;
    groups: Group[];
}


import { ICategory } from './ICategory';
import { ITransaction } from './ITransaction';

export interface IUser {
    id: string;
    username: string;
    password: string;
    token: string;
    categories: ICategory[];
    transactions: ITransaction[];
}

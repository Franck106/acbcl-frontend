import { IPerson } from './person';

export interface KidCreate extends IPerson {
    id: string;
    subscriptionIds: string[];
}

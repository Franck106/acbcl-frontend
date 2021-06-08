import { IGuestCreate } from "./guestCreate";

export interface ISubscriptionCreate {
    userId: string;
    eventId?: string;
    activityId?: string;
    kidId?: string;
    guest?: IGuestCreate;
}
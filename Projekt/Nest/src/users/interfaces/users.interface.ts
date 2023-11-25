import {Document} from 'mongoose';

export interface IUsers extends Document {
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly phone: string;
    readonly plate: string,
    readonly number: string

}

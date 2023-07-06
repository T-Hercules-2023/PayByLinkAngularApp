import { Deserializable } from "./deserializable";

export default class User implements Deserializable {
    public firstName?: string;
    public lastName?: string;
    public emailId?: string;
    public panNumber?: string;
    public mobileNumber?: number;
    public bankAccountNumber?: string;
    public password?: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
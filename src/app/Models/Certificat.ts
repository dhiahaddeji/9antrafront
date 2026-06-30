import { User } from "./user.model";

export class Certificat {
    idCertificat!: number;
    date!: Date; // You can use a string if you prefer
    user!: User; // Assuming you have a User class defined as well
    periode!: string;
    month!: string;
    path!: string;

  }
  
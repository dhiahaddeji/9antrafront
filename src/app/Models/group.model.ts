import { Session } from './Session';
import { User } from './user.model';
export class Groups {
  id!: number;
  groupName?: string;
  creationDate?: Date;
  period?: string;
  certificatesGenerated!: boolean;
  formateur?: {
    id: number;
  };
  formation?: {
    id: number;
  };
  sessions?: Session[];

  etudiants?: {
    id: number;
    username: string;
    firstName?: string;
    lastName?: string;
    numeroTel?: string;
    image?: string;
    enabled?: number;
    typeFormation?: string;
  }[];
  lastMessage?: any;
  unreadCount?: number;
}

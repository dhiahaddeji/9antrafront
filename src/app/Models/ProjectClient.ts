import { AdminProjects } from "./AdminProjects";

export class ProjectClient {
    id!: number;
    nom!: string;
    numtel!: number;
    remark!: string;
    email!: string;
    date!: Date;
    status!: boolean;

    adminProjects!: AdminProjects[];
  }
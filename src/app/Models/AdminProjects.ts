import { ProjectOwner } from "./ProjectOwner";

export class AdminProjects {
    id!: number;
    titre!: string;
    description!: string;
    technologies!: string;
    video!: string;
    image!: string;
    price!: number;
    name!: string;
    ownerImage!: string;

    projectOwner!: ProjectOwner;
  }
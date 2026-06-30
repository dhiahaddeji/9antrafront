import { Coach } from './Coach';
import { Feedback } from './Feedback';
import { Projects } from './Projects';

export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  numeroTel!: string;
  feedbacks!: Feedback[];
  typeFormation!: string;
  image!: string;
  country!: string;
  enabled!: boolean;
  roles!: String[];
  formateur!: Coach;
  projets!: Projects[];
}

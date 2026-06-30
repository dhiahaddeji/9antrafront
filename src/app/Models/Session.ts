import { Formation } from './formation.model';
import { Groups } from './group.model';

export class Session {
  id?: number;
  sessionName?: string;
  description?: string;
  startDate!: Date;
  finishDate!: Date;
  groupSession?: string;
  groups: Groups[] = [];
  formation!: Formation;
  userPresence!: { [key: number]: boolean }; // Represents the map of userId to presence status

  GeneratedLink?: string;
}
function mapToObject(map: Map<number, boolean>): { [key: number]: boolean } {
  const obj: { [key: number]: boolean } = {};
  map.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;}
export interface Chat {
  key: string;
  groupId: string;
  senderId: number;
  message: string;
  username: string;
  timestamp: string;
  isReadBy?: { [userId: number]: boolean };
}

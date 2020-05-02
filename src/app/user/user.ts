export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  token: string;
  createdAt: Date;
  doneTasks: [string];
}

import { Timestamp } from 'rxjs';

export interface UserModel {
  userId: number;
  username: string;
  email: string;
  created: string;
  numOfFollowing: number;
  numOfFollowers: number;
  followedByCurrentUser: boolean;
  mutualFollowers: number;
  bio: string;
}

export interface PostModel {
  id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  userName: string;
  topicName: string;
  commentCount: number;
  duration: string;
  liked: boolean;
  disliked: boolean;
}

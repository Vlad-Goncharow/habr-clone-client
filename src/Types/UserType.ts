import { HabType } from "./HabType";
import { PostType } from "./PostType";

export interface UserType{
  _id:string,
  email:string,
  nickName:String,
  avatar: String,
  karma: Number,
  rating: Number,
  fullName:String,
  description: String,
  gender: String,
  dayOfBirth: String,
  yearOfBirth: String,
  monthOfBirth: String,
  country: String,
  register: String,
  lastActive: String,
  favoritesPosts: PostType[],
  habSubscribers: HabType[],
  userSubscribers: UserType[],
  userSubscriptions: UserType[],
}
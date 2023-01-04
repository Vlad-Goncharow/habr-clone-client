import { PostType } from "./PostType"
import { UserType } from "./UserType"

export interface CommentType{
  _id:String
  user: UserType
  post:PostType
  text:String
  createdAt:String
}
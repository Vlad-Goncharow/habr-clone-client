import { CommentType } from "./CommentType"
import { HabType } from "./HabType"
import { UserType } from "./UserType"

export interface PostType {
  title:String,
  text:any,
  image:String,
  views:Number,
  favorites:Number,
  comments:CommentType[],
  user: UserType
  tags:String[],
  habs:HabType[],
  category:String,
  postType: String,
  _id:String
  createdAt:String
}

export type Category = {
  typeRu: String,
  typeEng: String,
}
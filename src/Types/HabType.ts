import { UserType } from "./UserType"

export type HabType = {
  _id:String,
  title:String,
  descr:String,
  image:String,
  rating:Number,
  postsCount:Number,
  category:String,
  authors:UserType[]
  subscribers:UserType[]
}
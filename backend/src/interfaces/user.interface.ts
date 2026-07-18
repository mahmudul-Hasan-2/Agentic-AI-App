import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId; // মঙ্গোডিবির নিজস্ব ইউনিক আইডি
  name: string;
  email: string;
  password?: string; // হ্যাশড পাসওয়ার্ড সেভ করার জন্য
  role: "client" | "developer" | "admin";
  createdAt: Date;
}

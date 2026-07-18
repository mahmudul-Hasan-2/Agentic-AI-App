import { Request } from "express";

export interface UserPayload {
  id: string;
  email: string;
  role: string;
}

// এক্সপ্রেসের রিকোয়েস্ট ইন্টারফেসের সাথে 'user' প্রপার্টি মার্জ করা
export interface CustomRequest extends Request {
  user?: UserPayload;
}

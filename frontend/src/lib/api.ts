import axios from "axios";

export const api = axios.create({
  // নিশ্চিত করো তোমার ব্যাকএন্ড পোর্ট এবং বেস ইউআরএল একদম ঠিক আছে
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface FilterParams {
  search: string;
  category: string;
  minBudget: string;
  maxBudget: string;
  sortBy: string;
}

export const fetchProjects = async (filters: FilterParams) => {
  const cleanedParams: any = {};

  // শুধুমাত্র ভ্যালু থাকা প্যারামিটারগুলোকেই ব্যাকএন্ডে পাঠানো হবে
  if (filters.search && filters.search.trim() !== "")
    cleanedParams.search = filters.search;
  if (filters.category && filters.category.trim() !== "")
    cleanedParams.category = filters.category;
  if (filters.minBudget && filters.minBudget.trim() !== "")
    cleanedParams.minBudget = filters.minBudget;
  if (filters.maxBudget && filters.maxBudget.trim() !== "")
    cleanedParams.maxBudget = filters.maxBudget;
  if (filters.sortBy && filters.sortBy.trim() !== "")
    cleanedParams.sortBy = filters.sortBy;

  try {
    const response = await api.get("/projects", { params: cleanedParams });
    return response.data;
  } catch (error) {
    console.error("Axios Fetch Error:", error);
    throw error; // TanStack Query কে এররটা হ্যান্ডেল করতে দেওয়ার জন্য থ্রো করা জরুরি
  }
};

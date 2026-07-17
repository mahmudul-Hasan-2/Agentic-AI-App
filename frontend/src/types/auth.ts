export interface RouteItem {
  label: string;
  path: string;
}

export interface UserState {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    role: "client" | "developer";
  } | null;
}

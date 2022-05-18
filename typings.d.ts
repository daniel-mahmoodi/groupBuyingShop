export type AuthContextType = {
  token: string;
  isLoggedIn: boolean;
  login: (token: any) => void;
  logout: () => void;
};
export interface JwtPayload {
    sub: string;
    name: string;
    role: string;
}
  
export interface AuthContextType {
    token: string | null;
    user: JwtPayload | null;
    login: (token: string) => void;
    logout: () => void;
}
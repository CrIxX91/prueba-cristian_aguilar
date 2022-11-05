import { createContext } from "react";
import { AuthState, User } from "../interface/UserInterface";


export type AuthContextProps = {
    authState:AuthState;
    handleLogin: (user:User) => void;
    handleLogOut: ()=> void;
    checkToken: ()=> boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
import { useReducer } from "react"
import { AuthState, User } from "../interface/UserInterface"
import { AuthContext } from "./AuthContext"
import { AuthReducer } from "./AuthReducer"

interface AuthProviderProps {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE:AuthState = {
    user:{
        password:'',
        username:''
    },
    auth:false
}

const superuser:User = {
    username:'Cristian',
    password:'12345'
}

const Checkuser = ( password:string,username:string ):boolean => {

    if( password === superuser.password && username === superuser.username ){
        sessionStorage.setItem("token_examen", 'true');
        return true
    }else{
        return false
    }
}

export const AuthProvider = ({children}:AuthProviderProps) => {

    const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    const handleLogin = (user:User) => {
        
        if(Checkuser(user.password,user.username)){
            
            dispatch({type:"login",payload:user});
            dispatch({type:"authcomplete",payload:{auth:true}});
        }
    }

    const checkToken = ():boolean => {

        var token = sessionStorage.getItem("token_examen");

        if(token == null)
            return false;

        return true
    }

    const handleLogOut = ()=> {
        dispatch({type:"login",payload:{username:'',password:''}});
        dispatch({type:"authcomplete",payload:{auth:false}});
    }

  return (
    <AuthContext.Provider 
        value={{
            authState,
            handleLogin,
            handleLogOut,
            checkToken
            }}>
    {children}
    </AuthContext.Provider>
  )
}

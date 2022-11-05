import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components';
import { AuthContext } from '../context/AuthContext'
import { LoginPage } from '../pages';
import { EmployeesRoutes } from './EmployeesRoutes';

export const AppRouter = () => {

    const {authState, handleLogOut, checkToken} = useContext(AuthContext);

    useEffect(() => {
      handleLogOut()
    }, [])
    

  return (
    <>
     {
            (checkToken())
            ?(
                <>
                    <Routes>
                        <Route path='/*' element={<EmployeesRoutes/>}></Route>
                    </Routes>
                </>
            ):(
                <>
                    <NavBar/>

                    <div className='container pt-4'>
                        <Routes>
                            <Route path='/' element={<LoginPage/>}/>
                            <Route path='/*' element={<Navigate to='/'/>}/>
                        </Routes>
                    </div>
                </>
            )
        }
    </>
       
  )
}

import { Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "../components"
import { EmployeesPage, UploadPage } from "../pages"

export const EmployeesRoutes = () => {
  return (
    <>
        <NavBar/>

        <div className='container pt-4'>
            <Routes>
                <Route path='/' element={<EmployeesPage/>}/>
                <Route path='upload' element={<UploadPage/>}/>
                <Route path='/*' element={<Navigate to='/'/>}/>
            </Routes>
        </div>
    </>

  )
}
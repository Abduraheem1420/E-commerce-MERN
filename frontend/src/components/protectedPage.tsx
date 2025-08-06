import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contex/Auth/AuthContext";

const ProtectedPage = () =>{
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return <Navigate to='/login' replace = {true}/>
    }
    return <Outlet/>
}

export default ProtectedPage;
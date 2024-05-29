import { useNavigate } from "react-router-dom"
import Profile from "../user components/profile"
import UserDrawer from "../user components/user-drawer"

export const ProfilePage=()=>{
    const navigate=useNavigate()
    const htmlquizRoute=()=>{
        navigate("/htmlquiz")
    }
    const cssquizRoute=()=>{
        navigate("/cssquiz")
    }
    const jsquizRoute=()=>{
        navigate("/jsquiz")
    }
    return(
        <UserDrawer functions={{htmlquizRoute,cssquizRoute,jsquizRoute}}>
            <Profile/>
        </UserDrawer>
    )
}
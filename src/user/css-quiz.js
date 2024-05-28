import { useNavigate } from "react-router-dom"
import { CssData } from "../user components/css-data"
import UserDrawer from "../user components/user-drawer"

export const CssQuiz=()=>{
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
        <>
        <UserDrawer functions={{htmlquizRoute,cssquizRoute,jsquizRoute}}>
            <CssData/>
        </UserDrawer>
        </>
    )
}
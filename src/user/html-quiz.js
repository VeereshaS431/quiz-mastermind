import { useNavigate } from "react-router-dom"
import { HtmlData } from "../user components/html-data"
import UserDrawer from "../user components/user-drawer"

export const HtmlQuiz=()=>{
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
            <HtmlData/>
        </UserDrawer>
        </>
       
    )
}
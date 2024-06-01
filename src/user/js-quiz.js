import { useNavigate } from "react-router-dom"
import { JavaScriptData } from "../user components/js-data"
import UserDrawer from "../user components/user-drawer"

export const JavaScriptQuiz=()=>{
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
            <JavaScriptData/>
        </UserDrawer>
        
        </>
    )
}
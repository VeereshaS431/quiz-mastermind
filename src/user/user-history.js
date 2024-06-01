import { useNavigate } from "react-router-dom"
import QuizHistory from "../user components/quiz-history"
import UserDrawer from "../user components/user-drawer"

export const UserHistory=()=>{
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
            <QuizHistory/>
        </UserDrawer>
    )
}
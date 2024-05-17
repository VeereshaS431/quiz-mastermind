import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import MiniDrawer from "../admin/dashbord"
import HtmlPage from "../admin/html-page"
import CssPage from "../admin/css-page"
import JavaScriptPage from "../admin/javascript-page"
import { createContext } from "react"
import HtmlTablePage from "../admin/html-table-page"
import HtmlUpdatePage from "../admin/html-update-page"
import CssTablePage from "../admin/css-table-page"
import JavaScriptTablePage from "../admin/javascript-table-page"
import CssUpdatePage from "../admin/css-update-page"
import JavaScriptUpdatePage from "../admin/javascript-update-page"
import { HtmlData } from "../user components/html-data"



export const DataShare=createContext()
export const Navigation=()=>{
    return(
        <DataShare.Provider value={{
            
        }}>
        <BrowserRouter>
        <Routes>
            <Route path="/" Component={MiniDrawer}/>
            <Route path="/html" Component={HtmlPage}/>
            <Route path="/css" Component={CssPage}/>
            <Route path="/javascript" Component={JavaScriptPage}/>
            <Route path="/htmltable" Component={HtmlTablePage}/>
            <Route path="/csstable" Component={CssTablePage}/>
            <Route path="/javascriptTable" Component={JavaScriptTablePage}/>
            <Route path="/htmlupdate/:firebaseId" Component={HtmlUpdatePage}/>
            <Route path="/cssupdate/:firebaseId" Component={CssUpdatePage}/>
            <Route path="/jsupdate/:firebaseId" Component={JavaScriptUpdatePage}/>


            <Route path="/htmldata" Component={HtmlData}/>
        </Routes>
        </BrowserRouter>
        </DataShare.Provider>
    )
}
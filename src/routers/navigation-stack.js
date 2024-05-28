import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniDrawer from "../admin/dashbord";
import HtmlPage from "../admin/html-page";
import CssPage from "../admin/css-page";
import JavaScriptPage from "../admin/javascript-page";
import { createContext, useState, useEffect } from "react";
import HtmlTablePage from "../admin/html-table-page";
import HtmlUpdatePage from "../admin/html-update-page";
import CssTablePage from "../admin/css-table-page";
import JavaScriptTablePage from "../admin/javascript-table-page";
import CssUpdatePage from "../admin/css-update-page";
import JavaScriptUpdatePage from "../admin/javascript-update-page";
import { HtmlData } from "../user components/html-data";
import { HtmlQuiz } from "../user/html-quiz";
import { CssQuiz } from "../user/css-quiz";
import { JavaScriptQuiz } from "../user/js-quiz";
import { UserRegisterPage } from "../loginPages/user";
import QuizInstructions from "../user/user-instruction";
import { AdminLoginPAge } from "../loginPages/admin-login";

export const DataShare = createContext();

export const Navigation = () => {
    const [logControl, setLogControl] = useState(() => {
        return localStorage.getItem('logControl') === 'true';
    });
    const [adminLogControl, setAdminLogControl] = useState(() => {
        return localStorage.getItem('adminLogControl') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('logControl', logControl);
    }, [logControl]);

    useEffect(() => {
        localStorage.setItem('adminLogControl', adminLogControl);
    }, [adminLogControl]);

    const changeLogControl = () => {
        setLogControl(true);
    };

    const adminChangeLogControl = () => {
        setAdminLogControl(true);
        setLogControl(true);
    };

    const adminChangeLogControlForSignOut=()=>{
        setAdminLogControl(false);
        setLogControl(false);
    }

    return (
        <DataShare.Provider value={{
            changeLogControl,
            adminChangeLogControl,
            adminChangeLogControlForSignOut
        }}>
            <BrowserRouter>
                {
                    logControl ?
                        adminLogControl ?
                            (
                                <Routes>
                                    <Route path="/" Component={MiniDrawer} />
                                    <Route path="/html" Component={HtmlPage} />
                                    <Route path="/css" Component={CssPage} />
                                    <Route path="/javascript" Component={JavaScriptPage} />
                                    <Route path="/htmltable" Component={HtmlTablePage} />
                                    <Route path="/csstable" Component={CssTablePage} />
                                    <Route path="/javascriptTable" Component={JavaScriptTablePage} />
                                    <Route path="/htmlupdate/:firebaseId" Component={HtmlUpdatePage} />
                                    <Route path="/cssupdate/:firebaseId" Component={CssUpdatePage} />
                                    <Route path="/jsupdate/:firebaseId" Component={JavaScriptUpdatePage} />
                                </Routes>
                            )
                            :
                            (
                                <Routes>
                                    <Route path="/" Component={QuizInstructions} />
                                    <Route path="/htmlquiz" Component={HtmlQuiz} />
                                    <Route path="/cssquiz" Component={CssQuiz} />
                                    <Route path="/jsquiz" Component={JavaScriptQuiz} />
                                </Routes>
                            )
                        :
                        (
                            <Routes>
                                <Route path="/" Component={UserRegisterPage} />
                                <Route path="/adminLogin" Component={AdminLoginPAge} />
                            </Routes>
                        )
                }
            </BrowserRouter>
        </DataShare.Provider>
    );
}

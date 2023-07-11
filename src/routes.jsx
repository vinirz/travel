import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Travel from "./pages/Travel";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils";

const PrivateRoute = ({children, redirectTo}) => {
    return isAuthenticated() ? children : <Navigate to={redirectTo}/>
}

export function MyRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/login" element={<Login/>}/>

            <Route path="/profile" element={
                <PrivateRoute redirectTo="/login">
                    <Profile/>
                </PrivateRoute>
            }/>
            
            <Route path="/travel/:id" element={
                <PrivateRoute redirectTo="/login">
                    <Travel/>
                </PrivateRoute>
            }/>
        </Routes>
    )
}
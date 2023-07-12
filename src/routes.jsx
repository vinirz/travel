import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Travel from "./pages/Travel";
import Login from "./pages/Login";
import { isAuthenticated } from "./utils";
import AddTravel from './pages/AddTravel';
import CreateAccount from "./pages/CreateAccount";

const PrivateRoute = ({children, redirectTo}) => {
    return isAuthenticated() ? children : <Navigate to={redirectTo}/>
}

export function MyRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route path="/login" element={<Login/>}/>

            <Route path="/createaccount" element={<CreateAccount/>}/>

            <Route path="/profile" element={
                <PrivateRoute redirectTo="/login">
                    <Profile/>
                </PrivateRoute>
            }/>
            
            <Route path="/travel/:iddest" element={
                <PrivateRoute redirectTo="/login">
                    <Travel/>
                </PrivateRoute>
            }/>

            <Route path="/addtravel" element={
                <PrivateRoute redirectTo="/login">
                    <AddTravel/>
                </PrivateRoute>
            }/>
        </Routes>
    )
}
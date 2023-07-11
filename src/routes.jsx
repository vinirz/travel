import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Profile from "./pages/Profile";
import Travel from "./pages/Travel";

export function MyRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/travel/:id" element={<Travel/>}></Route>
        </Routes>
    )
}
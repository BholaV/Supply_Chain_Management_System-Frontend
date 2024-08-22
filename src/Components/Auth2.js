import { Navigate } from "react-router-dom";

export default function Auth2({children}){
    if (!localStorage.getItem("user"))
        return children;
    else
        return <Navigate to="/" />
}
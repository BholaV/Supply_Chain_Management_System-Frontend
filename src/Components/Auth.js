import { Navigate } from "react-router-dom";

export default ({ children }) => {
    if (localStorage.getItem("user"))
        return children;
    else
        return <Navigate to="/signIn" />
}
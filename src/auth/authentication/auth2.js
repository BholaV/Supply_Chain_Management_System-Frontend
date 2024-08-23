import { Navigate } from "react-router-dom";

// This component is used to handle routing based on authentication status
export default function Auth2({ children }) {
    // Check if the 'user' item is not present in localStorage
    if (!localStorage.getItem("user")) {
        // If 'user' is not found in localStorage, render the children components (typically the login or sign-up page)
        return children;
    } else {
        // If 'user' is found in localStorage (indicating the user is already logged in), redirect to the home page
        return <Navigate to="/" />;
    }
}

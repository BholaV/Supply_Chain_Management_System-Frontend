import { Navigate } from "react-router-dom";

// This component is used to protect routes that require authentication
export default ({ children }) => {
    // Check if the user is logged in by checking the presence of 'user' in localStorage
    if (localStorage.getItem("user")) {
        // If a 'user' is found in localStorage, render the child components (protected content)
        return children;
    } else {
        // If no 'user' is found in localStorage, redirect the user to the sign-in page
        return <Navigate to="/signIn" />;
    }
}

export default function NoRouteFound() {
    return (
        <>
            {/* Container for the 404 error page */}
            <div className="container p-5" style={{ textAlign: 'center', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
                {/* Title for the 404 error */}
                <h1 style={{ fontSize: '3rem', color: '#721c24' }}>404 - Not Found!</h1>
                {/* Message for the user */}
                <p style={{ fontSize: '1.25rem', color: '#721c24' }}>Sorry, the page you are looking for does not exist.</p>
                
                {/* Optional: Provide a link to redirect users back to the homepage */}
                <a href="/" style={{ color: '#007bff', fontSize: '1rem', textDecoration: 'underline' }}>
                    Go back to the homepage
                </a>
            </div>
        </>
    );
}

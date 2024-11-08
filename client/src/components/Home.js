import "./Home.css"

// Home component - Landing page with welcome message and navigation options
export const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to JaMoveo</h1>
            <p>Your ultimate platform for streamlined, real-time rehearsals.</p>
            <div className="button-group">
                <a href="/signup" className="btn">Sign Up</a>
                <a href="/login" className="btn">Log In</a>
            </div>
        </div>
    )
}

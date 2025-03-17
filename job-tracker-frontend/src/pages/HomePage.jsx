import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Track Your Job Search Journey</h1>
                    <p>
                        Organize your job applications, interviews, and documents in one place.
                        Never miss an opportunity or deadline again.
                    </p>
                    {isAuthenticated ? (
                        <Link to="/dashboard">
                            <Button variant="primary" size="large">Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <div className="hero-buttons">
                            <Link to="/login">
                                <Button variant="primary" size="large">Log In</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="secondary" size="large">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="features">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Application Tracking</h3>
                        <p>Keep track of all your job applications and their current statuses.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Interview Management</h3>
                        <p>Schedule interviews and set reminders so you never miss an important meeting.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Document Storage</h3>
                        <p>Store different versions of your resume, cover letters, and other important documents.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Company Information</h3>
                        <p>Save details about companies you're interested in working for.</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Take Control of Your Job Search?</h2>
                <p>Join thousands of job seekers who have organized their job search and landed their dream jobs.</p>
                {!isAuthenticated && (
                    <Link to="/register">
                        <Button variant="primary" size="large">Get Started - It's Free</Button>
                    </Link>
                )}
            </section>
        </div>
    );
};

export default HomePage;
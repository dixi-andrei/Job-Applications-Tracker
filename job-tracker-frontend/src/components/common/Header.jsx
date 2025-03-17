import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="container">
                <div className="header-left">
                    <Link to="/" className="logo">
                        <img src="/assets/images/logo.svg" alt="Job Tracker" />
                        <span>Job Tracker</span>
                    </Link>
                </div>

                <div className="header-right">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>

                    {currentUser ? (
                        <div className="user-menu">
                            <span className="user-greeting">Hello, {currentUser.firstName || currentUser.username}</span>
                            <div className="dropdown-wrapper">
                                <button className="profile-button">
                                    <span className="profile-initial">{(currentUser.firstName?.[0] || currentUser.username?.[0] || 'U').toUpperCase()}</span>
                                </button>
                                <div className="dropdown-menu">
                                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                    <Link to="/settings" className="dropdown-item">Profile Settings</Link>
                                    <hr className="dropdown-divider" />
                                    <button onClick={handleLogout} className="dropdown-item logout-button">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login">
                                <Button variant="outline">Log In</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
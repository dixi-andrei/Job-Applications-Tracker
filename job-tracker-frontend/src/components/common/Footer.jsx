import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Job Tracker</h3>
                        <p>Track your job applications, interviews, and documents in one place.</p>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/job-applications">Applications</Link></li>
                            <li><Link to="/interviews">Interviews</Link></li>
                            <li><Link to="/documents">Documents</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Resources</h3>
                        <ul className="footer-links">
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Help Center</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Job Tracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
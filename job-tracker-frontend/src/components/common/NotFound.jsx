import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <Link to="/">
                    <Button>Return to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
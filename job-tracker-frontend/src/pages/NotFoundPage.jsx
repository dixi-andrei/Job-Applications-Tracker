import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button'; // Change this line

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <Button as={Link} to="/" variant="primary">
                Return to Home
            </Button>
        </div>
    );
};

export default NotFoundPage;
// src/components/ui/Loader.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size = 'medium', color = 'blue', fullScreen = false }) => {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-2',
        large: 'w-12 h-12 border-3'
    };

    const colorClasses = {
        blue: 'border-blue-600',
        gray: 'border-gray-600',
        green: 'border-green-600',
        red: 'border-red-600'
    };

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 z-50">
                <div className={`${sizeClasses[size]} rounded-full ${colorClasses[color]} border-t-transparent animate-spin`}></div>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div className={`${sizeClasses[size]} rounded-full ${colorClasses[color]} border-t-transparent animate-spin`}></div>
        </div>
    );
};

Loader.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.oneOf(['blue', 'gray', 'green', 'red']),
    fullScreen: PropTypes.bool
};

export default Loader;
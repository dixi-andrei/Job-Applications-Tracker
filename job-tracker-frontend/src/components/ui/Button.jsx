// src/components/ui/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
                    children,
                    type = 'button',
                    variant = 'primary',
                    size = 'medium',
                    onClick,
                    disabled,
                    fullWidth,
                    className,
                    ...props
                }) => {
    const baseClasses = 'button focus:outline-none focus:ring-2 focus:ring-offset-2 rounded transition-colors';

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
        ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    };

    const sizeClasses = {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2',
        large: 'px-6 py-3 text-lg'
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className || ''}`;

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'outline', 'ghost']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    className: PropTypes.string
};

export default Button;
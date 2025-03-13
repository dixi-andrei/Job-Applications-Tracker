// src/components/ui/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
                  children,
                  title,
                  subtitle,
                  footer,
                  className,
                  headerClassName,
                  bodyClassName,
                  footerClassName,
                  onClick,
                  ...props
              }) => {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden';

    return (
        <div
            className={`${baseClasses} ${className || ''}`}
            onClick={onClick}
            {...props}
        >
            {(title || subtitle) && (
                <div className={`px-4 py-5 sm:px-6 border-b dark:border-gray-700 ${headerClassName || ''}`}>
                    {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
                    {subtitle && <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
                </div>
            )}
            <div className={`px-4 py-5 sm:p-6 ${bodyClassName || ''}`}>
                {children}
            </div>
            {footer && (
                <div className={`px-4 py-4 sm:px-6 border-t dark:border-gray-700 ${footerClassName || ''}`}>
                    {footer}
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node,
    subtitle: PropTypes.node,
    footer: PropTypes.node,
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    onClick: PropTypes.func
};

export default Card;
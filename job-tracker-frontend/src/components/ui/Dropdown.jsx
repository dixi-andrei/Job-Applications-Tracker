// src/components/ui/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
                      items,
                      label,
                      icon,
                      buttonClassName,
                      menuClassName,
                      itemClassName,
                      onChange,
                      alignRight = false,
                      disabled = false
                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleItemClick = (item) => {
        onChange(item);
        setIsOpen(false);
    };

    const buttonClasses = `flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${buttonClassName || ''}`;

    const menuClasses = `absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${alignRight ? 'right-0' : 'left-0'} ${menuClassName || ''}`;

    const itemClasses = `block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${itemClassName || ''}`;

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className={buttonClasses}
                    onClick={toggleDropdown}
                    disabled={disabled}
                >
                    {label && <span>{label}</span>}
                    {icon && <span className="ml-2">{icon}</span>}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className={menuClasses}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {items.map((item, index) => (
                            <button
                                key={index}
                                className={itemClasses}
                                onClick={() => handleItemClick(item)}
                                role="menuitem"
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

Dropdown.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any,
            icon: PropTypes.node
        })
    ).isRequired,
    label: PropTypes.string,
    icon: PropTypes.node,
    buttonClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    alignRight: PropTypes.bool,
    disabled: PropTypes.bool
};

export default Dropdown;
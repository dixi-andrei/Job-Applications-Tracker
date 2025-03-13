// src/components/ui/Modal.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   footer,
                   size = 'medium',
                   closeOnEscape = true,
                   closeOnOutsideClick = true,
               }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (closeOnEscape && e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnEscape]);

    const handleOutsideClick = (e) => {
        if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const sizeClasses = {
        small: 'max-w-md',
        medium: 'max-w-lg',
        large: 'max-w-2xl',
        extraLarge: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                onClick={handleOutsideClick}
            >
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900 dark:opacity-90"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    ref={modalRef}
                    className={`inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-headline">
                                        {title}
                                    </h3>
                                    <button
                                        type="button"
                                        className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    {footer && (
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge', 'full']),
    closeOnEscape: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool
};

export default Modal;
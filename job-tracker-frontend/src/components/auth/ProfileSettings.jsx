import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useForm } from '../../hooks/useForm';

const ProfileSettings = () => {
    const { currentUser, updateProfile } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { values, handleChange, setValues } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (currentUser) {
            setValues({
                ...values,
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                username: currentUser.username || ''
            });
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const { newPassword, confirmPassword, currentPassword, ...updateData } = values;

        // Only include password fields if the user is trying to change password
        if (newPassword) {
            if (newPassword !== confirmPassword) {
                setError('New passwords do not match');
                setIsLoading(false);
                return;
            }
            updateData.password = newPassword;
            updateData.currentPassword = currentPassword;
        }

        try {
            await updateProfile(currentUser.id, updateData);
            setSuccess('Profile updated successfully');

            // Reset password fields
            setValues({
                ...values,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return <div>Loading profile information...</div>;
    }

    return (
        <Card className="profile-settings">
            <h2>Profile Settings</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            disabled
                        />
                        <small>Username cannot be changed</small>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Change Password</h3>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={values.currentPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            minLength="8"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default ProfileSettings;
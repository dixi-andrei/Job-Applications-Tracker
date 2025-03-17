import React from 'react';
import ProfileSettings from '../components/auth/ProfileSettings';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';
import Tab from '../components/ui/Tab';
import { useState } from 'react';

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    if (!user) return null;

    return (
        <div className="settings-page">
            <h1>Settings</h1>

            <Tab
                tabs={[
                    { id: 'profile', label: 'Profile Settings' },
                    { id: 'preferences', label: 'Preferences' },
                    { id: 'notifications', label: 'Notifications' },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="settings-container">
                {activeTab === 'profile' && (
                    <Card>
                        <h2>Profile Settings</h2>
                        <ProfileSettings user={user} />
                    </Card>
                )}

                {activeTab === 'preferences' && (
                    <Card>
                        <h2>Preferences</h2>
                        <p>Customize your application experience.</p>
                        {/* Preferences form will go here */}
                        <div className="placeholder-message">
                            Preferences settings coming soon
                        </div>
                    </Card>
                )}

                {activeTab === 'notifications' && (
                    <Card>
                        <h2>Notifications</h2>
                        <p>Manage email and in-app notifications.</p>
                        {/* Notifications form will go here */}
                        <div className="placeholder-message">
                            Notification settings coming soon
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
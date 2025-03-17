import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return null;
    }

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-dashboard"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/job-applications" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-applications"></i>
                            <span>Job Applications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/interviews" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-interviews"></i>
                            <span>Interviews</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/companies" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-companies"></i>
                            <span>Companies</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/documents" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-documents"></i>
                            <span>Documents</span>
                        </NavLink>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                            <i className="icon-settings"></i>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
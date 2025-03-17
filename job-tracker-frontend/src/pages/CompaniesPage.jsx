import React from 'react';
import CompanyList from '../components/companies/CompanyList';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const CompaniesPage = () => {
    return (
        <div className="companies-page">
            <div className="page-header">
                <h1>Companies</h1>
                <Link to="/companies/new">
                    <Button variant="primary">Add Company</Button>
                </Link>
            </div>
            <CompanyList />
        </div>
    );
};

export default CompaniesPage;
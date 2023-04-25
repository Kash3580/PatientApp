import React from 'react';

import DashboardLayout from './components/layout/DashboardLayout';

import LoginComponent from './components/login-component';
import CreatePatientComponent from './components/patient-component/create';
import PatientList from './components/patient-component';
import UpdatePatientComponent from './components/patient-component/update';

const routes = [
  {
    path: '/',
    element: <LoginComponent />
  },
  {
    path: 'patients',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <PatientList /> },
      { path: 'create', element: <CreatePatientComponent /> },
      { path: 'update', element: <UpdatePatientComponent /> }
    ]
  }
];

export default routes;

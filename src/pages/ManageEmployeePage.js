import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/ManageEmployeePage.css';

const ManageEmployeePage = ({ employees }) => {
  const [selectedDept, setSelectedDept] = useState('All');

  // Dummy data for employees
  const dummyEmployees = [
    { sr: 1, name: 'Ashish Sharma', code: 'EMP001', dept: 'IT', proj: 'Project A' },
    { sr: 2, name: 'Priya Singh', code: 'EMP002', dept: 'HR', proj: 'Project B' },
    { sr: 3, name: 'Rahul Jain', code: 'EMP003', dept: 'IT', proj: 'Project C' },
    { sr: 4, name: 'Anjali Gupta', code: 'EMP004', dept: 'Marketing', proj: 'Project D' },
    { sr: 5, name: 'Vikram Yadav', code: 'EMP005', dept: 'HR', proj: 'Project A' },
  ];

  const filteredEmployees = selectedDept === 'All'
    ? dummyEmployees
    : dummyEmployees.filter(emp => emp.dept === selectedDept);

  const departments = ['All', ...new Set(dummyEmployees.map(emp => emp.dept))];

  return (
    <div className="container">
      <Header />
      <main className="manage-employee-main">
        <div className="manage-employee-box">
          <h2>MANAGE EMPLOYEE</h2>
          <div className="filter-container">
            <label htmlFor="dept-select">Select Dept.</label>
            <select id="dept-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="employee-table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Dept.</th>
                  <th>Proj.</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.code}>
                    <td>{emp.sr}</td>
                    <td>{emp.name}</td>
                    <td>{emp.code}</td>
                    <td>{emp.dept}</td>
                    <td>{emp.proj}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageEmployeePage;
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/AddEmployeePage.css';

const AddEmployeePage = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    doj: '',
    department: '',
    project: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddEmployee) {
      onAddEmployee(formData);
    }
    setFormData({
      name: '',
      id: '',
      doj: '',
      department: '',
      project: '',
    });
    alert('Employee added successfully!');
  };

  return (
    <div className="container">
      <Header />
      <main className="add-employee-main">
        <div className="add-employee-box">
          <h2>ADD EMPLOYEE</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Emp Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="id">Emp ID/Code</label>
              <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="doj">DOJ</label>
              <input type="date" id="doj" name="doj" value={formData.doj} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="project">Project</label>
              <input type="text" id="project" name="project" value={formData.project} onChange={handleChange} required />
            </div>
            <button type="submit" className="add-emp-btn">ADD EMP</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddEmployeePage;
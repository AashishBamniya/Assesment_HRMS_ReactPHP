import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/AddEmployeePage.css';

const AddEmployeePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        doj: '',
        dept: '',
        proj: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., send data to a backend or update local state
        console.log('Form data submitted:', formData);
        // Reset the form after submission
        setFormData({
            name: '',
            code: '',
            doj: '',
            dept: '',
            proj: '',
        });
    };

    return (
        <div className="container">
            <Header />
            <main className="add-employee-main">
                <div className="add-employee-box">
                    <h2>ADD EMPLOYEE</h2>
                    <form className="add-employee-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="emp-name">Emp Name</label>
                            <input type="text" id="emp-name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emp-id">Emp ID/Code</label>
                            <input type="text" id="emp-id" name="code" value={formData.code} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="doj">DOJ</label>
                            <input type="date" id="doj" name="doj" value={formData.doj} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dept">Department</label>
                            <input type="text" id="dept" name="dept" value={formData.dept} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="proj">Project</label>
                            <input type="text" id="proj" name="proj" value={formData.proj} onChange={handleChange} required />
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
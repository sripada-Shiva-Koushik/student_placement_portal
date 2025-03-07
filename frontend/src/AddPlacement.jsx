import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPlacement = () => {
    const [data, setData] = useState({
        regNo: '',
        company: '',
        designation: '',
        salary: '',
        loi: null,
        newCompany: '', // Added state for the new company name
    });

    const [companyOptions, setCompanyOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanyOptions();
    }, []);

    const fetchCompanyOptions = () => {
        axios.get('http://localhost:8080/auth/getCompanyOptions')
            .then(res => {
                // Assuming res.data is an array of strings representing company names
                setCompanyOptions([...res.data, 'Add new']);
            })
            .catch(err => {
                console.error('Error fetching company options:', err);
            });
    };

    const handleCompanyChange = (value) => {
        if (value !== 'Add new') {
            setData({ ...data, company: value, newCompany: '' });
        } else {
            setData({ ...data, company: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('regNo', data.regNo);
        formData.append('company', data.company === 'Add new' ? data.newCompany : data.company);
        formData.append('designation', data.designation);
        formData.append('salary', data.salary);
        formData.append('loi', data.loi);

        axios.post('http://localhost:8080/auth/addPlacement', formData)
            .then(res => {
                navigate('/placement');
            })
            .catch(err => {
                console.error('Error adding placement:', err);
            });
    };

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Add Placement Details</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>

                <div className='col-12'>
                    <label htmlFor='inputRegister' className='form-label'>Register No</label>
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Enter Register'
                        id="inputRegister"
                        autoComplete='off'
                        onChange={e => setData({ ...data, regNo: e.target.value })}
                    />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputCompany' className='form-label'>Company Name</label>
                    <select
                        className='form-select'
                        onChange={e => handleCompanyChange(e.target.value)}
                    >
                        <option value='' disabled>Select Company</option>
                        {companyOptions.map((company, index) => (
                            <option key={index} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                </div>

                {data.company === 'Add new' && (
                    <div className='col-12'>
                        <label htmlFor='inputNewCompany' className='form-label'>New Company Name</label>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter New Company'
                            id="inputNewCompany"
                            autoComplete='off'
                            value={data.newCompany}
                            onChange={e => setData({ ...data, newCompany: e.target.value })}
                        />
                    </div>
                )}

                {/* Other form inputs */}
                {/* ... */}
                <div className='col-12'>
                    <label htmlFor='inputDesignation' className='form-label'>Designation</label>
                    <input type="text" className='form-control' placeholder='Enter Designation' id="inputDesignation" autoComplete='off'
                        onChange={e => setData({ ...data, designation: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputSalary' className='form-label'>Salary in LPA</label>
                    <input type="text" className='form-control' placeholder='Enter Salary' id="inputSalary" autoComplete='off'
                        onChange={e => setData({ ...data, salary: e.target.value })} />
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor='inputGroupFile01' className='form-label'>Letter of Intent</label>
                    <input type="file" className='form-control' id="inputGroupFile01"
                        onChange={e => setData({ ...data, loi: e.target.files[0] })} />
                </div>

                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    );
};

export default AddPlacement;

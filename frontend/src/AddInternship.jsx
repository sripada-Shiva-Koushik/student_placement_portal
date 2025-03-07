import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddInternship = () => {
    const [data, setDate] = useState({
        regNo: '',
        company: '',
        from: '',
        to: '',
        stipend: '',
        loi: null
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('regNo', data.regNo);
        formdata.append('company', data.company);
        formdata.append('from', data.from);
        formdata.append('to', data.to);
        formdata.append('stipend', data.stipend);
        formdata.append('loi', data.loi);
        console.log(data);
        axios.post('http://localhost:8080/auth/addInternship', formdata)
            .then(res => {
                console.log(formdata);
                navigate('/internship')
            })
            .catch(err => console.log(err.response))
    }
    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Add Internship Details</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label htmlFor='inputRegiste' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register' id="inputRegiste" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputCompany' className='form-label'>Company Name</label>
                    <input type="text" className='form-control' placeholder='Enter Comapny' id="inputCompany" autoComplete='off'
                        onChange={e => setDate({ ...data, company: e.target.value })} />
                </div>

                <div className='col-12'>
                    <label htmlFor='inputDesignation' className='form-label'>From</label>
                    <input type="date" className='form-control' placeholder='Enter From Date' id="inputDesignation" autoComplete='off'
                        onChange={e => setDate({ ...data, from: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputSalary' className='form-label'>To</label>
                    <input type="date" className='form-control' placeholder='Enter To Date' id="inputSalary" autoComplete='off'
                        onChange={e => setDate({ ...data, to: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputSalary' className='form-label'>Stipend</label>
                    <input type="number" className='form-control' placeholder='Enter Stipend' id="inputSalary" autoComplete='off'
                        onChange={e => setDate({ ...data, stipend: e.target.value })} />
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor='inputGroupFile01' className='form-label'>Letter of Intent</label>
                    <input type="file" className='form-control' id="inputGroupFile01"
                        onChange={e => setDate({ ...data, loi: e.target.files[0] })} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddInternship
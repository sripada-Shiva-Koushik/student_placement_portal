import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddHigherStudies = () => {
    const [data, setDate] = useState({
        regNo: '',
        studentname: '',
        batch: '',
        course: '',
        university: '',
        branch: '',
        admissionyear: '',
        lor: null
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('regNo', data.regNo);
        formdata.append('studentname', data.studentname);
        formdata.append('batch', data.batch);
        formdata.append('course', data.course);
        formdata.append('university', data.university);
        formdata.append('branch', data.branch);
        formdata.append('admissionyear', data.admissionyear);
        formdata.append('lor', data.lor);
        console.log(data);
        axios.post('http://localhost:8080/auth/createhighstudy', formdata)
            .then(res => {
                console.log(formdata);
                navigate('/admin/higherstudies')
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
                    <label htmlFor='inputName' className='form-label'>Student Name</label>
                    <input type="text" className='form-control' placeholder='Enter Student Name' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, studentname: e.target.value })} />
                </div>

                <div className='col-12'>
                    <label htmlFor='inputbatch' className='form-label'>Batch</label>
                    <input type="text" className='form-control' placeholder='Batch' id="inputbatch" autoComplete='off'
                        onChange={e => setDate({ ...data, batch: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputCourse' className='form-label'>Course</label>
                    <input type="text" className='form-control' placeholder='Enter Course Name' id="inputCourse" autoComplete='off'
                        onChange={e => setDate({ ...data, course: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputUniversity' className='form-label'>University</label>
                    <input type="text" className='form-control' placeholder='Enter Univerity Name' id="inputUniversity" autoComplete='off'
                        onChange={e => setDate({ ...data, university: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputBranch' className='form-label'>Branch</label>
                    <input type="text" className='form-control' placeholder='Enter Branch' id="inputBranch" autoComplete='off'
                        onChange={e => setDate({ ...data, branch: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label htmlFor='inputAdmissionYear' className='form-label'>Admission Year</label>
                    <input type="text" className='form-control' placeholder='Enter Admission Year' id="inputAdmissionYear" autoComplete='off'
                        onChange={e => setDate({ ...data, admissionyear: e.target.value })} />
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor='inputGroupFile01' className='form-label'>Letter of Recomendation</label>
                    <input type="file" className='form-control' id="inputGroupFile01"
                        onChange={e => setDate({ ...data, lor: e.target.files[0] })} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddHigherStudies
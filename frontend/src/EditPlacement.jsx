import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditPlacement = () => {
    const [data, setDate] = useState({
        studentname: '',
        regNo: '',
        email: '',
        year: '',
        dept: ''
    })

    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {

        axios.get('http://localhost:8080/auth/getPlacement/' + id)
            .then(res => {
                setDate({
                    ...data, studentname: res.data.Result[0].studentname,
                    email: res.data.Result[0].email,
                    regNo: res.data.Result[0].regNo,
                    year: res.data.Result[0].year,
                    dept: res.data.Result[0].dept,
                })
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/auth/placeupdate/' + id, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/placement')
                    alert("Successfully Updated")
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Update Student</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputName' className='form-label'>Name</label>
                    <input type="text" className='form-control' placeholder='Enter Name' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, studentname: e.target.value })} value={data.studentname} />
                </div>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register' id="inputRegister" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} value={data.regNo} />
                </div>
                <div className='col-12'>
                    <label for='inputEmail4' className='form-label'>Email</label>
                    <input type="email" className='form-control' placeholder='Enter Email' id="inputEmail4" autoComplete='off'
                        onChange={e => setDate({ ...data, email: e.target.value })} value={data.email} />
                </div>

                <div className='col-12'>
                    <label for='Year' className='form-label'>Year</label>
                    <input type="number" className='form-control' placeholder='Enter Year' id="inputYear" autoComplete='off'
                        onChange={e => setDate({ ...data, year: e.target.value })} value={data.year} />
                </div>
                <div className='col-12'>
                    <label for='inputDept' className='form-label'>Department</label>
                    <input type="text" className='form-control' placeholder='Enter Department' id="inputDept" autoComplete='off'
                        onChange={e => setDate({ ...data, dept: e.target.value })} value={data.dept} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-outline-primary'>Update</button>
                </div>

            </form>
        </div>
    )
}

export default EditPlacement
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const StudentDelete = () => {
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

        axios.get('http://localhost:8080/auth/get/' + id)
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

    const handlePlacementEditClick = () => {
        navigate(`/selectEdit/${id}`)
    }

    const handleSubmit = (id) => {
        axios.delete('http://localhost:8080/auth/delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/placement')
                    alert("Successfully Deleted")
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Delete Student</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputName' className='form-label'>Name</label>
                    <input type="text" className='form-control' placeholder='Enter Name' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, studentname: e.target.value })} value={data.studentname} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register' id="inputRegister" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} value={data.regNo} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputEmail4' className='form-label'>Email</label>
                    <input type="email" className='form-control' placeholder='Enter Email' id="inputEmail4" autoComplete='off'
                        onChange={e => setDate({ ...data, email: e.target.value })} value={data.email} disabled />
                </div>

                <div className='col-12'>
                    <label for='Year' className='form-label'>Year</label>
                    <input type="number" className='form-control' placeholder='Enter Year' id="inputYear" autoComplete='off'
                        onChange={e => setDate({ ...data, year: e.target.value })} value={data.year} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputDept' className='form-label'>Department</label>
                    <input type="text" className='form-control' placeholder='Enter Department' id="inputDept" autoComplete='off'
                        onChange={e => setDate({ ...data, dept: e.target.value })} value={data.dept} disabled />
                </div>
                <div className='col-12'>
                    <button onClick={e => handleSubmit(data.regNo)} className='btn btn-primary'>Delete</button>
                </div>
                {/* <div>
                    <Link to={`/placementEdit/${id}`} className='btn btn-primary'>Placement</Link>
                </div> */}
            </form>
            <div className='mt-3'>
                <button type='button' className='btn btn-primary' onClick={handlePlacementEditClick}>Placement</button>
            </div>
        </div>
    )
}

export default StudentDelete
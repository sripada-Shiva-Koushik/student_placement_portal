import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SinglePlaceEdit = () => {
    const [data, setDate] = useState({
        regNo: '',
        company: '',
        designation: '',
        salary: '',
        loi: ''
    })

    const navigate = useNavigate()
    const { id, company } = useParams();

    useEffect(() => {

        axios.get('http://localhost:8080/auth/getCompany/' + company)
            .then(res => {
                setDate({
                    ...data, regNo: res.data.Result[0].regNo,
                    company: res.data.Result[0].company,
                    designation: res.data.Result[0].designation,
                    salary: res.data.Result[0].salary,
                    loi: null,
                })
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/auth/singlePlaceUpdate/' + id + '/' + company, data)
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
            <h2>Update Placement Details</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register No.' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} value={data.regNo} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputCompany' className='form-label'>Company</label>
                    <input type="text" className='form-control' placeholder='Enter Company' id="inputCompany" autoComplete='off'
                        onChange={e => setDate({ ...data, company: e.target.value })} value={data.company} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputDesignation' className='form-label'>Designation</label>
                    <input type="text" className='form-control' placeholder='Enter Designation' id="inputDesignation" autoComplete='off'
                        onChange={e => setDate({ ...data, designation: e.target.value })} value={data.designation} />
                </div>

                <div className='col-12'>
                    <label for='salary' className='form-label'>Salary</label>
                    <input type="text" className='form-control' placeholder='Enter Salary' id="salary" autoComplete='off'
                        onChange={e => setDate({ ...data, salary: e.target.value })} value={data.salary} />
                </div>
                <div className='col-12'>
                    <label for='inputLOI' className='form-label'>Letter of Intent</label>
                    <input type="file" className='form-control' placeholder='Letter of Intent' id="inputLOI" autoComplete='off'
                        onChange={e => setDate({ ...data, loi: e.target.files[0] })} value={data.loi} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-outline-primary'>Update</button>
                </div>
                {/* <div>
                    <Link to={`/placementEdit/${id}`} className='btn btn-primary'>Placement</Link>
                </div> */}
            </form>

        </div>
    )
}

export default SinglePlaceEdit
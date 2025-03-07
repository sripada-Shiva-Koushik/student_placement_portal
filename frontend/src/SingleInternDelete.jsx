import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleInternDelete = () => {
    const [data, setDate] = useState({
        regNo: '',
        company: '',
        from: '',
        to: '',
        stipend: '',
        loi: ''
    })

    const navigate = useNavigate()
    const { id, company } = useParams();

    useEffect(() => {

        axios.get('http://localhost:8080/auth/getInternCompany/' + company)
            .then(res => {
                setDate({
                    ...data,
                    regNo: res.data.Result[0].regNo,
                    company: res.data.Result[0].company,
                    from: '',
                    to: '',
                    stipend: res.data.Result[0].stipend,
                    loi: null
                })
            })
            .catch(err => console.log(err))
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.delete('http://localhost:8080/auth/singleIDelete/' + id + '/' + company)
            // axios.delete(`http://localhost:8080/singlePDelete/${id}/${company}`, { data: data })
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(data);
                    navigate('/internship')
                    alert("Successfully Deleted")
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2 className='d-flex flex-column align-items-center pt-3'>Delete Placement Details</h2>
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
                    <label for='salary' className='form-label'>Stipend</label>
                    <input type="text" className='form-control' placeholder='Enter Salary' id="salary" autoComplete='off'
                        onChange={e => setDate({ ...data, stipend: e.target.value })} value={data.stipend} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputLOI' className='form-label'>Letter of Intent</label>
                    <input type="file" className='form-control' placeholder='Letter of Intent' id="inputLOI" autoComplete='off' disabled />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Delete</button>
                </div>
                {/* <div>
                    <Link to={`/placementEdit/${id}`} className='btn btn-primary'>Placement</Link>
                </div> */}
            </form>
        </div>
    )
}

export default SingleInternDelete
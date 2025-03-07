import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserPlacement = () => {

    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/user/detail/placement/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    console.log(res.data.Result);
                    setData(res.data.Result);

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleBack = () => {
        navigate('/dashboard'); // Replace with the appropriate route to go back
    };

    return (
        <div>
            <div className='placement-details-container'>
                <div className='placement-details'>
                    <h3>Placement Details</h3>
                    <p>Company: {data.company}</p>
                    <p>Designation: {data.designation}</p>
                    <p>Salary: {data.salary}</p>
                    <p>Letter Of Intent: {data.loi}</p>
                    {/* Add other placement details as needed */}
                </div>
            </div>
            <button onClick={handleBack}>Back</button>
        </div>
    )
}

export default UserPlacement
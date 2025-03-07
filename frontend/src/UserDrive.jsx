import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const UserDrive = () => {
    const [showJobForm, setShowJobForm] = useState(false); // State to manage the job form visibility
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/admin/driveget';

        axios.get(url)
            .then(res => {
                if (res.data.Status === 'Success') {
                    const formattedData = res.data.Result.reduce((filteredData, student, index) => {
                        const lastDate = moment(student.lastdate, 'YYYY MM DD');
                        const currentDate = moment();
                        const isActive = lastDate.isAfter(currentDate);

                        if (isActive) {
                            filteredData.push({
                                ...student,
                                isActive: 'Active',
                                number: filteredData.length + 1
                            });
                        }

                        return filteredData;
                    }, []);

                    setData(formattedData);
                } else {
                    alert('Error');
                }
            })
            .catch(err => console.log(err));
    };

    // const toggleJobForm = () => {
    //     setShowJobForm(!showJobForm);
    // };
    return (
        <div>
            <div className='d-flex justify-content-center'>

                <h1><em>Drive List</em></h1>
            </div>
            <div className="box-container ">
                {data.map((student, index) => (
                    <div className="box " key={index}>
                        <div className="status btn btn-success"><em>{student.isActive}</em></div>
                        <h3><em>{student.jobtitle}</em></h3>
                        <p><em>Company Name: {student.companyName}</em></p>
                        <p><em>Type: {student.type}</em></p>
                        <p><em>Description: {student.description}</em></p>
                        <p><em>Last Date: <span className="highlight">{moment(student.lastdate).format('DD MM YYYY          ')}</span></em></p>

                        <div className='button btn btn-outline-light'>
                            <a href={student.companyLink} target="_blank" rel="noopener noreferrer">Apply</a>
                        </div>

                    </div>
                ))
                }
            </div >
        </div >
    )
}

export default UserDrive
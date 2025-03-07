import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostJob from './PostJob';
import axios from 'axios';
import moment from 'moment';

const Drive = () => {
    const [showJobForm, setShowJobForm] = useState(false); // State to manage the job form visibility

    const [data, setData] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/admin/driveget'

        axios.get(url)
            .then(res => {
                if (res.data.Status === 'Success') {
                    const formattedData = res.data.Result.map(student => {
                        const lastDate = moment(student.lastdate).format('DD-MMMM-YYYY');
                        const currentDate = moment();
                        const isActive = moment(lastDate, 'DD-MMMM-YYYY').isAfter(currentDate);

                        return {
                            ...student,
                            lastdate: lastDate,
                            isActive: isActive ? 'Active' : 'Inactive'
                        };
                    });

                    formattedData.sort((a, b) => {
                        if (a.isActive === b.isActive) {
                            return 0;
                        }
                        return a.isActive === 'Active' ? -1 : 1;
                    });

                    setData(formattedData);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    }

    const toggleJobForm = () => {
        setShowJobForm(!showJobForm);
    };

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold', fontSize: '32px' }}>Drive List</h3>
            </div>

            <button className='btn btn-outline-primary mb-3' style={{ fontFamily: 'Times New Roman' }} onClick={toggleJobForm}>Post Job</button>

            <PostJob isOpen={showJobForm} onClose={toggleJobForm} />
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th style={{ fontFamily: 'Comic Sans MS' }}>Serial No</th>
                        <th style={{ fontFamily: 'Comic Sans MS' }}>Job Title</th>
                        <th style={{ fontFamily: 'Comic Sans MS', justifyContent: 'center' }}>Company name</th>
                        <th style={{ fontFamily: 'Comic Sans MS' }}>Company Link</th>
                        <th style={{ fontFamily: 'Comic Sans MS' }}>Last Date</th>
                        <th style={{ fontFamily: 'Comic Sans MS' }}>Status</th>
                        <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, index) => {

                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student.jobtitle}</td>
                            <td>{student.companyName}</td>
                            <td>
                                <a href={student.companyLink} target="_blank" rel="noopener noreferrer">
                                    {student.companyLink}
                                </a>
                            </td>
                            <td><em>{student.lastdate}</em></td>
                            <td>{student.isActive}</td>
                            <td className='action-buttons'>
                                <Link to={`/driveEdit/` + student.jobtitle + `/` + student.companyName} className='btn btn-outline-primary'>edit</Link>
                                <button className='btn btn-outline-danger'>delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Drive;

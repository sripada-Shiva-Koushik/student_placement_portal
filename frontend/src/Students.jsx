import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const Students = () => {
    const componentPDF = useRef();
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [studentNameFilter, setStudentNameFilter] = useState('');

    useEffect(() => {
        fetchData();
    }, [selectedYear, studentNameFilter]);

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/getStudent/';
        if (selectedYear) {
            url += `${selectedYear}`;
        }

        const params = {};

        if (studentNameFilter) {
            params.studentName = studentNameFilter;
        }

        axios
            .get(url, { params })
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Placementdata',
        onAfterPrint: () => alert('Data saved in PDF'),
    });

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Students List</h3>
            </div>

            <Link to='/create' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman' }}>
                Add Student
            </Link>

            <div className='mb-3 d-flex align-items-center'>
                <label htmlFor='studentNameFilter' className='me-2'>
                    Search by Student Name:
                </label>
                <input
                    type='text'
                    id='studentNameFilter'
                    placeholder='Enter Student name'
                    value={studentNameFilter}
                    onChange={(e) => setStudentNameFilter(e.target.value)}
                    className='form-control'
                />
            </div>

            <div className='mt-3'>
                <div className='mb-3'>
                    <select className='form-select' value={selectedYear} onChange={handleYearChange}>
                        <option value=''>Select Year</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2024'>2024</option>
                    </select>
                </div>

                <div ref={componentPDF} className='table-container' style={{ overflowX: 'auto' }}>
                    <table className='table table-bordered '>
                        <thead>
                            <tr>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>S.No</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Roll No</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>
                                    Image
                                </th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Name</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>
                                    University Mail Details
                                </th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Year</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>
                                    Dept
                                </th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.regNo}</td>
                                    <td className='action-buttons'>
                                        {<img src={`http://localhost:8080/images/` + student.image} alt='' className='student_image' />}
                                    </td>
                                    <td>{student.studentname}</td>
                                    <td className='action-buttons'>{student.email}</td>
                                    <td>{student.year}</td>
                                    <td>{student.dept}</td>
                                    <td className='action-buttons'>
                                        <Link to={`/studentEdit/` + student.regNo} className='btn btn-outline-primary'>
                                            edit
                                        </Link>
                                        <Link to={`/selectDelete/` + student.regNo} className='btn btn-outline-danger'>
                                            delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-primary' onClick={generatePDF}>
                    Print
                </button>
            </div>
        </div>
    );
};

export default Students;

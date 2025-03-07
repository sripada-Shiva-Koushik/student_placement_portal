import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import moment from 'moment'; // Import moment library

const Internship = () => {
    const componentPDF = useRef();
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/getIntern/';
        if (selectedYear) {
            url += `${selectedYear}`;
        }
        axios.get(url)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Intenshipdata",
        pageSize: 'A4',
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <div className='container'>
            <div className='my-5 text-center'>
                <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Internship List</h3>
            </div>

            <div className='mb-3'>
                <Link to='/create' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman' }}>Add Student</Link>
                <h3><Link to='/addInternship' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman', marginLeft: '0px' }}>Add Internship Details</Link></h3>
            </div>

            <div className='mt-3'>
                <div className='mb-3'>
                    <select className='form-select' value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                <div ref={componentPDF} className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>S.No</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Reg No</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Name of the Student</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Year</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Name of Company</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>From</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>To</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Letter of Intent</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.regNo}</td>
                                    <td>{student.studentname}</td>
                                    <td>{student.year}</td>
                                    <td>{student.companies}</td>
                                    {/* Format "From" date */}
                                    <td>{moment(student.from_date).format('DD MMMM YYYY')}</td>
                                    {/* Format "To" date */}
                                    <td>{moment(student.to_date).format('DD MMMM YYYY')}</td>
                                    <td className='action-buttons'>
                                        <button className='btn btn-outline-primary' onClick={() => window.open(`http://localhost:8080/lois/${student.loi}`, '_blank')}>
                                            Open PDF
                                        </button>
                                    </td>
                                    <td className='action-buttons'>
                                        <Link to={`/selectInternEdit/${student.regNo}`} className='btn btn-outline-primary'>edit</Link>
                                        <Link to={`/selectInternEdit/${student.regNo}`} className='btn btn-outline-danger'>delete</Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='text-center'>
                    <button className='btn btn-outline-primary' onClick={generatePDF}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default Internship;

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

const HigherStudies = () => {
    const componentPDF = useRef();
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/higherstd';

        if (selectedYear) {
            url += `/${selectedYear}`;
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
        documentTitle: "HigherStudiesdata",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Higher Studies Details</h3>
            </div>
            <div className="d-flex flex-row-column">
                <h3><Link to='/addHigherStudies' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman' }}>Add Higher Study Details</Link></h3>
                <div className="d-flex flex-row-reverse"></div>
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
                <div ref={componentPDF} className='table-container' style={{ overflowX: "auto" }}>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>S.No</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Register Number</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Student Name</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Batch</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Course</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>University</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Branch</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Year of Admission</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>LOR</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.regNo}</td>
                                    <td>{student.studentname}</td>
                                    <td>{student.batch}</td>
                                    <td>{student.course}</td>
                                    <td>{student.university}</td>
                                    <td>{student.branch}</td>
                                    <td>{student.admissionyear}</td>
                                    <td className='action-buttons'>
                                        <button className='btn btn-outline-primary' onClick={() => window.open(`http://localhost:8080/lors/${student.lor}`, '_blank')}>
                                            Open PDF
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/studentEdit/${student.regNo}`} className='btn btn-outline-primary'>
                                            edit
                                        </Link>
                                        <Link to={`/selectDelete/${student.regNo}`} className='btn btn-outline-danger'>
                                            delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-primary' onClick={generatePDF}>Print</button>
            </div>
        </div>
    )
}

export default HigherStudies;

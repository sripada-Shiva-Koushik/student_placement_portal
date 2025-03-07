import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from "react-to-print";

const Placement = () => {
    const componentPDF = useRef()
    const [data, setData] = useState([])
    const [selectedYear, setSelectedYear] = useState("");
    const [companyNameFilter, setCompanyNameFilter] = useState("");

    useEffect(() => {
        fetchData();
    }, [selectedYear, companyNameFilter])

    const fetchData = () => {
        let url = 'http://localhost:8080/auth/getPlaced/';

        if (selectedYear) {
            url += `${selectedYear}`;
        }

        const params = {};

        if (companyNameFilter) {
            params.companyName = companyNameFilter;
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
        documentTitle: "Placementdata",
        onAfterPrint: () => alert("Data saved in PDF")
    })

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Placement List</h3>
            </div>

            {/* <Link to='/create' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman' }}>Add Student</Link> */}
            <div className="d-flex flex-row-column">
                <h3><Link to='/addPlacement' className='btn btn-outline-primary' style={{ fontFamily: 'Times New Roman' }}>Add Placement Details</Link></h3>
                <div className="d-flex flex-row-reverse"></div>
            </div>

            <div className='mb-3 d-flex align-items-center'>
                <label htmlFor="companyNameFilter" className="me-2">Search by Company Name:</label>
                <input
                    type="text"
                    id="companyNameFilter"
                    placeholder="Enter company name"
                    value={companyNameFilter}
                    onChange={(e) => setCompanyNameFilter(e.target.value)}
                    className='form-control'
                />
            </div>

            <div className='mt-3'>
                <div className='mb-3'>
                    <select className='form-select' value={selectedYear} onChange={handleYearChange}>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2024">2024</option>
                    </select>
                </div>

                <div ref={componentPDF} className='table-container' style={{ overflowX: "auto" }}>
                    <table className='table table-bordered '>
                        <thead>
                            <tr>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>S.No</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Roll No</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Image</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Name</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>University Mail Details</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Year</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Dept</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Company</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Designation</th>
                                <th style={{ fontFamily: 'Comic Sans MS' }}>Salary</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Offer Letter</th>
                                <th className='hide-on-print' style={{ fontFamily: 'Comic Sans MS' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter((student) =>
                                    student.companies ? student.companies.includes(companyNameFilter) : false
                                )
                                .map((student, index) => {
                                    const companies = student.companies ? student.companies.split(',') : []
                                    const designations = student.designations ? student.designations.split(',') : []
                                    const salaries = student.salaries ? student.salaries.split(',') : []
                                    const lois = student.lois ? student.lois.split(',') : []
                                    const maxRowCount = Math.max(
                                        companies.length,
                                        designations.length,
                                        salaries.length,
                                        lois.length
                                    )
                                    return (
                                        <React.Fragment key={index} >
                                            {Array.from({ length: maxRowCount }).map((_, rowIndex) => (

                                                <tr key={rowIndex}>
                                                    {rowIndex === 0 && (
                                                        <>
                                                            <td rowSpan={maxRowCount}>{index + 1}</td>
                                                            <td rowSpan={maxRowCount}>{student.regNo}</td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {<img src={`http://localhost:8080/images/` + student.image} alt='' className='student_image' />}
                                                            </td>
                                                            <td rowSpan={maxRowCount}>{student.studentname}</td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {student.email}
                                                            </td>
                                                            <td rowSpan={maxRowCount}>{student.year}</td>
                                                            <td rowSpan={maxRowCount}>{student.dept}</td>
                                                        </>
                                                    )}
                                                    <td>{companies[rowIndex]}</td>
                                                    <td className='action-buttons'>{designations[rowIndex]}</td>
                                                    <td>{salaries[rowIndex]}</td>
                                                    {rowIndex === 0 && (
                                                        <>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                {lois.map((loi, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className='btn btn-outline-primary'
                                                                        onClick={() => window.open(`http://localhost:8080/lois/${loi}`, '_blank')}
                                                                    >
                                                                        Open PDF {index + 1}
                                                                    </button>
                                                                ))}
                                                            </td>
                                                            <td rowSpan={maxRowCount} className='action-buttons'>
                                                                <Link to={`/studentEdit/` + student.regNo} className='btn btn-outline-primary'>
                                                                    edit
                                                                </Link>
                                                                <Link to={`/selectDelete/` + student.regNo} className='btn btn-outline-danger'>
                                                                    delete
                                                                </Link>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-primary' onClick={generatePDF}>Print</button>
            </div>
        </div >
    )
}

export default Placement;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SelectInternEdit = () => {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/auth/getInterns/' + id)
            .then(res => {
                if (res.data.Status === 'Success') {
                    console.log(res.data.Result);
                    setData(res.data.Result);
                    // setFilteredColumns([
                    //     'Reg.No',
                    //     'Name of the Student',
                    //     'Year',
                    //     'Dept',
                    //     'Placed Company',
                    //     'Designation',
                    //     'Salary Per Annum',
                    // ]);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h3 style={{ justifyContent: 'center', display: 'flex' }}>Select To Update Or Delete</h3>
            <table className='table'>
                {/* <TableHeader columns={filteredColumns} /> */}
                <thead>
                    <tr>
                        <th>Reg.No</th>
                        <th>Company</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Stipend</th>
                        <th className='hide-on-print'>Letter Of Intent</th>
                        <th className='hide-on-print'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, index) => {
                        return <tr key={index}>
                            <td>{student.regNo}</td>
                            <td>{student.company}</td>
                            <td>{student.from}</td>
                            <td>{student.to}</td>
                            <td>{student.stipend}</td>

                            <td className='action-buttons'><a href={student.lois}>{student.loi}</a></td>
                            <td className='action-buttons'>
                                <Link to={`/singleInternEdit/` + student.regNo + `/` + student.company} className='btn btn-primary btn-sm me-2'>edit</Link>
                                <Link to={`/singleInternDelete/` + student.regNo + `/` + student.company} className='btn btn-sm btn-danger'>delete</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SelectInternEdit
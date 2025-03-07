import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SelectEdit = () => {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/auth/getPlace/' + id)
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

    // const handleDelete = (id) => {
    //     axios.delete('http://localhost:8080/singePDelete/' + id)
    //         .then(res => {
    //             if (res.data.Status === 'Success') {
    //                 setData(res.data.Result);
    //                 window.location.reload(true);
    //             } else {
    //                 alert("Error")
    //             }
    //         })
    // }
    return (
        <div>
            <table className='table'>
                {/* <TableHeader columns={filteredColumns} /> */}
                <thead>
                    <tr>
                        <th>Reg.No</th>
                        <th>Placed Company</th>
                        <th>Designation</th>
                        <th>Salary Per Annum</th>
                        <th className='hide-on-print'>Letter Of Intent</th>
                        <th className='hide-on-print'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student, index) => {
                        return <tr key={index}>
                            <td>{student.regNo}</td>
                            <td>{student.company}</td>
                            <td>{student.designation}</td>
                            <td>{student.salary}</td>

                            <td className='action-buttons'><a href={student.lois}>{student.loi}</a></td>
                            <td className='action-buttons'>
                                <Link to={`/singlePlaceEdit/` + student.regNo + `/` + student.company} className='btn btn-primary btn-sm me-2'>edit</Link>
                                <Link to={`/singlePlaceDelete/` + student.regNo + `/` + student.company} className='btn btn-sm btn-danger'>delete</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SelectEdit
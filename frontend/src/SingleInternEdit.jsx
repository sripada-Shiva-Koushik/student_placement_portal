import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleInternEdit = () => {
    const [data, setData] = useState({
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
                // setDate({
                //     ...data, regNo: res.data.Result[0].regNo,
                //     company: res.data.Result[0].company,
                //     from: res.data.Result[0].from,
                //     to: res.data.Result[0].to,
                //     stipend: res.data.Result[0].stipend,
                //     loi: null,
                // })
                // const formattedResult = res.data.Result.map(entry => ({
                //     ...entry,
                //     from: formatDate(entry.from),
                //     to: formatDate(entry.to)
                // }));

                setData({
                    ...data,
                    // regNo: formattedResult[0].regNo,
                    // company: formattedResult[0].company,
                    // from: formattedResult[0].from,
                    // to: formattedResult[0].to,
                    // stipend: formattedResult[0].stipend,
                    // loi: null
                    regNo: res.data.Result[0].regNo,
                    company: res.data.Result[0].company,
                    from: '',
                    to: '',
                    stipend: res.data.Result[0].stipend,
                    loi: null
                });
            })
            .catch(err => console.log(err))
        // axios.get('http://localhost:8080/auth/getInternCompany/' + company)
        //     .then(res => {
        //         if (res.data.Result && res.data.Result.length > 0) {
        //             const firstEntry = res.data.Result[0];
        //             setDate({
        //                 ...data,
        //                 regNo: firstEntry.regNo,
        //                 company: firstEntry.company,
        //                 from: firstEntry.from,
        //                 to: firstEntry.to,
        //                 stipend: firstEntry.stipend,
        //                 loi: null
        //             });
        //         } else {
        //             // Handle case when no data is returned
        //             console.log("No data found");
        //         }
        //     })
        //     .catch(err => console.log(err));

    }, [])

    // useEffect(() => {
    //     axios.get('http://localhost:8080/auth/getInternCompany/' + company)
    //         .then(res => {
    //             if (res.data.Result && res.data.Result.length > 0) {
    //                 const firstEntry = res.data.Result[0];
    //                 setData({
    //                     ...data,
    //                     regNo: firstEntry.regNo,
    //                     company: firstEntry.company,
    //                     from: firstEntry.from,
    //                     to: firstEntry.to,
    //                     stipend: firstEntry.stipend,
    //                     loi: null
    //                 });
    //             } else {
    //                 // Handle case when no data is returned
    //                 console.log("No internship records found for the specified company");
    //                 // You could also set a state to indicate that no data was found
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }, []);

    // useEffect(() => {
    //     console.log("Fetching internship data...");
    //     axios.get('http://localhost:8080/auth/getInternCompany/' + company)
    //         .then(res => {
    //             if (res.data.Result && res.data.Result.length > 0) {
    //                 const firstEntry = res.data.Result[0];
    //                 setData({
    //                     ...data,
    //                     regNo: firstEntry.regNo,
    //                     company: firstEntry.company,
    //                     from: firstEntry.from,
    //                     to: firstEntry.to,
    //                     stipend: firstEntry.stipend,
    //                     loi: null
    //                 });
    //             } else {
    //                 // Handle case when no data is returned
    //                 console.log("No internship records found for the specified company");
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }, []);


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'from' || name === 'to') {
            // Format the date string to YYYY-MM-DD for backend
            const formattedDate = value.split('-').reverse().join('-');
            setData(prevData => ({
                ...prevData,
                [name]: formattedDate
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };






    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put('http://localhost:8080/auth/singleInternUpdate/' + id + '/' + company, data)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 navigate('/internship')
    //                 alert("Successfully Updated")
    //             }

    //         })
    //         .catch(err => console.log(err))
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put('http://localhost:8080/auth/singleInternUpdate/' + id + '/' + company, data)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 navigate('/internship');
    //                 alert("Successfully Updated");
    //             } else {
    //                 // Handle submission failure
    //                 alert("Failed to update. Please try again.");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             // Handle submission error
    //             alert("An error occurred. Please try again later.");
    //         });
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put(`http://localhost:8080/auth/singleInternUpdate/${id}/${company}`, data)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 navigate('/internship');
    //                 alert("Successfully Updated");
    //             } else {
    //                 // Update failed, display error message
    //                 console.error("Error updating internship:", res.data.Error); // Or specific error message field
    //                 alert("Failed to update. Please try again.");
    //             }
    //         })
    //         .catch(err => {
    //             // Log and display the error message
    //             console.error("Error updating internship:", err);
    //             alert("Failed to update. Please try again.");
    //         });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/auth/singleInternUpdate/${id}/${company}`, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/internship');
                    alert("Successfully Updated");
                } else {
                    // Update failed, display error message
                    // console.error("Error updating internship:", res.data.Error); // Or specific error message field
                    // alert("Failed to update. Please try again.");
                    const errorMessage = res.data.Error; // Access the detailed error message
                    console.error("Error updating internship:", errorMessage);
                    alert(`Failed to update. Error: ${errorMessage}`);
                }
            })
            .catch(err => {
                // Log and display the error message
                if (err.response && err.response.data) {
                    const errorMessage = err.response.data;
                    console.error("Error updating internship:", errorMessage);
                    alert(`Failed to update. Error: ${errorMessage}`);
                } else {
                    console.error("Error updating internship:", err.message);
                    alert("An error occurred. Please try again later.");
                }
            });
    };






    // const formatDate = dateString => {
    //     const date = new Date(dateString);
    //     const day = date.getDate();
    //     const month = date.getMonth() + 1;
    //     const year = date.getFullYear();
    //     return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    // };

    // const formatDate = dateString => {
    //     if (!dateString) return ''; // Return empty string if dateString is undefined
    //     const date = new Date(dateString);
    //     const day = date.getDate();
    //     const month = date.getMonth() + 1;
    //     const year = date.getFullYear();
    //     return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    // };
    const formatDate = dateString => {
        if (!dateString) return ''; // Return empty string if dateString is undefined
        const parts = dateString.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    };



    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Update Internship Details</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    {/* <input type="text"
                        className='form-control'
                        placeholder='Enter Register No.'
                        id="inputName" autoComplete='off'
                        // onChange={e => setDate({ ...data, regNo: e.target.value })}
                        onChange={handleChange}
                        value={data.regNo || ''} /> */}
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Enter Register No.'
                        id="inputName"
                        autoComplete='off'
                        name="regNo"
                        onChange={handleChange}
                        value={data.regNo}
                        disabled
                    />

                </div>
                <div className='col-12'>
                    <label for='inputCompany' className='form-label'>Company</label>
                    {/* <input type="text" className='form-control' placeholder='Enter Company' id="inputCompany" autoComplete='off'
                        // onChange={e => setDate({ ...data, company: e.target.value })} 
                        onChange={handleChange}
                        value={data.company || ''} /> */}
                    <input
                        type="text"
                        className='form-control'
                        placeholder='Enter Company'
                        id="inputCompany"
                        autoComplete='off'
                        name="company"
                        onChange={handleChange}
                        value={data.company}
                        disabled
                    />

                </div>
                <div className='col-12'>
                    <label for='inputFrom' className='form-label'>From</label>
                    {/* <input type="date"
                        className='form-control'
                        placeholder='Enter From'
                        id="inputFrom"
                        autoComplete='off'
                        // onChange={e => setDate({ ...data, from: e.target.value })}
                        onChange={handleChange}
                        value={data.from ? formatDate(data.from) : '' || ''} /> */}
                    <input
                        type="date"
                        className='form-control'
                        placeholder='Enter From'
                        id="inputFrom"
                        autoComplete='off'
                        name="from"
                        onChange={handleChange}
                        value={data.from ? formatDate(data.from) : ''}
                    />

                </div>
                <div className='col-12'>
                    <label for='inputTo' className='form-label'>To</label>
                    {/* <input type="date"
                        className='form-control'
                        placeholder='Enter To'
                        id="inputTo"
                        autoComplete='off'
                        // onChange={e => setDate({ ...data, to: e.target.value })}
                        onChange={handleChange}
                        value={data.to ? formatDate(data.to) : '' || ''} /> */}
                    <input
                        type="date"
                        className='form-control'
                        placeholder='Enter To'
                        id="inputTo"
                        autoComplete='off'
                        name="to"
                        onChange={handleChange}
                        value={data.to ? formatDate(data.to) : ''}
                    />

                </div>

                <div className='col-12'>
                    <label for='stipend' className='form-label'>Stipend</label>
                    {/* <input type="number" className='form-control' placeholder='Enter Stipend' id="stipend" autoComplete='off'
                        // onChange={e => setDate({ ...data, stipend: e.target.value })} 
                        onChange={handleChange}
                        value={data.stipend || ''} /> */}
                    <input
                        type="number"
                        className='form-control'
                        placeholder='Enter Stipend'
                        id="stipend"
                        autoComplete='off'
                        name="stipend"
                        onChange={handleChange}
                        value={data.stipend}
                    />

                </div>
                <div className='col-12'>
                    <label for='inputLOI' className='form-label'>Letter of Intent</label>
                    {/* <input type="file" className='form-control' placeholder='Letter of Intent' id="inputLOI" autoComplete='off'
                        // onChange={e => setDate({ ...data, loi: e.target.files[0] })}
                        onChange={handleChange}
                        value={data.loi || ''} /> */}
                    <input
                        type="file"
                        className='form-control'
                        placeholder='Letter of Intent'
                        id="inputLOI"
                        autoComplete='off'
                        name="loi"
                        onChange={handleChange}
                        value={data.loi}
                    />

                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </div>
                {/* <div>
                    <Link to={`/placementEdit/${id}`} className='btn btn-primary'>Placement</Link>
                </div> */}
            </form>
        </div>
    )
}

export default SingleInternEdit

// const SingleInternEdit = () => {
//     const [data, setData] = useState({
//         regNo: '',
//         company: '',
//         from: '',
//         to: '',
//         stipend: '',
//         loi: null // Initialize loi as null
//     });

//     const navigate = useNavigate();
//     const { id, company } = useParams();

//     useEffect(() => {
//         axios.get('http://localhost:8080/auth/getInternCompany/' + company)
//             .then(res => {
//                 if (res.data.Result && res.data.Result.length > 0) {
//                     const firstEntry = res.data.Result[0];
//                     setData({
//                         regNo: firstEntry.regNo,
//                         company: firstEntry.company,
//                         from: firstEntry.from,
//                         to: firstEntry.to,
//                         stipend: firstEntry.stipend,
//                         loi: firstEntry.loi // Update loi if available
//                     });
//                 } else {
//                     console.log("No internship records found for the specified company");
//                 }
//             })
//             .catch(err => console.log(err));
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.put('http://localhost:8080/auth/singleInternUpdate/' + id + '/' + company, data)
//             .then(res => {
//                 if (res.data.Status === "Success") {
//                     navigate('/internship');
//                     alert("Successfully Updated");
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const formatDate = dateString => {
//         const date = new Date(dateString);
//         const day = date.getDate();
//         const month = date.getMonth() + 1;
//         const year = date.getFullYear();
//         return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
//     };

//     return (
//         <div className='d-flex flex-column align-items-center pt-3'>
//             <h2>Update Internship Details</h2>
//             <form className='row g-3 w-50' onSubmit={handleSubmit}>
//                 <div className='col-12'>
//                     <label htmlFor='inputRegister' className='form-label'>Register No</label>
//                     <input type="text" className='form-control' name="regNo" placeholder='Enter Register No.' id="inputName" autoComplete='off'
//                         onChange={handleChange} value={data.regNo} disabled />
//                 </div>
//                 <div className='col-12'>
//                     <label htmlFor='inputCompany' className='form-label'>Company</label>
//                     <input type="text" className='form-control' name="company" placeholder='Enter Company' id="inputCompany" autoComplete='off'
//                         onChange={handleChange} value={data.company} disabled />
//                 </div>
//                 <div className='col-12'>
//                     <label htmlFor='inputFrom' className='form-label'>From</label>
//                     <input type="date"
//                         className='form-control'
//                         placeholder='Enter From'
//                         id="inputFrom"
//                         autoComplete='off'
//                         onChange={handleChange}
//                         value={data.from ? formatDate(data.from) : ''} />
//                 </div>
//                 <div className='col-12'>
//                     <label htmlFor='inputTo' className='form-label'>To</label>
//                     <input type="date"
//                         className='form-control'
//                         placeholder='Enter To'
//                         id="inputTo"
//                         autoComplete='off'
//                         onChange={handleChange}
//                         value={data.to ? formatDate(data.to) : ''} />
//                 </div>
//                 <div className='col-12'>
//                     <label htmlFor='stipend' className='form-label'>Stipend</label>
//                     <input type="number" className='form-control' name="stipend" placeholder='Enter Stipend' id="stipend" autoComplete='off'
//                         onChange={handleChange} value={data.stipend} />
//                 </div>
//                 <div className='col-12'>
//                     <label htmlFor='inputLOI' className='form-label'>Letter of Intent</label>
//                     <input type="file" className='form-control' name="loi" placeholder='Letter of Intent' id="inputLOI" autoComplete='off'
//                         onChange={handleChange} />
//                 </div>
//                 <div className='col-12'>
//                     <button type='submit' className='btn btn-primary'>Update</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default SingleInternEdit;

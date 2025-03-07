import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const PostJob = ({ isOpen, onClose }) => {
    const [data, setData] = useState({
        jobtitle: '',
        companyName: '',
        type: '',
        companyLink: '',
        lastdate: '',
        description: '',
        year: ''
        // skills: [],

    });


    const navigate = useNavigate();



    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append('jobtitle', data.jobtitle);
    //     formData.append('companyName', data.companyName);
    //     formData.append('type', data.type);
    //     formData.append('companyLink', data.companyLink);
    //     formData.append('lastdate', data.lastdate);
    //     formData.append('description', data.description);

    //     axios.post('http://localhost:8080/auth/createJob', formData)
    //         .then(res => {
    //             onClose();
    //         })
    //         .catch(err => {
    //             console.error('Error adding job:', err);
    //         });
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const formData = new FormData();
    //         formData.append('jobtitle', data.jobtitle);
    //         formData.append('companyName', data.companyName);
    //         formData.append('type', data.type);
    //         formData.append('companyLink', data.companyLink);
    //         formData.append('lastdate', data.lastdate);
    //         formData.append('description', data.description);

    //         console.log('Form Data: ', Object.fromEntries(formData));

    //         const response = await axios.post('http://localhost:8080/auth/createJob', formData);

    //         if (response.status === 201) {
    //             onClose(); // Close the modal if job creation is successful
    //         } else {
    //             console.error('Unexpected status code:', response.status);
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             console.error('Error adding job:', error.response.status);
    //             console.error('Response data:', error.response.data);
    //             // Display the error message to the user
    //             alert(error.response.data.error);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             console.error('No response received:', error.request);
    //             // Display a generic error message to the user
    //             alert('An error occurred while processing your request. Please try again later.');
    //         } else {
    //             // Something happened in setting up the request that triggered an error
    //             console.error('Error setting up the request:', error.message);
    //             // Display a generic error message to the user
    //             alert('An error occurred while processing your request. Please try again later.');
    //         }
    //     }
    // };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = {
                jobtitle: data.jobtitle,
                companyName: data.companyName,
                type: data.type,
                companyLink: data.companyLink,
                lastdate: data.lastdate,
                description: data.description,
                year: data.year,
            };

            console.log('Form Data: ', formData);

            const response = await axios.post('http://localhost:8080/auth/createJob', formData);

            if (response.status === 200) {

                sendEmailsToUsersFromYear(formData.year);
                onClose(); // Close the modal if job creation is successful
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error adding job:', error);
        }
    };

    const sendEmailsToUsersFromYear = async (year) => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/users?year=${year}`);
            const users = response.data;

            // Loop through users and send emails
            users.forEach((user) => {
                // Send email logic here
            });
        } catch (error) {
            console.error('Error fetching users or sending emails:', error);
        }
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({ ...prevState, [name]: value })); // Update the corresponding state field based on the input name
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} fullWidth>
            <h2><em>Post a Job</em></h2>
            <form onSubmit={handleSubmit}>


                <label htmlFor='jobTitle' className='form-label'>Job Title</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Job Title'
                    id="jobTitle"
                    name="jobtitle"
                    value={data.jobtitle}
                    autoComplete='off'
                    // onChange={e => setData({ ...data, jobtitle: e.target.value })}
                    onChange={handleChange}
                />

                <label htmlFor='companyname' className='form-label'>Company Name</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Company Name'
                    id="companyname"
                    name="companyName"
                    autoComplete='off'
                    value={data.companyName}
                    // onChange={e => setData({ ...data, companyName: e.target.value })}
                    onChange={handleChange}
                />

                <label htmlFor='type' className='form-label'>Type</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Type'
                    id="type"
                    name="type"
                    autoComplete='off'
                    value={data.type}
                    // onChange={e => setData({ ...data, type: e.target.value })}
                    onChange={handleChange}
                />

                <label htmlFor='companylink' className='form-label'>Link</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Link'
                    id="companylink"
                    name="companyLink"
                    autoComplete='off'
                    value={data.companyLink}
                    // onChange={e => setData({ ...data, companyLink: e.target.value })}
                    onChange={handleChange}
                />

                <label htmlFor='lastDate' className='form-label'>Last Date</label>
                <input type="date"
                    className='form-control'
                    placeholder='Last Date'
                    id="lastDate"
                    name="lastdate"
                    autoComplete='off'
                    value={data.lastdate}
                    // onChange={e => setData({ ...data, lastdate: e.target.value })} 
                    onChange={handleChange}
                />

                <label htmlFor='description' className='form-label'>Description</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Description'
                    id="description"
                    name="description"
                    value={data.description}
                    // onChange={e => setData({ ...data, description: e.target.value })}
                    onChange={handleChange}
                />

                {/* <label htmlFor='year' className='form-label'>Year</label>
                <select
                    className='form-select'
                    id='year'
                    name='year'
                    value={data.year}
                    onChange={handleChange}
                >
                    <option value=''>Select Year</option>
                    {years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select> */}

                <label htmlFor='year' className='form-label'>Year</label>
                <input
                    type='text'
                    className='form-control'
                    id='year'
                    name='year'
                    value={data.year}
                    onChange={handleChange}
                    placeholder='Enter Year'
                />




                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </Modal>
    );
};

export default PostJob;

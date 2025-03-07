import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriveEdit = () => {
    const { jobtitle, companyName } = useParams(); // Getting jobtitle and companyName from URL params
    const navigate = useNavigate(); // Hook for navigation

    // State to manage form data
    const [formData, setFormData] = useState({
        type: '',
        companyLink: '',
        lastdate: '',
        description: ''
    });

    // Effect hook to fetch drive details on component mount
    useEffect(() => {
        // Fetch drive details from the server based on jobtitle and companyName
        axios.get(`http://localhost:8080/auth/getDrive/${jobtitle}/${companyName}`)
            .then(response => {
                const drive = response.data.Result[0]; // Assuming only one drive will be returned
                // Update form data with fetched drive details
                setFormData({
                    type: drive.type,
                    companyLink: drive.companyLink,
                    lastdate: '',
                    description: drive.description
                });
            })
            .catch(error => {
                console.error('Error fetching drive details:', error);
            });
    }, [jobtitle, companyName]); // Dependency array to ensure useEffect runs only when jobtitle or companyName changes

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Send PUT request to update drive details
            await axios.put(`http://localhost:8080/auth/update/${jobtitle}/${companyName}`, formData);
            // If update is successful, navigate to Drive component
            navigate('/drive');
            alert('Drive details updated successfully.');
        } catch (error) {
            console.error('Error updating drive details:', error);
            alert('Failed to update drive details. Please try again later.');
        }
    };

    // Function to handle form field changes
    const handleInputChange = (event) => {
        // Update the corresponding form field in formData state
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Edit Drive</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label htmlFor="type" className='form-label'>Type:</label>
                    <input type="text" id="type" className='form-control' name="type" value={formData.type} onChange={handleInputChange} />
                </div>
                <div className='col-12'>
                    <label htmlFor="companyLink" className='form-label'>Company Link:</label>
                    <input type="text" id="companyLink" className='form-control' name="companyLink" value={formData.companyLink} onChange={handleInputChange} />
                </div>
                <div className='col-12'>
                    <label htmlFor="lastdate" className='form-label'>Last Date:</label>
                    <input type="date" id="lastdate" className='form-control' name="lastdate" value={formData.lastdate} onChange={handleInputChange} />
                </div>
                <div className='col-12'>
                    <label htmlFor="description" className='form-label'>Description:</label>
                    <textarea id="description" className='form-control' name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </div>
            </form>
        </div>
    );
};

export default DriveEdit;

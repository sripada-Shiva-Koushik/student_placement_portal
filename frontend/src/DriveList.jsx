// PostDriveModal.jsx

import React, { useState } from 'react';
import Modal from 'react-modal'; // You can use any modal library

const DriveList = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        fullTime: false,
        companyName: '',
        companyURL: '',
        remote: false,
        jobLink: '',
        jobDescription: '',
        skills: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSkillsChange = (e) => {
        const { options } = e.target;
        const selectedSkills = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedSkills.push(options[i].value);
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            skills: selectedSkills,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submission or API call to post the drive with formData
        // Add your logic to handle the data submission
        console.log(formData); // Displaying form data for demonstration
        onClose(); // Close the modal after submission
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Post Drive</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    />
                </label>
                {/* Other form fields */}
                <button type="submit">Post</button>
            </form>
        </Modal>
    );
};

export default DriveList;

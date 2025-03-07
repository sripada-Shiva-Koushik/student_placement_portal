import React, { useState } from 'react';

const ResumeMaker = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: '',
        experience: '',
        skills: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateResume = () => {
        // You can customize the resume template based on your design and requirements
        const resumeTemplate = `
          \n\nResume\n\n
          Name: ${formData.firstName} ${formData.lastName}\n
          Email: ${formData.email}\n
          Phone: ${formData.phone}\n
          Address: ${formData.address}\n\n
          Education: ${formData.education}\n\n
          Experience: ${formData.experience}\n\n
          Skills: ${formData.skills}
        `;

        // Open a new window with the generated resume
        const resumeWindow = window.open('', '_blank');
        resumeWindow.document.write('<pre>' + resumeTemplate + '</pre>');
    };

    return (
        <div>
            <h2>Resume Maker</h2>
            <form>
                <label>First Name:</label>
                <input type="text" name="firstName" onChange={handleInputChange} />

                <label>Last Name:</label>
                <input type="text" name="lastName" onChange={handleInputChange} />

                <label>Email:</label>
                <input type="text" name="email" onChange={handleInputChange} />

                <label>Phone:</label>
                <input type="text" name="phone" onChange={handleInputChange} />

                <label>Address:</label>
                <input type="text" name="address" onChange={handleInputChange} />

                <label>Education:</label>
                <textarea name="education" onChange={handleInputChange}></textarea>

                <label>Experience:</label>
                <textarea name="experience" onChange={handleInputChange}></textarea>

                <label>Skills:</label>
                <textarea name="skills" onChange={handleInputChange}></textarea>

                <button type="button" onClick={generateResume}>Generate Resume</button>
            </form>
        </div>
    );
};

export default ResumeMaker
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from './Charts/BarChart';

const Home = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [studentCSECount, setStudentCSECount] = useState(0);
    const [studentITCount, setStudentITCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const studentRes = await axios.get('http://localhost:8080/auth/studentCount');
            const cseRes = await axios.get('http://localhost:8080/auth/studentCountCSE');
            const itRes = await axios.get('http://localhost:8080/auth/studentCountIT');
            setStudentCount(studentRes.data[0]?.Students || 0);
            setStudentCSECount(cseRes.data[0]?.CSEStudents || 0);
            setStudentITCount(itRes.data[0]?.ITStudents || 0);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className='px-3 d-flex justify-content-around mt-3 bg-white p-3 border border-primary rounded-3'>
                <div className='bg-white p-3 border border-primary rounded-3'>
                    <div className='text-center pb-1'>
                        <h4><em>Students</em></h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>CSE: {studentCSECount}</h5>
                    </div>
                </div>
                <div className='bg-white p-3 border border-primary rounded-3 '>
                    <div className='text-center pb-1'>
                        <h4><em>Students</em></h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>IT: {studentITCount}</h5>
                    </div>
                </div>
                <div className='bg-white p-3 border border-primary rounded-3'>
                    <div className='text-center pb-1'>
                        <h4><em>Students</em></h4>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Total: {studentCount}</h5>
                    </div>
                </div>
            </div>
            <BarChart studentCount={studentCount} studentCSECount={studentCSECount} studentITCount={studentITCount} />
        </div>
    );
};

export default Home;

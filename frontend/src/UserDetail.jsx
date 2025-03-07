import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserDetail = () => {
    const [userdetail, setUserdetail] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        axios.get('http://localhost:8080/user/detail/' + id)
            .then(result => {
                setUserdetail(result.data[0])
            })
            .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/user/logout')
            .then(res => {
                if (res.data.Status) {
                    navigate('/start')
                }

            }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className='user-details-container bg-white p-3 border border-primary rounded-3'>
                <div className='user-details'>
                    <h3><em>Name: {userdetail.studentname}</em></h3>
                    <h3><em>Email: {userdetail.email}</em></h3>
                    <h3><em>Register Number: {userdetail.regNo}</em></h3>

                </div>
                <div className='user-img-container bg-white p-3 border border-primary rounded-3'>
                    <img src={`http://localhost:8080/Images/${userdetail.image}`} className='user-img' alt='User' />
                </div>
            </div>
        </div>
    )
}

export default UserDetail
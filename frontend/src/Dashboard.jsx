import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Logo from "/Images/logo.png"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/verify')
            .then(res => {
                if (res.data.Status === "Success") {

                } else {
                    navigate('/adminlogin')
                }
            })
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/auth/logout')
            .then(res => {
                navigate('/start')
            }).catch(err => console.log(err))
    }

    return (
        <div>
            {/* <div className="container-fluid"> */}
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-lg active bg-white p-6 border border-primary rounded-3">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline btn-btn-outline-dark bg-white p-3 border border-primary rounded-3">
                                <img src={Logo} alt="" />
                            </span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start btn-btn-outline-primary" id="menu">

                            <li>
                                <Link to='/home' data-bs-toggle="collapse" className="nav-link px-0 align-middle btn-btn-outline-warning" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-danger text-white p-3 rounded-circle me-3" style={{
                                            backgroundImage: 'linear-gradient(45deg, #ff5733, #ff6b2c)',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-card-list" style={{ animation: 'bounce 1s infinite' }}></i>
                                        </div>
                                        <span className="text-dark">Dashboard</span>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/student" className="nav-link px-0 align-middle" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center placement-item" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-info text-white p-3 rounded-circle me-3" style={{
                                            backgroundImage: 'linear-gradient(45deg, #4ecdc4, #556270)',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-clipboard-data" style={{ animation: 'bounce 1s infinite' }}></i>
                                        </div>
                                        <span className="text-dark">Students</span>
                                    </div>
                                </Link>
                            </li>

                            <li>
                                <Link to="/placement" className="nav-link px-0 align-middle" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center placement-item" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-info text-white p-3 rounded-circle me-3" style={{
                                            backgroundImage: 'linear-gradient(45deg, #4ecdc4, #556270)',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-clipboard-data" style={{ animation: 'bounce 1s infinite' }}></i>
                                        </div>
                                        <span className="text-dark">Placement</span>
                                    </div>
                                </Link>
                            </li>




                            <li>
                                <Link to='/internship' className="nav-link px-0 align-middle" style={{ textDecoration: "none" }}>
                                    <div className="d-flex align-items-center placement-item" style={{ transition: "all 0.3s ease" }}>
                                        <div className="fs-4 bg-success text-white p-3 rounded-circle me-3" style={{
                                            backgroundImage: "linear-gradient(45deg, #006400, #556270)",
                                            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                                            transition: "all 0.3s ease"
                                        }}>
                                            <i className="bi bi-people" style={{ animation: "bounce 1s infinite" }}></i>
                                        </div>
                                        <span className="text-dark" >Internship</span>
                                    </div>
                                </Link>
                            </li>





                            <li>
                                <Link to='/admin/drive' className="nav-link px-0 align-middle" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center placement-item" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-warning text-white p-3 rounded-circle me-3" style={{
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-card-checklist"></i>
                                        </div>
                                        <span className="text-dark">Drives</span>
                                    </div>
                                </Link>
                            </li>


                            <li>
                                <Link to='/admin/higherstudies' className="nav-link px-0 align-middle" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center placement-item" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-black text-white p-3 rounded-circle me-3" style={{
                                            backgroundImage: 'linear-gradient(45deg, #000000, #000000)',
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <span className="text-dark">Education</span>
                                    </div>
                                </Link>
                            </li>


                            <li onClick={handleLogout}>
                                <Link to='#' className="nav-link px-0 align-middle" style={{ textDecoration: 'none' }}>
                                    <div className="d-flex align-items-center logout-item" style={{ transition: 'all 0.3s ease' }}>
                                        <div className="fs-4 bg-danger text-white p-3 rounded-circle me-3" style={{
                                            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <i className="bi bi-cloud-slash-fill" style={{ animation: 'bounce 1s infinite' }}></i>
                                        </div>
                                        <span className="text-dark">Logout</span>
                                    </div>
                                </Link>
                            </li>


                        </ul>

                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-1 d-flex justify-content-center shadow'>
                        <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold', fontSize: '40px', }}>SCSVMV PLACEMENTS</h3>
                    </div>
                    <div className='container-fluid'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default Dashboard
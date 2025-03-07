import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Logo from "/Images/logo.png"
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UserDashboard = () => {
    const navigate = useNavigate()
    // axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8080/verify')
            .then(res => {
                if (res.data.Status === "Success") {

                } else {
                    navigate('/userlogin')
                }
            })
    }, [])
    const { id } = useParams()

    const handleLogout = () => {
        axios.get('http://localhost:8080/user/logout')
            .then(res => {
                navigate('/start')
            }).catch(err => console.log(err))
    }
    return (
        <div>
            <div>
                {/* <div className="container-fluid"> */}
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline bg-white p-3 border border-dark rounded-3">
                                    <img src={Logo} alt="" />
                                </span>
                            </Link>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">



                                <li>
                                    <Link to={`/user/userdetail/` + id} className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-card-image bg-white p-3 border border-primary rounded-3"></i> <span className="ms-1 d-none d-sm-inline">Details</span> </Link>
                                </li>

                                <li>
                                    <Link to='/user/drive' className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-card-checklist bg-white p-3 border border-primary rounded-3"></i> <span className="">Drives</span> </Link>
                                </li>
                                {/* <li>
                                    <Link to={`/user/:id/placement`} className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-clipboard-data bg-white p-3 border border-primary rounded-3"></i> <span className="ms-1 d-none d-sm-inline">Placement</span> </Link>

                                </li>


                                <li>
                                    <Link to='/user/internship' className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people bg-white p-3 border border-primary rounded-3"></i> <span className="ms-1 d-none d-sm-inline">Internship</span> </Link>
                                </li> */}

                                <li onClick={handleLogout}>
                                    <Link to='#' className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-cloud-slash-fill bg-white p-3 border border-primary rounded-3"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div className="col p-0 m-0">
                        <div className='p-1 d-flex justify-content-center shadow'>
                            <h3>CSE PLACEMENT</h3>
                        </div>
                        <div className='container-fluid'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
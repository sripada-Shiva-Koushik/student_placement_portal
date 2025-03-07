import React from 'react'
import './sty.css'


const MainBanner = () => {
    return (
        <div className="main-banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        <div className="caption header-text">
                            <h6>Welcome to Student Placement Portal</h6>
                            <h2>SCSVMV PLACEMENT MANAGEMENT PORTAL</h2>
                            {/* You may need to adjust the form tag accordingly */}
                            {/* <form> ... </form> */}
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-2">
                        <div className="right-image"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBanner
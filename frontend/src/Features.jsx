import React from 'react'

const Features = () => {
    return (
        <div className="features">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <a href="https://kanchiuniv.ac.in/">
                            <div className="item">
                                <div className="image">
                                    <img src="assets/images/featured-01.png" alt="" style={{ maxWidth: '44px' }} />
                                </div>
                                <h4>About College</h4>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <a href="https://kanchiuniv.ac.in/placement-division/">
                            <div className="item">
                                <div className="image">
                                    <img src="assets/images/featured-02.png" alt="" style={{ maxWidth: '44px' }} />
                                </div>
                                <h4>Placement Division</h4>
                            </div>
                        </a>
                    </div>
                    {/* Add more similar components for other features */}
                </div>
            </div>
        </div>
    )
}

export default Features
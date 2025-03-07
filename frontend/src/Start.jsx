import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();

    const handleLogin = (role) => {
        navigate(`/${role}login`);
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #ff6e7f, #bfe9ff)', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
    <div className="card border-0 shadow p-4" style={{ maxWidth: '400px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px' }}>
        <div className="card-body">
            <h2 className="card-title text-primary text-center mb-4" style={{ color: 'black', fontWeight: 'bold' }}>Welcome</h2>

                <button type="button" className="btn btn-lg btn-primary btn-pill w-100 mb-3" onClick={() => handleLogin('admin')} style={{ background: '#007bff', border: 'none', borderRadius: '30px', boxShadow: '0px 4px 8px rgba(0, 123, 255, 0.3)', color: '#fff', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
    Admin Login
</button>

                    <button type="button" className="btn btn-lg btn-success btn-pill w-100 mb-3" onClick={() => handleLogin('user')} style={{ background: '#28a745', border: 'none', borderRadius: '30px', boxShadow: '0px 4px 8px rgba(40, 167, 69, 0.3)', color: '#fff', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
    Student Login
</button>

                </div>
            </div>
        </div>
    );
};

export default Start;

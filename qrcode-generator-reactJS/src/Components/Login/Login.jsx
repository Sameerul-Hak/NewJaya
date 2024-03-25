import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import {url} from '../../Config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name,setname]=useState("");
  const[ic,setic]=useState("");
    const location = useLocation();
    const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const eventname = queryParams.get('eventname');
    const queryParamValue = queryParams.get('who');
    const certificate = queryParams.get('certificate');
    
    if (queryParamValue === "Student" || queryParamValue === "Teacher" || queryParamValue === "Others") {
      navigate(`/${eventname}/${queryParamValue}`);
    }
    if(certificate=='true')
    {
      navigate(`/certificateLoging`);

    }
  }, [location.search, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/admin/login`, { username, password });
      alert('Login successful!');
      navigate('/events');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };
  const openCertificateUrl = () => {
    // Construct the URL with name and ic
    const modifiedFullName = name.replace(/\//g, "-");
    
    navigate(`/certificate/student/${modifiedFullName}/3/${ic}`)
  };
  const openCertificateUrlothers = () => {
    const modifiedFullName = name.replace(/\//g, "-");
    // Construct the URL with name and ic
    navigate(`/certificate/others/${modifiedFullName}/3/${ic}`)
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1 className="admin-login-heading">Admin Login</h1>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-login-input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-login-input" />
          <button type="submit" className="admin-login-button">Login</button>
        </form>
        <p className="admin-login-register-text">Do not have an account? <Link to="/register">Register</Link></p>
      </div>
      <div  className="admin-login-container">
        <h1>Admin certificate students & teacher</h1>
        <input placeholder='enter name' onChange={(e)=>setname(e.target.value)} className="admin-login-input" />
        <input placeholder='enter icn number' onChange={(e)=>setic(e.target.value)} className="admin-login-input" />
        <button onClick={openCertificateUrl}  className="admin-login-button">get certificate</button>
      </div>
      <div  className="admin-login-container">
        <h1>Admin certificate Others</h1>
        <input placeholder='enter name' onChange={(e)=>setname(e.target.value)} className="admin-login-input" />
        <input placeholder='enter icn number' onChange={(e)=>setic(e.target.value)} className="admin-login-input" />
        <button onClick={openCertificateUrlothers}  className="admin-login-button">get certificate</button>
      </div>
    </div>
  );
};

export default Login;

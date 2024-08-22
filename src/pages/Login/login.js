import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import dshboard from '../../image.png';
import Button from '../../components/primary_btn'

const Login = () => {
  const base_url = 'https://testnet.jamfortetech.com'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkbox: false
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const { user, login } = useAuth() 

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    // More validations as needed
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormData((prevFormData) => {
      return {
        ...prevFormData
      };
    });
    // console.log(formData);

    try {
      const response = await axios.post(`${base_url}/api/v1/super-admin/sign-in`, formData);
      // console.log(response.data);
      login({'data': response.data.data, 'token': response.data.access_token});
      navigate('/dashboard');
    } catch (error) {
      console.error('Error occured during API call', error);
    }
    
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center lg:space-x-8 p-4">
          <div className="w-full lg:w-2/4 bg-white p-6 py-10 rounded-2xl border">
            <div className="py-3 text-center">
                <h1 className='text-lg font-bold'>Login to Account</h1>
                <span className='text-xs'>Please enter your email and password to continue</span>
            </div>
            <div className="py-4">
              <form
                method="post"
                className="px-6 py-4"
                onSubmit={handleSubmitForm}
              >
                <label htmlFor="">Email address:</label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="w-full px-3 pl-5 py-2 mt-1 mb-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="Datcreativeboi@gmail.com"
                  required
                />
                {errors.email && <p>{errors.email}</p>}

                <div className='flex justify-between align-item mt-4'>
                  <label htmlFor="">Password:</label>
                  <p className='text-gray-400'>Forgot Password?</p>
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  className="w-full px-3 pl-5 py-2 mt-1 mb-3 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                  placeholder="****"
                  required
                />
                {errors.password && <p>{errors.password}</p>}

                <div className="flex align-item">
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.checkbox}
                    name="checkbox"
                    className="checkbox mr-1"
                    style={{background: "#FFFFFF", color: '#FFFFFF'}}
                  />
                  <span className="text-gray-400">Remember Password</span>
                </div>

                <div className='text-center mt-10 text-sm'>
                  <Button />
                  <p className='text-gray-400 mt-2'>Don't have an account?, <span className='underline font-semibold' style={{color: '#2AB806'}}>Create Account</span></p>
                </div>
              </form>
            </div>
          </div>
          
          <div className="w-full lg:w-2/4 mt-6 lg:mt-0 rounded-2xl relative" style={{ backgroundColor: '#2AB806'}}>
            <div className="text-white absolute top-20 left-10">
              <h1 className='text-2xl'>The simplest way to Manage <br/>your workspace</h1>
              <p className='text-xs'>Enter your credentials to access your account</p>
            </div>
            <img src={dshboard} alt="Placeholder Image" className="mt-16" />
          </div>
      </div>
    </div>
    </>
  );
};

export default Login;
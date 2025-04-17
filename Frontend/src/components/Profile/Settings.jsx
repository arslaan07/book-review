import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Home/Loader/Loader';
import api from '../../api';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth';

const Settings = () => {
    const dispatch = useDispatch()
    const { email } = useSelector((state) => state.auth)
    console.log(email)
    const [Value, setValue] = useState({
        email: email,
        oldPassword: '',
    });
    const [errors, setErrors] = useState({});


    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "Invalid email address";
                } else {
                    delete newErrors.email;
                }
                break;
            case "oldPassword":
                if (!value.trim()) {
                    newErrors.oldPassword = "Password is required";
                } else {
                    delete newErrors.oldPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const change = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        setValue({...Value, [name]: value });
    };

    const updateUser = async () => {
        try {
            if (Object.keys(errors).length > 0) {
                return;
            }           
            const response = await api.put(`api/v1/user`, Value);
            dispatch(login({email: response?.data?.email}))
            toast.success('Profile updated successfully!', {
                theme: 'dark',
            });
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                theme: 'dark',
            });
        }
    };

    return (
        <>
            
                <div className='h-[100%] w-full px-4 md:p-4 text-black'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8'>
                        Settings
                    </h1>
                    <div className='flex gap-12'>
                        <div className=''>
                            <label htmlFor="email" className='text-black'>Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={Value.email}
                                onChange={change}
                                className='p-2 rounded bg-white mt-2 font-semibold w-full'
                            />
                            {errors.email && <div className='text-red-700'>{errors.email}</div>}
                        </div>
                    </div>
                    <div className='flex gap-12 mt-4'>
                        <div className=''>
                            <label htmlFor="oldPassword" className='text-black'>Password</label>
                            <input 
                                type="password" 
                                name="oldPassword" 
                                onChange={change} 
                                value={Value.oldPassword}
                                className='p-2 rounded bg-white mt-2 font-semibold w-full' 
                                placeholder="Confirm password to change email"
                            />
                            {errors.oldPassword && <div className='text-red-700'>{errors.oldPassword}</div>}
                        </div>
                    </div>
                    
                    <div className='mt-6 flex justify-start'>
                        <button onClick={updateUser} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'>
                            Update
                        </button>
                    </div>
                </div>
          
        </>
    );
};

export default Settings;
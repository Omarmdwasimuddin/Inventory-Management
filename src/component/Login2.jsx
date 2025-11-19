'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

// Form Validation schema
const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

// SWR mutation function
const signUpRequest = async (url, { arg }) => {
    const response = await axios.post(url, arg);
    return response.data;
}

const LogIn = () => {
    // Form state
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const router = useRouter();

    // useSWRMutation for login
    const { trigger, isMutating } = useSWRMutation('/api/user/Login', signUpRequest)

    // Form handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    };

    // Focus handlers
    const handleFocus = (field) => () => {
        setIsFocused(prev => ({ ...prev, [field]: true }));
    }

    const handleBlur = (field) => () => {
        setIsFocused(prev => ({ ...prev, [field]: false }));
    }

    // Form handleSubmit with validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate first
            await schema.validate(formData, { abortEarly: false });
            // Submit if valid
            const response = await trigger(formData);
            if (response.status === 'success') {

                toast.success('Login successful! Redirecting...');
                setFormData({ email: "", password: "" });

                const userRole = response.data.user.role;

                let redirectPath = '';
                if (userRole === 'admin') redirectPath = '/dashboard/adminDashboard';
                else if (userRole === 'sales') redirectPath = '/dashboard/salesDashboard';
                else redirectPath = '/dashboard';

                setTimeout(() => router.push(redirectPath), 1500);
            }

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Handle validation errors
                const newErrors = {}
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                })
                setErrors(newErrors)
                toast.error('Please correct the highlighted errors.')
            } else {
                // API errors
                toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
            }
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 },
        loading: { scale: 0.95 }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md w-full mx-auto"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100"
                >
                    {/* Header Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-6 text-center relative overflow-hidden"
                    >
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
                        </div>
                        
                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="text-3xl font-bold mb-2 relative z-10"
                        >
                            Ayesha Maryam Store
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-orange-100 text-lg relative z-10"
                        >
                            Sales Staff Login
                        </motion.p>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "80px" }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="h-1 bg-white mx-auto rounded-full mt-3 relative z-10"
                        ></motion.div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        variants={containerVariants}
                        className="p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {['email', 'password'].map((field, index) => (
                                <motion.div
                                    key={field}
                                    variants={itemVariants}
                                    custom={index}
                                    className="relative"
                                >
                                    <div className={`relative transition-all duration-300 ${
                                        errors[field] ? 'animate-shake' : ''
                                    }`}>
                                        {/* Input Icon */}
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                                            {field === 'email' ? <FiMail size={20} /> : <FiLock size={20} />}
                                        </div>

                                        {/* Floating Label */}
                                        <AnimatePresence>
                                            {(isFocused[field] || formData[field]) && (
                                                <motion.label
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute -top-2 left-3 bg-white px-2 text-xs font-medium text-orange-600"
                                                >
                                                    {field === 'email' ? 'Email Address' : 'Password'}
                                                </motion.label>
                                            )}
                                        </AnimatePresence>

                                        {/* Input Field */}
                                        <input
                                            name={field}
                                            type={
                                                field === "password"
                                                    ? showPassword
                                                        ? "text"
                                                        : "password"
                                                    : "email"
                                            }
                                            placeholder={
                                                field === "password"
                                                    ? "Enter your password"
                                                    : "Enter your email"
                                            }
                                            value={formData[field]}
                                            onChange={handleChange}
                                            onFocus={handleFocus(field)}
                                            onBlur={handleBlur(field)}
                                            className={`w-full p-4 pl-12 pr-12 rounded-xl border-2 outline-none transition-all duration-300 bg-gray-50 focus:bg-white ${
                                                errors[field] 
                                                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                                                    : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                            }`}
                                        />

                                        {/* Password visibility toggle */}
                                        {field === "password" && (
                                            <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-orange-600 transition-colors duration-200"
                                            >
                                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                            </motion.span>
                                        )}
                                    </div>

                                    {/* Error Message */}
                                    <AnimatePresence>
                                        {errors[field] && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-red-500 text-sm mt-2 flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                {errors[field]}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}

                            {/* Submit Button */}
                            <motion.div variants={itemVariants}>
                                <motion.button
                                    type="submit"
                                    disabled={isMutating}
                                    variants={buttonVariants}
                                    initial="initial"
                                    whileHover={isMutating ? "loading" : "hover"}
                                    whileTap="tap"
                                    animate={isMutating ? "loading" : "initial"}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {/* Loading Animation */}
                                    {isMutating && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </motion.div>
                                    )}

                                    {/* Button Content */}
                                    <span className={`flex items-center justify-center gap-3 transition-all duration-300 ${
                                        isMutating ? 'opacity-0' : 'opacity-100'
                                    }`}>
                                        <FiLogIn size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                                        {isMutating ? "Signing In..." : "Sign In"}
                                    </span>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]"></div>
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Footer Note */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center mt-8 pt-6 border-t border-gray-100"
                        >
                            <p className="text-gray-500 text-sm">
                                Secure admin access only
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default LogIn;
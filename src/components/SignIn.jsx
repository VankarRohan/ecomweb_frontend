import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'

const SignIn = ({ setOpenAuth }) => {

    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)


    const submitHandler = async (data) => {

        console.log(data)
        try {
            setLoading(true)
            const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/user/login", data)
            // console.log(res.data.data)
            console.log(res.data.user)
            localStorage.setItem("ecomweb-token", res.data.data)
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setOpenAuth(false)
            setLoading(false)
            toast.success('🎉 Login successful..')
            // navigate("/home")

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }

    }
    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Login</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="index.html">Home</Link>
                            </li>
                            <li className="current">Login</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="login" className="login section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <div
                                className="auth-container"
                                data-aos="fade-in"
                                data-aos-delay={200}
                            >
                                <div className="auth-form login-form active">
                                    <div className="form-header">
                                        <h3>Welcome Back</h3>
                                        <p>Sign in to your account</p>
                                    </div>
                                    <form className="auth-form-content" onSubmit={handleSubmit(submitHandler)}>
                                        <div className="input-group mb-3">
                                            <span className="input-icon">
                                                <i className="bi bi-envelope" />
                                            </span>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                required=""
                                                autoComplete="email"
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-icon">
                                                <i className="bi bi-lock" />
                                            </span>
                                            <input
                                                {...register("password")}

                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                required=""
                                                autoComplete="current-password"
                                            />
                                            <span className="password-toggle">
                                                <i className="bi bi-eye" />
                                            </span>
                                        </div>
                                        <div className="form-options mb-4">
                                            <div className="remember-me">
                                                <input type="checkbox" id="rememberLogin" />
                                                <label htmlFor="rememberLogin">Remember me</label>
                                            </div>
                                            <Link to="#" className="forgot-password">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <button type="submit" disabled={loading} className="auth-btn primary-btn mb-3">
                                        
                                                   {loading ? "Loading....":  "SIGN IN"}

                                            {/* <i className="bi bi-arrow-right" /> */}
                                        </button>


                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>


    )
}

export default SignIn

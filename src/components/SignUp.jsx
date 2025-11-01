import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'


const SignUp = () => {
    const { register, handleSubmit, reset } = useForm()
    const [loading, setLoading] = useState(false)

    const submitHandler = async (data) => {

        // console.log(data)
        try {
            setLoading(true)
            const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/user", data)
            console.log(res.data.data)
            toast.success('🎉 Registration successful..')
            reset()
            setLoading(false)
            // setOpenAuth(false)
        } catch (error) {
            console.log(error)
            setLoading(false)

            toast.error(error.response.data.data.message);
        }

    }
    return (
        <div>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Register</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="index.html">Home</Link>
                            </li>
                            <li className="current">Register</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="register" className="register section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="registration-form-wrapper">
                                <div className="form-header text-center">
                                    <h2>Create Your Account</h2>
                                    <p>Create your account and start shopping with us</p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 mx-auto">
                                        <form action="register.php" method="post" onSubmit={handleSubmit(submitHandler)}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("firstname")}
                                                    type="text"
                                                    className="form-control"
                                                    id="firstname"
                                                    name="firstname"
                                                    placeholder="First Name"
                                                    required=""
                                                    autoComplete="firstname"
                                                />
                                                <label htmlFor="firstname">First Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("lastname")}
                                                    type="text"
                                                    className="form-control"
                                                    id="lastname"
                                                    name="lastname"
                                                    placeholder="Last Name"
                                                    required=""
                                                    autoComplete="lastname"
                                                />
                                                <label htmlFor="lastname">Last Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    required=""
                                                    autoComplete="email"
                                                />
                                                <label htmlFor="email">Email Address</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    {...register("phone")}
                                                    type="phone"
                                                    className="form-control"
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    required=""
                                                    autoComplete="phone"
                                                />
                                                <label htmlFor="email">Phone Number</label>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            {...register("password")}
                                                            type="password"
                                                            className="form-control"
                                                            id="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            required=""
                                                            minLength={8}
                                                            autoComplete="new-password"
                                                        />
                                                        <label htmlFor="password">Password</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            placeholder="Confirm Password"
                                                            required=""
                                                            minLength={8}
                                                            autoComplete="new-password"
                                                        />
                                                        <label htmlFor="confirmPassword">
                                                            Confirm Password
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-check mb-4">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="termsCheck"
                                                    name="termsCheck"
                                                    required=""
                                                />
                                                <label className="form-check-label" htmlFor="termsCheck">
                                                    I agree to the <Link to="#">Terms of Service</Link> and{" "}
                                                    <Link to="#">Privacy Policy</Link>
                                                </label>
                                            </div>

                                            <div className="d-grid mb-4">
                                                <button type="submit" disabled={loading} className="btn btn-register">
                                                   {loading ? "Loading....":  "Create Account"}
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                                <div className="decorative-elements">
                                    <div className="circle circle-1" />
                                    <div className="circle circle-2" />
                                    <div className="circle circle-3" />
                                    <div className="square square-1" />
                                    <div className="square square-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp

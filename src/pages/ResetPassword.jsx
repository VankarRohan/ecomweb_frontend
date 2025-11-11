import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm({

            defaultValues: {
                email: location?.state?.email
            }
        })
    const [loading, setLoading] = useState(false)
    const password = watch("password");

    const submitHandler = async (data) => {
        console.log(data)
        try {
            setLoading(true)
            const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/user/resetpassword", data)
            console.log(res.data)
            setLoading(false)
            toast.success('🎉 Password reset successful..')

            setTimeout(() => {
                navigate('/')
            }, 1500)


        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Reset Password</h1>

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
                                        <p>Reset your password here.</p>
                                    </div>
                                    <form className="auth-form-content"
                                        onSubmit={handleSubmit(submitHandler)}
                                    >
                                        <div className="input-group mb-3">
                                            <span className="input-icon">
                                                <i className="bi bi-envelope" />
                                            </span>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className="form-control"
                                                // placeholder="Email address"
                                                required=""
                                                // autoComplete="email"
                                                disabled
                                            />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-icon">
                                                <i className="bi bi-lock" />
                                            </span>
                                            <input
                                                {...register("password")}
                                                className="form-control"
                                                type="password"
                                                placeholder="Enter new password"
                                                required
                                                autoComplete="current-password"
                                            />

                                        </div>
                                        <div className="mb-3">

                                            <div className="input-group">

                                                <span className="input-icon">
                                                    <i className="bi bi-lock" />
                                                </span>
                                                <input
                                                    {...register("confirmPassword", {
                                                        required: true,
                                                        validate: (value) =>
                                                            value === password || "Passwords do not match",
                                                    })}
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    placeholder="Confirm Password"
                                                    autoComplete="new-password"
                                                />


                                            </div>
                                            {errors.confirmPassword && (

                                                <p className="text-danger small">
                                                    {errors.confirmPassword.message}
                                                </p>

                                            )}
                                        </div>


                                        <button type="submit"
                                            disabled={loading}
                                            className="auth-btn primary-btn mb-3">

                                            {loading ? "Loading...." : "Submit"}

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

export default ResetPassword

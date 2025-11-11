import axios from "axios"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ForgotPassword = () => {

    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false);
    const navigate= useNavigate()

    const submitHandler = async (data) => {

        console.log(data.email)
        try {
            setLoading(true);
            const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/user/isuser", data)
            console.log(res.data)
           if (res.data.flag === 1) {
                navigate("/resetpwd", {
                    state: {
                        email: data.email
                    }
                });
            }
            setLoading(false)
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
                    <h1 className="mb-2 mb-lg-0">Forgot Password</h1>

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
                                        <h3>Verify user by email</h3>
                                        <p>Enter registered email below.</p>
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
                                                placeholder="Email address"
                                                required=""
                                                autoComplete="email"
                                            />
                                        </div>

                                        <button type="submit"
                                              disabled={loading}
                                            className="auth-btn primary-btn mb-3">

                                            {loading ? "Loading...." : "Submit"}
                                            
                                            <i className="bi bi-arrow-right" />
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

export default ForgotPassword

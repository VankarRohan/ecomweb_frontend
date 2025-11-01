import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from "react-router-dom"
import { toast } from 'react-toastify'


const Account = ({ openAuth, setOpenAuth }) => {


    const Logout = () => {
        localStorage.removeItem("ecomweb-token")
        localStorage.removeItem("user")
        setOpenAuth(!openAuth)
    }

    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Account</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="current">Account</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="account" className="account section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                  
                    <div className="row g-4">

                        <div className="content-area">
                            <div className="tab-content">


                                <Outlet />


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Account

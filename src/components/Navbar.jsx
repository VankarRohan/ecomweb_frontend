// import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ openAuth, setOpenAuth }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setCurrentUser(JSON.parse(storedUser));
            } catch {
                setCurrentUser(storedUser);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("ecomweb-token");
        setCurrentUser(null);
        navigate("/");
    };
    return (
        <>
            <div className="main-header">
                <div className="container-fluid container-xl">
                    <div className="d-flex py-3 align-items-center justify-content-between">
                        {/* Logo */}
                        <div className="logo d-flex align-items-center">
                            <h1 className="sitename">E.com {""} </h1>
                        </div>

                        {/* Search (desktop) */}
                        <form className="search-form desktop-search-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const query = e.target.search.value.trim();
                                if (query) {
                                    navigate(`/search?q=${encodeURIComponent(query)}`);
                                    e.target.search.value = "";
                                }
                            }}
                        >
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control"
                                    placeholder="Search..."
                                />
                                <button className="btn" type="submit">
                                    <i className="bi bi-search" />
                                </button>
                            </div>
                        </form>

                        {/* Header actions */}
                        <div className="header-actions d-flex align-items-center justify-content-end">
                            {/* Mobile nav toggle */}


                            {/* {currentUser ? ( */}
                            <>
                                {/* Account dropdown */}
                                <div className="dropdown account-dropdown">
                                    <button
                                        className="header-action-btn"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person"></i>
                                    </button>


                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div className="dropdown-header">
                                            <h6>
                                                Welcome to <span className="sitename">E.Com Store</span>
                                            </h6>
                                            <p className="mb-0">Access account &amp; manage orders</p>
                                        </div>
                                        {currentUser ? (

                                            <div className="dropdown-body">
                                                <Link className="dropdown-item d-flex align-items-center" to="/account/profile">
                                                    <i className="bi bi-person-circle me-2"></i>
                                                    <span>My Profile</span>
                                                </Link>
                                                <Link className="dropdown-item d-flex align-items-center" to="/account/orders">
                                                    <i className="bi bi-bag-check me-2"></i>
                                                    <span>My Orders</span>
                                                </Link>
                                                <Link className="dropdown-item d-flex align-items-center" to="/account/favorites">
                                                    <i className="bi bi-heart me-2"></i>
                                                    <span>My Wishlist</span>
                                                </Link>

                                                <div className="dropdown-footer">

                                                    <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
                                                        Logout
                                                    </button>
                                                </div>

                                            </div>
                                        ) : (

                                            <div className="dropdown-footer">
                                                <button className="btn btn-outline-primary w-100 "
                                                    onClick={() => setOpenAuth(!openAuth)}

                                                >Sign In / Register</button>
                                                {/* <button className="btn btn-outline-primary w-100" onClick={() => setOpenAuth(!openAuth)}>Register</button> */}
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Icons */}
                                {/* <Link to="/favorite" className="header-action-btn d-none d-md-block">
                                    <i className="bi bi-heart" />
                                </Link>
                                <Link to="/cart" className="header-action-btn">
                                    <i className="bi bi-cart3" />
                                </Link> */}
                                {/* <button
                                        className="mobile-nav-toggle d-xl-none btn"
                                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                                    >
                                        <i className={`bi ${isMobileNavOpen ? "bi-x" : "bi-list"}`} />
                                    </button> */}
                            </>
                            {/* ) : null} */}
                        </div>

                        {/* User controls */}
                        {/* {currentUser ? (
                            <div className="user-controls d-flex align-items-center gap-2">
                                <Avatar src={currentUser?.img}>
                                    {currentUser?.name?.[0]}
                                </Avatar>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                className="btn btn-danger"
                                onClick={() => setOpenAuth(!openAuth)}
                            >
                                Sign In
                            </button>
                        )} */}
                        {!openAuth && (
                            <button
                                className="mobile-nav-toggle d-xl-none btn"
                                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                            >
                                <i style={{ color: "blue", fontSize: "25px", background: "white" }} className={`bi ${isMobileNavOpen ? "bi-x" : "bi-list"}`} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Nav menu (mobile collapsible) */}
            <div className="header-nav">
                <div className="container-fluid container-xl align-center">
                    <nav
                        id="navmenu"
                        className={`navmenu ${isMobileNavOpen ? "active" : ""}`}
                    >
                        <ul>
                            <li>
                                <Link onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} to="/">Home</Link>
                            </li>
                            <li>
                                <Link onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} to="/shoplisting">Category</Link>
                            </li>
                            <li>
                                <Link onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} to="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} to="/checkout">Checkout</Link>
                            </li>
                            <li>
                                <Link onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );

}

export default Navbar

import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {
    const [product, setProduct] = useState([])
    const [shipping, setShipping] = useState(4.99);
    const [loading, setLoading] = useState(false)

    const getcartItems = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/users/cart",
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                console.log(res.data)
                setProduct(res.data)
                setLoading(false)
            } else if (!token) {
                toast.error("Please login first!");
                setLoading(false)

            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message);
            setLoading(false)
        }

    }
    const addToCart = async (id, color, size) => {
        setLoading(true)

        console.log(id)
        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/cart",
                    { productId: id, quantity: 1, color, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                toast.success('🎉 Item Added to cart..')
                console.log(res.data)
                setLoading(false)
                getcartItems()
            } else if (!token) {
                toast.error("Please login to add favorites");
                setLoading(false)

            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message);
            setLoading(false)
        }

    }
    const removeFromCart = async (id, color, size) => {
        setLoading(true)

        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                const res = await axios.patch("https://ecomweb-backend-u6x8.onrender.com/users/cart",
                    { productId: id, quantity: 1, color, size },
                    {
                        headers: { Authorization: `Bearer ${token}` }

                    }
                )
                console.log(res.data)
                toast.success('🎉 Item removed from cart..')
                getcartItems()
                setLoading(false)
            }
            else if (!token) {
                toast.error("Please login remove cart!!");
                setLoading(false)

            }
        } catch (error) {
            console.log(error.message)
            setLoading(false)
            toast.error(error.response.data.message);
        }


    }

    const calculateSubtotal = () => {

        return (product || []).reduce(
            (total, item) => total + item.quantity * (item?.product?.price?.org),
            0
        );
    }

    const calculateTax = (subtotal) => {
        return subtotal * 0.09; // 9% tax example
    };

    const calculateDiscount = (subtotal) => {
        return subtotal > 300 ? 20 : 0; // flat $20 discount if subtotal > 300
    };

    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    const total = subtotal + shipping + tax - discount;

    useEffect(() => {
        getcartItems()
    }, [])
    return (
        <div>

            <div >
                {loading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        {product.length === 0 ? (
                            <h3 style={{

                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",

                            }}>Cart is empty</h3>
                        ) : (
                            <>
                                {/* Page Title */}
                                <div className="page-title light-background">
                                    <div className="container d-lg-flex justify-content-between align-items-center">
                                        <h1 className="mb-2 mb-lg-0">Cart</h1>
                                        <nav className="breadcrumbs">
                                            <ol>
                                                <li>
                                                    <Link to="index.html">Home</Link>
                                                </li>
                                                <li className="current">Cart</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>


                                <section id="cart" className="cart section">
                                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                                        <div className="row">
                                            <div className="col-lg-8" data-aos="fade-up" data-aos-delay={200}>
                                                <div className="cart-items">
                                                    <div className="cart-header d-none d-lg-block">
                                                        <div className="row align-items-center">
                                                            <div className="col-lg-6">
                                                                <h5>Product</h5>
                                                            </div>
                                                            <div className="col-lg-2 text-center">
                                                                <h5>Price</h5>
                                                            </div>
                                                            <div className="col-lg-2 text-center">
                                                                <h5>Quantity</h5>
                                                            </div>
                                                            <div className="col-lg-2 text-center">
                                                                <h5>Total</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {product?.map((item) => {

                                                        return (

                                                            <div className="cart-item">
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                                                                        <div className="product-info d-flex align-items-center">
                                                                            <div className="product-image">
                                                                                <img
                                                                                    src={item?.product?.img?.[0]}
                                                                                    alt="Product"
                                                                                    className="img-fluid"
                                                                                    loading="lazy"
                                                                                />
                                                                            </div>
                                                                            <div className="product-details">
                                                                                <h6 className="product-title fw-bold">
                                                                                    {item?.product?.title}
                                                                                </h6>
                                                                                <h6 className="product-title fw-light">
                                                                                    {item?.product?.name}
                                                                                </h6>

                                                                                <div className="product-meta">
                                                                                    <span className="product-color">Color: {item?.color}</span>
                                                                                    <span className="product-size">Size: {item?.size}</span>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                                        <div className="price-tag">
                                                                            <span className="current-price">
                                                                                ₹{item?.product?.price?.org}
                                                                                <span className="original-price">
                                                                                    ₹{item?.product?.price?.mrp}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                                        <div className="quantity-selector">
                                                                            <button className="quantity-btn decrease" onClick={() => { removeFromCart(item.product._id, item.color, item.size) }}>
                                                                                <i className="bi bi-dash" />
                                                                            </button>
                                                                            <input
                                                                                type="number"
                                                                                className="quantity-input"
                                                                                defaultValue={item.quantity}

                                                                            />
                                                                            <button className="quantity-btn increase" onClick={() => (addToCart(item.product._id, item.color, item.size))}>
                                                                                <i className="bi bi-plus" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                                                                        <div className="item-total">
                                                                            <span>₹{(item?.product?.price?.org) * item?.quantity}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                    <div className="cart-actions">
                                                        <div className="row">
                                                            <div className="col-lg-6 mb-3 mb-lg-0">
                                                                <div className="coupon-form">
                                                                    <div className="input-group">
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Coupon code"
                                                                        />
                                                                        <button className="btn btn-outline-accent" type="button">
                                                                            Apply Coupon
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 text-md-end">

                                                                <button className="btn btn-outline-remove">
                                                                    <i className="bi bi-trash" /> Clear Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className="col-lg-4 mt-4 mt-lg-0"
                                                data-aos="fade-up"
                                                data-aos-delay={300}
                                            >
                                                <div className="cart-summary">
                                                    <h4 className="summary-title">Order Summary</h4>
                                                    <div className="summary-item">
                                                        <span className="summary-label">Subtotal</span>
                                                        <span className="summary-value">₹{calculateSubtotal()}</span>
                                                    </div>
                                                    <div className="form-check text-end">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="shipping"
                                                            id="standard"
                                                            value={4.99}
                                                            defaultChecked
                                                            onChange={(e) => setShipping(parseFloat(e.target.value))}
                                                        />
                                                        <label className="form-check-label" htmlFor="standard">
                                                            Standard Delivery - ₹4.99
                                                        </label>
                                                    </div>

                                                    <div className="form-check text-end">
                                                        <input
                                                            className="form-check-input "
                                                            type="radio"
                                                            name="shipping"
                                                            id="express"
                                                            value={12.99}
                                                            onChange={(e) => setShipping(parseFloat(e.target.value))}
                                                        />
                                                        <label className="form-check-label" htmlFor="express">
                                                            Express Delivery - ₹12.99
                                                        </label>
                                                    </div>

                                                    <div className="form-check text-end">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="shipping"
                                                            id="free"
                                                            value={0}
                                                            onChange={(e) => setShipping(0)}
                                                            disabled={total < 300}
                                                        />
                                                        <label className="form-check-label" htmlFor="free">
                                                            Free Shipping (Orders over ₹300)
                                                        </label>
                                                    </div>
                                                    <div className="summary-item">
                                                        <span className="summary-label">Tax</span>
                                                        <span className="summary-value">₹{tax.toFixed(2)}</span>
                                                    </div>

                                                    <div className="summary-item discount">
                                                        <span className="summary-label">Discount</span>
                                                        <span className="summary-value">-₹{discount.toFixed(2)}</span>
                                                    </div>

                                                    <div className="summary-total">
                                                        <span className="summary-label">Total</span>
                                                        <span className="summary-value">₹{total.toFixed(2)}</span>
                                                    </div>
                                                    <div className="checkout-button">
                                                        <Link to="/checkout"
                                                            className="btn btn-accent w-100"
                                                            state={{
                                                                subtotal: calculateSubtotal(),
                                                                shipping,
                                                                tax,
                                                                discount,
                                                                total,
                                                                products: product
                                                            }}>
                                                            Proceed to Checkout <i className="bi bi-arrow-right" />
                                                        </Link>
                                                    </div>

                                                    <div className="payment-methods">
                                                        <p className="payment-title">We Accept</p>
                                                        <div className="payment-icons">
                                                            <i className="bi bi-credit-card" />
                                                            <i className="bi bi-paypal" />
                                                            <i className="bi bi-wallet2" />
                                                            <i className="bi bi-bank" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </>
                        )}
                    </>
                )}


            </div>
        </div>
    )
}

export default Cart

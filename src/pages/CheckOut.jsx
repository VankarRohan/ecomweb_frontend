import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CheckOut = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const { subtotal, shipping, tax, discount, total, products } = location.state || {};
    // console.log(products)
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    const orderdetails = {
        products: products || [],
        totalAmount: total,
        address: form.address,
        subtotal,
        shipping,
        tax,
        discount
    };

    const validateForm = () => {
        let tempErrors = {};
        let valid = true;

        if (!form.firstname.trim()) {
            tempErrors.firstname = "First name is required";
            toast.error(tempErrors.firstname);
            valid = false;
        }
        if (!form.lastname.trim()) {
            tempErrors.lastname = "Last name is required";
            toast.error(tempErrors.lastname);
            valid = false;
        }
        if (!form.email.includes("@")) {
            tempErrors.email = "Valid email is required";
            toast.error(tempErrors.email);
            valid = false;
        }
        if (!form.phone.match(/^[0-9]{10}$/)) {
            tempErrors.phone = "Valid 10-digit phone number is required";
            toast.error(tempErrors.phone);
            valid = false;
        }
        if (!form.address.trim()) {
            tempErrors.address = "Address is required";
            toast.error(tempErrors.address);
            valid = false;
        }

        setErrors(tempErrors);
        return valid;
    };


    const placeOrder = async () => {
        setLoading(true)
        if (!validateForm()) return;
        try {
            const token = localStorage.getItem('ecomweb-token')
            const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/order", orderdetails, {

                headers: { Authorization: `Bearer ${token}` },
            })

            console.log(res.data)
            toast.success('🎉 Order placed successful..');
            setLoading(false)
            setForm({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                address: "",
            });

            navigate("/checkout", { state: { products: [] } });
        } catch (error) {
            setLoading(false)
            toast.error(error.message);
        }
    }
    if (!products || products.length === 0) {
        return (
            <div className="container text-center my-5">
                <h2>🚫 Checkout not available</h2>
                <p>Please go to your cart and select products before checking out.</p>
                <button className="btn mt-3" style={{ background: "black", color: "white" }} onClick={() => navigate("/cart")}>
                    Go to Cart
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Checkout</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li className="current">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section id="checkout" className="checkout section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row">
                        <div className="col-lg-7">

                            <div className="checkout-container" data-aos="fade-up">
                                <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); placeOrder(); }}>

                                    <div className="checkout-section" id="customer-info">
                                        <div className="section-header">
                                            <div className="section-number">1</div>
                                            <h3>Customer Information</h3>
                                        </div>
                                        <div className="section-content">
                                            <div className="row">
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="first-name">First Name</label>
                                                    <input
                                                        type="text"
                                                        name="first-name"
                                                        className="form-control"
                                                        id="first-name"
                                                        placeholder="Your First Name"
                                                        required=""
                                                        value={form.firstname}
                                                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                                                    />
                                                    {errors.firstname && <p className="error">{errors.firstname}</p>}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label htmlFor="last-name">Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        className="form-control"
                                                        id="last-name"
                                                        placeholder="Your Last Name"
                                                        required=""
                                                        value={form.lastname}
                                                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                                    />
                                                    {errors.lastname && <p className="error">{errors.lastname}</p>}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    required=""
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                />
                                                {errors.email && <p className="error">{errors.email}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="Your Phone Number"
                                                    required=""
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                />
                                                {errors.phone && <p className="error">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout-section" id="shipping-address">
                                        <div className="section-header">
                                            <div className="section-number">2</div>
                                            <h3>Shipping Address</h3>
                                        </div>
                                        <div className="section-content">
                                            <div className="form-group">
                                                <label htmlFor="address">Street Address</label>
                                                <textarea
                                                    className="form-control"
                                                    name="address"
                                                    id="address"
                                                    rows="5"
                                                    placeholder="Complete Address (Street, Apartment, City, State, Country, Zip)"
                                                    value={form.address}
                                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                                />
                                                {errors.address && <p className="error">{errors.address}</p>}
                                            </div>


                                        </div>
                                    </div>

                                    <div className="checkout-section" id="payment-method">
                                        <div className="section-header">
                                            <div className="section-number">3</div>
                                            <h3>Payment Method</h3>
                                        </div>
                                        <div className="section-content">
                                            <div className="payment-options">
                                                <div className="payment-option active">
                                                    <input
                                                        type="radio"
                                                        name="payment-method"
                                                        id="credit-card"
                                                        defaultChecked=""
                                                    />
                                                    <label htmlFor="credit-card">
                                                        <span className="payment-icon">
                                                            <i className="bi bi-credit-card-2-front" />
                                                        </span>
                                                        <span className="payment-label">
                                                            Credit / Debit Card
                                                        </span>
                                                    </label>
                                                </div>

                                            </div>
                                            <div className="payment-details" id="credit-card-details">
                                                <div className="form-group">
                                                    <label htmlFor="card-number">Card Number</label>
                                                    <div className="card-number-wrapper">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="card-number"
                                                            id="card-number"
                                                            placeholder="1234 5678 9012 3456"
                                                            required=""
                                                        />
                                                        <div className="card-icons">
                                                            <i className="bi bi-credit-card-2-front" />
                                                            <i className="bi bi-credit-card" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="expiry">Expiration Date</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="expiry"
                                                            id="expiry"
                                                            placeholder="MM/YY"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="cvv">Security Code (CVV)</label>
                                                        <div className="cvv-wrapper">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="cvv"
                                                                id="cvv"
                                                                placeholder={123}
                                                                required=""
                                                            />
                                                            <span
                                                                className="cvv-hint"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="3-digit code on the back of your card"
                                                            >
                                                                <i className="bi bi-question-circle" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="card-name">Name on Card</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="card-name"
                                                        id="card-name"
                                                        placeholder="John Doe"
                                                        required=""
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="checkout-section" id="order-review">
                                        <div className="section-header">
                                            <div className="section-number">4</div>
                                            <h3>Place Order</h3>
                                        </div>
                                        <div className="section-content">


                                            <div className="place-order-container">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="btn btn-primary place-order-btn"
                                                >
                                                    <span className="btn-text">{loading ? "Loading...." : "Place Order"} </span>
                                                    <span className="btn-price">${total}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-5">

                            <div
                                className="order-summary"
                                data-aos="fade-left"
                                data-aos-delay={200}
                            >
                                <div className="order-summary-header">
                                    <h3>Order Summary</h3>
                                    <span className="item-count">{products?.length} Items</span>
                                </div>
                                <div className="order-summary-content">
                                    {products.map((item) => {
                                        return (
                                            <div className="order-items">
                                                <div className="order-item">
                                                    <div className="order-item-image">
                                                        <img
                                                            src={item?.product?.img?.[0]}
                                                            alt="Product"
                                                            className="img-fluid"
                                                        />
                                                    </div>
                                                    <div className="order-item-details">
                                                        <h4>{item?.product?.name}</h4>
                                                        <p className="order-item-variant">Color: {item?.color} | Size: {item?.size} </p>
                                                        <div className="order-item-price">
                                                            <span className="quantity">{item?.quantity} ×</span>
                                                            <span className="price">₹{item?.product?.price?.org}.99</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}

                                    <div className="order-totals">
                                        <div className="order-subtotal d-flex justify-content-between">
                                            <span>Subtotal</span>
                                            <span>₹{subtotal?.toFixed(2)}</span>
                                        </div>
                                        <div className="order-shipping d-flex justify-content-between">
                                            <span>Shipping</span>
                                            <span>₹{shipping?.toFixed(2)}</span>
                                        </div>
                                        <div className="order-tax d-flex justify-content-between">
                                            <span>Tax</span>
                                            <span>₹{tax?.toFixed(2)}</span>
                                        </div>
                                        <div className="order-total d-flex justify-content-between">
                                            <span>Discount</span>
                                            <span>₹{discount?.toFixed(2)}</span>
                                        </div>
                                        <div className="order-total d-flex justify-content-between">
                                            <span>Total</span>
                                            <span>₹{total?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="secure-checkout">
                                        <div className="secure-checkout-header">
                                            <i className="bi bi-shield-lock" />
                                            <span>Secure Checkout</span>
                                        </div>
                                        <div className="payment-icons">
                                            <i className="bi bi-credit-card-2-front" />
                                            <i className="bi bi-credit-card" />
                                            <i className="bi bi-paypal" />
                                            <i className="bi bi-apple" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}

export default CheckOut
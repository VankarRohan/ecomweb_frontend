import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Orders = () => {
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(false)
    const getorders = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("ecomweb-token")
            const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/users/order",
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log(res.data)
            setOrder(res.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }
    useEffect(() => {
        getorders()
        // eslint-disable-next-line
    }, [])

    return (

        <div className="tab-pane fade show active" id="orders">
            <div className="section-header" data-aos="fade-up">
                <h1>My Orders</h1>

            </div>


            <div className="orders-grid">
                <div >
                    {loading ? (
                        <CircularProgress style={{

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                        }} />
                    ) : (
                        <>
                            {order.length === 0 ? (
                                <h3>No Orders !!</h3>
                            ) : (
                                order.map((order, index) => {
                                    const trackingId = `tracking-${order._id}`;
                                    const detailsId = `details-${order._id}`;
                                    return (

                                        <div
                                            className="order-card"
                                            data-aos="fade-up"
                                            data-aos-delay={100}
                                        >
                                            <div className="order-header">
                                                <div className="order-id">
                                                    <span className="label">Order ID:</span>
                                                    <span className="value">#{order._id}</span>
                                                </div>
                                                <div className="order-date">{order.updatedAt}</div>
                                            </div>
                                            <div className="order-content">
                                                <div className="product-grid">
                                                    {order.products.map((item) => {
                                                        return (

                                                            <img
                                                                src={item.product.img[0]}
                                                                alt="Product"
                                                                loading="lazy"
                                                            />
                                                        )
                                                    })}

                                                </div>
                                                <div className="order-info">
                                                    <div className="info-row">
                                                        <span>Status</span>
                                                        <span className="status delivered">{order.status}</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span>Items</span>
                                                        <span>{order.products.length}items</span>
                                                    </div>
                                                    <div className="info-row">
                                                        <span>Total</span>
                                                        <span className="price">
                                                            ₹{order.total_amount?.$numberDecimal
                                                                ? parseFloat(order.total_amount.$numberDecimal).toFixed(2)
                                                                : "0.00"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-footer">
                                                <button
                                                    type="button"
                                                    className="btn-track"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${trackingId}`}
                                                    aria-expanded="false"
                                                >
                                                    Track Order
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-details"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${detailsId}`}
                                                    aria-expanded="false"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                            {/* Order Tracking */}
                                            <div className="collapse tracking-info" id={trackingId}>
                                                <div className="tracking-timeline">
                                                    <div className="timeline-item completed">
                                                        <div className="timeline-icon">
                                                            <i className="bi bi-check-circle-fill" />
                                                        </div>
                                                        <div className="timeline-content">
                                                            <h5>Order Confirmed</h5>
                                                            <p>Your order has been received and confirmed</p>
                                                            <span className="timeline-date">
                                                                Feb 20, 2025 - 10:30 AM
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item completed">
                                                        <div className="timeline-icon">
                                                            <i className="bi bi-check-circle-fill" />
                                                        </div>
                                                        <div className="timeline-content">
                                                            <h5>Processing</h5>
                                                            <p>Your order is being prepared for shipment</p>
                                                            <span className="timeline-date">
                                                                Feb 20, 2025 - 2:45 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item active">
                                                        <div className="timeline-icon">
                                                            <i className="bi bi-box-seam" />
                                                        </div>
                                                        <div className="timeline-content">
                                                            <h5>Packaging</h5>
                                                            <p>Your items are being packaged for shipping</p>
                                                            <span className="timeline-date">
                                                                Feb 20, 2025 - 4:15 PM
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-icon">
                                                            <i className="bi bi-truck" />
                                                        </div>
                                                        <div className="timeline-content">
                                                            <h5>In Transit</h5>
                                                            <p>Expected to ship within 24 hours</p>
                                                        </div>
                                                    </div>
                                                    <div className="timeline-item">
                                                        <div className="timeline-icon">
                                                            <i className="bi bi-house-door" />
                                                        </div>
                                                        <div className="timeline-content">
                                                            <h5>Delivery</h5>
                                                            <p>Estimated delivery: Feb 22, 2025</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Order Details */}
                                            <div className="collapse order-details" id={detailsId}>
                                                <div className="details-content">
                                                    <div className="detail-section">
                                                        <h5>Order Information</h5>

                                                    </div>
                                                    <div className="detail-section">
                                                        <h5>Items ({order.products.length})</h5>
                                                        <div className="order-items">
                                                            <>
                                                                {order.products.map((item) => {
                                                                    return (
                                                                        <div className="item">

                                                                            <img
                                                                                src={item.product.img[0]}
                                                                                alt="Product"
                                                                                loading="lazy"
                                                                            />
                                                                            <div className="item-info">
                                                                                <h6>{item.product.name}</h6>
                                                                                <div className="item-meta">
                                                                                    {/* <span className="sku">SKU: PRD-001</span> */}
                                                                                    <span className="qty">Qty: {item.quantity} </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="item-price">₹{item.product.price.org}</div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>

                                                        </div>
                                                    </div>
                                                    <div className="detail-section">
                                                        <h5>Price Details</h5>
                                                        <div className="price-breakdown">
                                                            <div className="price-row">
                                                                <span>Subtotal</span>
                                                                <span>₹{order.subtotal?.$numberDecimal
                                                                    ? parseFloat(order.subtotal.$numberDecimal).toFixed(2)
                                                                    : "0.00"}</span>
                                                            </div>
                                                            <div className="price-row">
                                                                <span>Shipping</span>
                                                                <span>₹{order.shipping?.$numberDecimal
                                                                    ? parseFloat(order.shipping.$numberDecimal).toFixed(2)
                                                                    : "0.00"}</span>
                                                            </div>
                                                            <div className="price-row">
                                                                <span>Tax</span>
                                                                <span>₹{order.tax?.$numberDecimal
                                                                    ? parseFloat(order.tax.$numberDecimal).toFixed(2)
                                                                    : "0.00"}</span>
                                                            </div>
                                                            <div className="price-row">
                                                                <span>Discount</span>
                                                                <span>₹{order.discount?.$numberDecimal
                                                                    ? parseFloat(order.discount.$numberDecimal).toFixed(2)
                                                                    : "0.00"}</span>
                                                            </div>
                                                            <div className="price-row total">
                                                                <span>Total</span>
                                                                <span>₹{order.total_amount?.$numberDecimal
                                                                    ? parseFloat(order.total_amount.$numberDecimal).toFixed(2)
                                                                    : "0.00"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="detail-section">
                                                        <h5>Shipping Address</h5>
                                                        <div className="address-info">
                                                            <p>
                                                                {order?.address}
                                                            </p>
                                                            {/* <p className="contact">+1 (555) 123-4567</p> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })

                            )}
                        </>
                    )}
                </div>
            </div>

        </div>

    )
}

export default Orders

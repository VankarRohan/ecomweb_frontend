import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false)
    const [favorite, setFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false)
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [mainImage, setMainImage] = useState(null);


    const handleColorSelect = (clr) => {
        setSelectedColor(clr);
    };
    const getProduct = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/products/" + id)
            console.log(res.data)
            setProduct(res.data)
            setMainImage(res.data?.img?.[0]);
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }

    }
    const addToCart = async (id) => {
        // console.log(product)

        if (product.color.length !== 0 && !selectedColor) {
            toast.error("Please select a color before adding to cart!");
            return;
        }
        if (product.sizes.length !== 0 && !selectedSize) {
            toast.error("Please select a size before adding to cart!");
            return;
        }
        setLoading(true)
        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/cart",
                    { productId: id, quantity: 1, color: selectedColor, size: selectedSize },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                getProduct()
                toast.success('🎉 Item Added to cart..')
                console.log(res.data)
                setLoading(false)
            } else if (!token) {
                toast.error("Please login to add favorites");
                setLoading(false)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }
    const CheckFavorite = async () => {

        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {
                setFavoriteLoading(true)
                const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/users/favorite",

                    { headers: { Authorization: `Bearer ${token}` } }
                )
                const favourites = res.data
                const isFavorite = favourites?.some(
                    (favorite) => favorite._id === product?._id
                );
                setFavorite(isFavorite);
                setFavoriteLoading(false)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message)

            setFavoriteLoading(false)
        }
    }
    const addtoFavorite = async (id) => {
        setLoading(true)
        try {
            const token = localStorage.getItem("ecomweb-token")

            if (token) {
                const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/favorite",
                    { productId: id },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                console.log(res.data)
                getProduct()
                CheckFavorite()
                setLoading(false)
                toast.success('🎉 Item Added to favorites..')
            } else if (!token) {
                toast.error("Please login to add favorites")
                setLoading(false)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }
    const removefromFavorite = async (id) => {
        setLoading(true)
        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                console.log(token)
                console.log(id)
                const res = await axios.patch("https://ecomweb-backend-u6x8.onrender.com/users/favorite",
                    { productId: id },
                    {
                        headers: { Authorization: `Bearer ${token}` }

                    }
                )
                toast.success('🎉 Item removed from favorites..')
                console.log(res.data)
                getProduct()
                CheckFavorite()
                setLoading(false)
            } else if (!token) {
                toast.error("Please login to remove favorites");
                setLoading(false)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message);
            setLoading(false)

        }

    }
    // eslint-disable-next-line
    const getColorStyle = (clr) => {
        switch (clr.toLowerCase()) {
            case "black":
                return { background: "linear-gradient(135deg, #1a1a1a, #000)" };
            case "white":
                return { background: "linear-gradient(135deg, #f8f9fa, #e9ecef)" };
            case "blue":
                return { background: "linear-gradient(135deg, #0066cc, #004499)" };
            case "green":
                return { background: "linear-gradient(135deg, #28a745, #155724)" };
            default:
                return { background: "#ccc" }; // fallback
        }
    };
    useEffect(() => {
        getProduct()
        const token = localStorage.getItem("ecomweb-token");
        if (token) {
            CheckFavorite();
        }
        // eslint-disable-next-line
    }, [favorite])
    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Product Details</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li className="current">Product Details</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {loading ? (
                <CircularProgress style={{

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                />
            ) : (

                <section id="product-details" className="product-details section">
                    <div className="container" data-aos="fade-up" data-aos-delay={100}>
                        <div className="row g-4">

                            <div className="col-lg-7" data-aos="zoom-in" data-aos-delay={150}>
                                <div className="product-gallery">
                                    <div className="main-showcase">
                                        <div className="image-zoom-container">
                                            <img
                                                src={mainImage || product?.img?.[0]}
                                                alt="Product Main"
                                                className="img-fluid main-product-image drift-zoom"
                                                id="main-product-image"
                                                data-zoom={mainImage || product?.img?.[0]}
                                            />
                                        </div>
                                    </div>

                                    <div className="thumbnail-grid">
                                        {product?.img?.map((imgSrc, index) => (
                                            <div
                                                key={index}
                                                className={`thumbnail-wrapper thumbnail-item ${mainImage === imgSrc ? "active" : ""}`}
                                                onClick={() => setMainImage(imgSrc)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    src={imgSrc}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="img-fluid"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="col-lg-5" data-aos="fade-left" data-aos-delay={200}>
                                <div className="product-details">
                                    <div className="product-badge-container">
                                        {product?.category.map((category, index) => {
                                            return (
                                                <>

                                                    <div key={index} className="badge-category">{category}</div><br />
                                                </>
                                            )
                                        })}

                                    </div>


                                    <h1 className="product-name">
                                        {product?.name}
                                    </h1>
                                    <h5 className="product-description">
                                        {product?.desc}
                                    </h5>

                                    <div className="product-badge-container">
                                        <div className="rating-group">
                                            <div className="stars">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-half" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="pricing-section">
                                        <div className="price-display">
                                            <span className="sale-price">₹{product?.price?.org}</span>
                                            <span className="regular-price">₹{product?.price?.mrp}</span>
                                        </div>
                                        <div className="savings-info">
                                            <span className="save-amount">Save ₹{product?.price?.mrp - product?.price?.org}</span>
                                            <span className="discount-percent">{product?.price?.off}% off</span>
                                        </div>
                                    </div>

                                    <div className="availability-status">
                                        <div className="stock-indicator">
                                            <i className="bi bi-check-circle-fill" />
                                            <span className="stock-text">Available</span>
                                        </div>
                                    </div>

                                    <div className="variant-section">
                                        <div className="color-selection">
                                            <label className="variant-label">Available Colors:</label>
                                            <div className="color-grid">
                                                {product?.color?.map((clr, index) => (
                                                    <div
                                                        key={index}
                                                        className={`color-chip ${selectedColor === clr ? "active" : ""}`}
                                                        data-color={clr}
                                                        style={{ background: clr }}   // 🎨 backend should provide valid CSS color (name, hex, or gradient)
                                                        onClick={() => handleColorSelect(clr)}
                                                    >
                                                        {selectedColor === clr && (
                                                            <span className="selection-check">
                                                                <i className="bi bi-check"></i>
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="selected-variant">
                                                Selected: <span>{selectedColor || "None"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="variant-section">
                                        <div className="size-selection">
                                            <label className="variant-label">Available Sizes:</label>
                                            <div className="size-grid">
                                                {product?.sizes?.map((sz, index) => (
                                                    <div
                                                        key={index}
                                                        className={`size-chip ${selectedSize === sz ? "active" : ""}`}
                                                        onClick={() => setSelectedSize(sz)}
                                                    >
                                                        {sz}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="selected-variant">
                                                Selected: <span className="selection-check">{selectedSize || "None"}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="purchase-section">

                                        <div className="action-buttons">
                                            <button className="btn primary-action" onClick={() => (addToCart(product._id))}>
                                                <i className="bi bi-bag-plus" />
                                                Add to Cart
                                            </button>

                                            {favoriteLoading ? (
                                                <CircularProgress></CircularProgress>
                                            ) : (
                                                <button className="btn primary-action" onClick={() => favorite ? removefromFavorite(product._id) : addtoFavorite(product._id)}>
                                                    {favorite ? (
                                                        <i className="bi bi-heart-fill text-danger" />
                                                    ) : (
                                                        <i className="bi bi-heart" />
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="benefits-list">
                                        <div className="benefit-item">
                                            <i className="bi bi-truck" />
                                            <span>Free delivery on orders over $75</span>
                                        </div>
                                        <div className="benefit-item">
                                            <i className="bi bi-arrow-clockwise" />
                                            <span>45-day hassle-free returns</span>
                                        </div>
                                        <div className="benefit-item">
                                            <i className="bi bi-shield-check" />
                                            <span>3-year manufacturer warranty</span>
                                        </div>
                                        <div className="benefit-item">
                                            <i className="bi bi-headset" />
                                            <span>24/7 customer support available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            )}
        </>

    )
}

export default ProductDetails

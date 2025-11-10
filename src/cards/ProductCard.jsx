import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {

    const navigate = useNavigate()
    const [favorite, setFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false)

    const addtoFavorite = async (id) => {
        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {
                setFavoriteLoading(true)

                const res = await axios.post("https://ecomweb-backend-u6x8.onrender.com/users/favorite",
                    { productId: id },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                CheckFavorite()
                console.log(res.data)
                setFavoriteLoading(false)
                toast.success('🎉 Item Added to favorites..')
            }
            else if (!token) {
                toast.error("Please login to add favorites");
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setFavoriteLoading(false)
        }
    }
    const removefromFavorite = async (id) => {

        try {
            const token = localStorage.getItem("ecomweb-token")
            if (token) {

                setFavoriteLoading(true)
                const res = await axios.patch("https://ecomweb-backend-u6x8.onrender.com/users/favorite",
                    { productId: id },
                    {
                        headers: { Authorization: `Bearer ${token}` }

                    }
                )
                setFavoriteLoading(false)
                CheckFavorite()
                toast.success('🎉 Item removed from favorites..')
                console.log(res.data)
            }
            else if (!token) {
                toast.error("Please login to remove favorites");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setFavoriteLoading(false)
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
                setFavoriteLoading(false)
                setFavorite(isFavorite);
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message);
            setFavoriteLoading(false)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem("ecomweb-token");
        if (token) {
            CheckFavorite();
        }
        // eslint-disable-next-line
    }, [favorite])
    return (
        <div className="col-lg-3 col-md-6">


            <div className="product-item">
                <div className="product-image">
                    <div className="product-badge sale-badge">{product?.price?.off}% off</div>
                    <img
                        src={product?.img[0]}
                        alt="Product"
                        className="img-fluid"
                        loading="lazy"
                    />

                    <div className="product-actions">
                        {favoriteLoading ? (
                            <CircularProgress></CircularProgress>
                        ) : (
                            <button className="action-btn wishlist-btn" onClick={() => favorite ? removefromFavorite(product._id) : addtoFavorite(product._id)}>
                                {favorite ? (
                                    <i className="bi bi-heart-fill text-danger" />
                                ) : (
                                    <i className="bi bi-heart" />
                                )}
                            </button>
                        )}

                        <button type="button" className="action-btn quickview-btn"
                            onClick={() => {
                                if (product?.img?.[0]) {
                                    window.open(product.img[0], "_blank");
                                } else {
                                    alert("No image available");
                                }
                            }}
                        >
                            <i className="bi bi-zoom-in" />
                        </button>
                    </div>

                    <button className="cart-btn" onClick={() => navigate(`/productdetails/${product?._id}`)}>Select Options</button>
                    <div className="discount-badge"></div>

                </div>
                <div className="product-info">
                    <div className="product-category fw-bold">{product.category}</div>
                    <h4 className="product-name fw-bold">
                        <div>{product.name}</div>
                    </h4>
                    <h4 className="product-name">
                        <div>{product.desc}</div>
                    </h4>
                    <div className="product-rating">
                        <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star" />
                        </div>

                    </div>
                    <div className="product-price">

                        <span className="current-price">₹{product.price.org}.99{"  "}</span>
                        <span className="old-price">{"  "}₹{product.price.mrp}.99</span>

                    </div>

                </div>
            </div>
        </div >

    )
}

export default ProductCard

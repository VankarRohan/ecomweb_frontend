import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../cards/ProductCard"
import { CircularProgress } from "@mui/material"
import ProductCategoryCard from "../cards/ProductCategoryCard"
import { category } from "../utils/data"
import { toast } from "react-toastify"

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])

    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/products/")
            console.log(res.data)
            let allProducts = res.data;

            const shuffled = allProducts.sort(() => 0.5 - Math.random());

            const random16 = shuffled.slice(0, 16);

            setProduct(random16);
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
            setLoading(false)
        }
    }

    useEffect(() => {

        getProducts()

    }, [])
    return (
        <>

            <section id="hero" className="hero section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="content-wrapper" data-aos="fade-up" data-aos-delay={100}>
                            <h1 className="hero-title">Discover Amazing Products</h1>
                            <p className="hero-description">
                                Explore our curated collection of premium items designed to enhance
                                your lifestyle. From fashion to tech, find everything you need with
                                exclusive deals and fast shipping.
                            </p>
                            <div className="hero-actions" data-aos="fade-up" data-aos-delay={200}>
                                <Link to="/shoplisting" className="btn-primary">
                                    Shop Now
                                </Link>
                                <Link to="/shoplisting" className="btn-secondary">
                                    Browse Categories
                                </Link>
                            </div>
                            <div className="features-list" data-aos="fade-up" data-aos-delay={300}>
                                <div className="feature-item">
                                    <i className="bi bi-truck" />
                                    <span>Free Shipping</span>
                                </div>
                                <div className="feature-item">
                                    <i className="bi bi-award" />
                                    <span>Quality Guarantee</span>
                                </div>
                                <div className="feature-item">
                                    <i className="bi bi-headset" />
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visuals">
                        <div
                            className="product-showcase"
                            data-aos="fade-left"
                            data-aos-delay={200}
                        >
                            <div className="product-card featured">
                                <img
                                    src="https://cdn.mos.cms.futurecdn.net/KfKJ7uGAXBxezdLqFMAZAR.jpg"
                                    alt="Featured Product"
                                    className="img-fluid"
                                />
                                <div className="product-badge">Best Seller</div>
                                <div className="product-info">
                                    <h4>Premium Wireless Headphones</h4>
                                    <div className="price">
                                        <span className="sale-price">₹2999</span>
                                        <span className="original-price">₹3999</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-grid">
                                <div className="product-mini" data-aos="zoom-in" data-aos-delay={400}>
                                    <img
                                        src="assets/img/product/product-3.webp"
                                        alt="Product"
                                        className="img-fluid"
                                    />
                                    <span className="mini-price">₹1899</span>
                                </div>
                                <div className="product-mini" data-aos="zoom-in" data-aos-delay={500}>
                                    <img
                                        src="assets/img/product/product-5.webp"
                                        alt="Product"
                                        className="img-fluid"
                                    />
                                    <span className="mini-price">₹1549</span>
                                </div>
                            </div>
                        </div>
                        <div className="floating-elements">
                            <div
                                className="floating-icon cart"
                                data-aos="fade-up"
                                data-aos-delay={600}
                            >
                                <i className="bi bi-cart3" />
                                <span className="notification-dot">3</span>
                            </div>
                            <div
                                className="floating-icon wishlist"
                                data-aos="fade-up"
                                data-aos-delay={700}
                            >
                                <i className="bi bi-heart" />
                            </div>
                            <div
                                className="floating-icon search"
                                data-aos="fade-up"
                                data-aos-delay={800}
                            >
                                <i className="bi bi-search" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="promo-cards" className="promo-cards section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div
                                className="category-featured"
                                data-aos="fade-right"
                                data-aos-delay={200}
                            >
                                <div className="category-image">
                                    <img
                                        src="assets/img/product/product-f-2.webp"
                                        alt="Women's Collection"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="category-content">
                                    <span className="category-tag">Trending Now</span>
                                    <h2>New Summer Collection</h2>
                                    <p>
                                        Discover our latest arrivals designed for the modern lifestyle.
                                        Elegant, comfortable, and sustainable fashion for every occasion.
                                    </p>
                                    <Link to="/shoplisting" className="btn-shop">
                                        Explore Collection <i className="bi bi-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-xl-6">
                                    <div
                                        className="category-card cat-men"
                                        data-aos="fade-up"
                                        data-aos-delay={300}
                                    >
                                        <div className="category-image">
                                            <img
                                                src="assets/img/product/product-m-5.webp"
                                                alt="Men's Fashion"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="category-content">
                                            <h4>Men's Wear</h4>
                                            <p>242 products</p>
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div
                                        className="category-card cat-kids"
                                        data-aos="fade-up"
                                        data-aos-delay={400}
                                    >
                                        <div className="category-image">
                                            <img
                                                src="assets/img/product/product-8.webp"
                                                alt="Kid's Fashion"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="category-content">
                                            <h4>Kid's Fashion</h4>
                                            <p>185 products</p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div
                                        className="category-card cat-cosmetics"
                                        data-aos="fade-up"
                                        data-aos-delay={500}
                                    >
                                        <div className="category-image">
                                            <img
                                                src="assets/img/product/product-3.webp"
                                                alt="Cosmetics"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="category-content">
                                            <h4>Beauty Products</h4>
                                            <p>127 products</p>
                                         
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div
                                        className="category-card cat-accessories"
                                        data-aos="fade-up"
                                        data-aos-delay={600}
                                    >
                                        <div className="category-image">
                                            <img
                                                src="assets/img/product/product-12.webp"
                                                alt="Accessories"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="category-content">
                                            <h4>Accessories</h4>
                                            <p>308 products</p>
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="call-to-action" className="call-to-action section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div
                                className="main-content text-center"
                                data-aos="zoom-in"
                                data-aos-delay={200}
                            >
                                <div
                                    className="offer-badge"
                                    data-aos="fade-down"
                                    data-aos-delay={250}
                                >
                                    <span className="limited-time">Limited Time</span>
                                    <span className="offer-text">50% OFF</span>
                                </div>
                                <h2 data-aos="fade-up" data-aos-delay={300}>
                                    Exclusive Flash Sale
                                </h2>
                                <p className="subtitle" data-aos="fade-up" data-aos-delay={350}>
                                    Don't miss out on our biggest sale of the year. Premium quality
                                    products at unbeatable prices for the next 48 hours only.
                                </p>
                              
                            </div>
                        </div>
                    </div>
                    <div
                        className="row featured-products-row"
                        data-aos="fade-up"
                        data-aos-delay={500}
                    >
                        {category.map((category) => {
                            return (
                                <ProductCategoryCard category={category} />
                            )
                        })}

                    </div>
                </div>
            </section>

            <section id="best-sellers" className="best-sellers section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Best Sellers</h2>

                </div>

                <div className="container" data-aos="fade-up" data-aos-delay={100}>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div className="row g-5">

                            {product.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.id || product._id || product.name}
                                        product={product} />
                                )
                            })}

                        </div>
                    )}
                </div>

            </section>

            <section id="cards" className="cards section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="row gy-4">
                        <div
                            className="col-lg-4 col-md-6 mb-5 mb-md-0"
                            data-aos="fade-up"
                            data-aos-delay={200}
                        >
                            <div className="product-category">
                                <h3 className="category-title">
                                    <i className="bi bi-fire" /> Trending Now
                                </h3>
                                <div className="product-list">
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="assets/img/product/product-1.webp"
                                                alt="Premium Leather Tote"
                                                className="img-fluid"
                                            />
                                            <div className="product-badges">
                                                <span className="badge-new">New</span>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Premium Leather Tote</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-half" />
                                                <span>(24)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$87.50</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="https://www.pinpng.com/pngs/m/393-3939565_earrings-hd-png-download.png"
                                                alt="Statement Earrings"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Statement Earrings</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <span>(41)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$39.99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="https://www.nonasties.in/cdn/shop/products/botanica-relaxed-shirt-no-nasties-organic-cotton-clothes-7.jpg?v=1673443472"
                                                alt="Organic Cotton Shirt"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Organic Cotton Shirt</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star" />
                                                <span>(18)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$45.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-md-6 mb-5 mb-md-0"
                            data-aos="fade-up"
                            data-aos-delay={300}
                        >
                            <div className="product-category">
                                <h3 className="category-title">
                                    <i className="bi bi-award" /> Best Sellers
                                </h3>
                                <div className="product-list">
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="https://resources.mandmdirect.com/Images/_default/n/n/3/nn31303_3_cloudzoom.jpg"
                                                alt="Slim Fit Denim"
                                                className="img-fluid"
                                            />
                                            <div className="product-badges">
                                                <span className="badge-sale">-15%</span>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Slim Fit Denim</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <span>(87)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$68.00</span>
                                                <span className="old-price">$80.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="assets/img/product/product-6.webp"
                                                alt="Designer Handbag"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Designer Handbag</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-half" />
                                                <span>(56)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$129.99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="assets/img/product/product-8.webp"
                                                alt="Leather Crossbody"
                                                className="img-fluid"
                                            />
                                            <div className="product-badges">
                                                <span className="badge-hot">Hot</span>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Leather Crossbody</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <span>(112)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$95.50</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-md-6 mb-5 mb-md-0"
                            data-aos="fade-up"
                            data-aos-delay={400}
                        >
                            <div className="product-category">
                                <h3 className="category-title">
                                    <i className="bi bi-star" /> Featured Items
                                </h3>
                                <div className="product-list">
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="https://lsco.scene7.com/is/image/lsco/001VN0000-back-pdp-ld?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=2500"
                                                alt="Pleated Midi Skirt"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Pleated Midi Skirt</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star" />
                                                <span>(32)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$75.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="https://www.pinpng.com/pngs/m/374-3744823_earrings-hd-png-download.png"
                                                alt="Geometric Earrings"
                                                className="img-fluid"
                                            />
                                            <div className="product-badges">
                                                <span className="badge-limited">Limited</span>
                                            </div>
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Geometric Earrings</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-half" />
                                                <span>(47)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$42.99</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-card">
                                        <div className="product-image">
                                            <img
                                                src="assets/img/product/product-9.webp"
                                                alt="Structured Satchel"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <h4 className="product-name">Structured Satchel</h4>
                                            <div className="product-rating">
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <i className="bi bi-star-fill" />
                                                <span>(64)</span>
                                            </div>
                                            <div className="product-price">
                                                <span className="current-price">$89.99</span>
                                            </div>
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

export default Home

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const ShopListing = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    // price range
    const [priceRange, setPriceRange] = useState([0, 150000]);

    // selected categories
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    // ✅ Fetch products with filters
    const getFilteredProductsData = async () => {
        setLoading(true);
        try {
            const query = `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}
            ${selectedCategories.length > 0 ? `&categories=${selectedCategories.join(",")}` : ""}
            ${selectedColors.length > 0 ? `&color=${selectedColors.join(",")}` : ""}
            ${selectedSizes.length > 0 ? `&sizes=${selectedSizes.join(",")}` : ""}`;

            const res = await axios.get(
                `https://ecomweb-backend-u6x8.onrender.com/products?${query}`
            );
            console.log(res.data);
            setProducts(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to load products");
            setLoading(false);
        }
    };

    // fetch products whenever filters/price changes
    useEffect(() => {
        getFilteredProductsData();
        // eslint-disable-next-line
    }, [priceRange, selectedCategories, selectedColors, selectedSizes]);

    // Handle category select
    const handleSelect = (filter, type) => {
        setFilters((prev) =>
            prev.includes(filter) ? prev : [...prev, filter]
        );

        if (type === "category") {
            setSelectedCategories((prev) =>
                prev.includes(filter)
                    ? prev.filter((f) => f !== filter)
                    : [...prev, filter]
            );
        } else if (type === "color") {
            setSelectedColors((prev) =>
                prev.includes(filter)
                    ? prev.filter((f) => f !== filter)
                    : [...prev, filter]
            );
        } else if (type === "size") {
            setSelectedSizes((prev) =>
                prev.includes(filter)
                    ? prev.filter((f) => f !== filter)
                    : [...prev, filter]
            );
        }
    };

    // Remove individual filter
    const handleRemove = (filter) => {
        setFilters(filters.filter((f) => f !== filter));
        setSelectedCategories((prev) => prev.filter((f) => f !== filter));
        setSelectedColors((prev) => prev.filter((f) => f !== filter));
        setSelectedSizes((prev) => prev.filter((f) => f !== filter));
    };

    // Clear all
    const clearAll = () => {
        setFilters([]);
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setPriceRange([0, 150000]);
    };

    return (
        <>
            <div className="page-title light-background">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">Category</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            <li>
                                <Link to="index.html">Home</Link>
                            </li>
                            <li className="current">Category</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* End Page Title */}
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-4 sidebar">
                        <div className="widgets-container">
                            {/* --- Categories --- */}
                            <div className="product-categories-widget widget-item">
                                <h3 className="widget-title">Categories</h3>
                                <ul className="category-tree list-unstyled mb-0">


                                    <li className="category-item">
                                        <div class="d-flex justify-content-between align-items-center category-header collapsed" data-bs-toggle="collapse" data-bs-target="#categories-1-clothing-subcategories" aria-expanded="false" aria-controls="categories-1-clothing-subcategories">
                                            <a href="javascript:void(0)" class="category-link">Clothing</a>
                                            <span class="category-toggle">
                                                <i class="bi bi-chevron-down"></i>
                                                <i class="bi bi-chevron-up"></i>
                                            </span>
                                        </div>
                                        <ul
                                            id="categories-1-clothing-subcategories"
                                            className="subcategory-list list-unstyled collapse ps-3 mt-2"
                                        >
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Men's Wear", "category")}
                                                // className="subcategory-link"
                                                >
                                                    Men's Wear
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Women's Wear", "category")}
                                                // className="subcategory-link"
                                                >
                                                    Women's Wear
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Kid's Wear", "category")}
                                                // className="subcategory-link"
                                                >
                                                    Kids' Clothing
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Accessories", "category")}
                                                >
                                                    Accessories
                                                </button>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="category-item">
                                        <div className="d-flex justify-content-between align-items-center category-header collapsed" data-bs-toggle="collapse" data-bs-target="#categories-1-electronics-subcategories" aria-expanded="false" aria-controls="categories-1-electronics-subcategories">
                                            <a href="javascript:void(0)" className="category-link">Electronics</a>
                                            <span className="category-toggle">
                                                <i className="bi bi-chevron-down"></i>
                                                <i className="bi bi-chevron-up"></i>
                                            </span>
                                        </div>
                                        <ul id="categories-1-electronics-subcategories" className="subcategory-list list-unstyled collapse ps-3 mt-2">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Smartphones", "category")}>
                                                    Smartphones
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Tablets", "category")}>
                                                    Tablets
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("E Accessories", "category")}>
                                                    Ele. Accessories
                                                </button>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className="category-item">
                                        <div className="d-flex justify-content-between align-items-center category-header collapsed" data-bs-toggle="collapse" data-bs-target="#categories-1-sports-subcategories" aria-expanded="false" aria-controls="categories-1-sports-subcategories">
                                            <a href="javascript:void(0)" className="category-link">Sports &amp; Outdoors</a>
                                            <span className="category-toggle">
                                                <i className="bi bi-chevron-down"></i>
                                                <i className="bi bi-chevron-up"></i>
                                            </span>
                                        </div>
                                        <ul id="categories-1-sports-subcategories" className="subcategory-list list-unstyled collapse ps-3 mt-2">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Fitness Equipment", "category")}>
                                                    Fitness Equipment
                                                </button>
                                            </li> <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Outdoor Gear", "category")}>
                                                    Outdoor Gear
                                                </button>
                                            </li> <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Sports Apparel", "category")}>
                                                    Sports Apparel
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Team Sports", "category")}>
                                                    Team Sports
                                                </button>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="category-item">
                                        <div className="d-flex justify-content-between align-items-center category-header collapsed" data-bs-toggle="collapse" data-bs-target="#categories-1-beauty-subcategories" aria-expanded="false" aria-controls="categories-1-beauty-subcategories">
                                            <a href="javascript:void(0)" className="category-link">Beauty &amp; Personal Care</a>
                                            <span className="category-toggle">
                                                <i className="bi bi-chevron-down"></i>
                                                <i className="bi bi-chevron-up"></i>
                                            </span>
                                        </div>
                                        <ul id="categories-1-beauty-subcategories" className="subcategory-list list-unstyled collapse ps-3 mt-2">
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Hair Care", "category")}>
                                                    Hair Care
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Fragrances", "category")}>
                                                    Fragrances
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Makeup", "category")}>
                                                    Makeup
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    type="button"
                                                    className="btn btn-link subcategory-link"
                                                    onClick={() => handleSelect("Skincare", "category")}>
                                                    Skincare
                                                </button>
                                            </li>

                                        </ul>
                                    </li>

                                    <li className="category-item">
                                        <div className="d-flex justify-content-between align-items-center category-header">
                                            <Link to=""
                                                // type="button"
                                                className="category-link"
                                                onClick={() => handleSelect("Books", "category")}>
                                                Books
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>


                            <div className="pricing-range-widget widget-item">
                                <h3 className="widget-title">Price Range</h3>
                                <div className="price-range-container">
                                    <div className="current-range mb-3">
                                        <span className="min-price">${priceRange[0]}</span>
                                        <span className="max-price float-end">
                                            ${priceRange[1]}
                                        </span>
                                    </div>
                                    <div className="range-slider">
                                        <input
                                            type="range"
                                            className="min-range"
                                            min={0}
                                            max={150000}
                                            value={priceRange[0]}
                                            step={10}
                                            onChange={(e) =>
                                                setPriceRange([+e.target.value, priceRange[1]])
                                            }
                                        />
                                        <input
                                            type="range"
                                            className="max-range"
                                            min={0}
                                            max={150000}
                                            value={priceRange[1]}
                                            step={10}
                                            onChange={(e) =>
                                                setPriceRange([priceRange[0], +e.target.value])
                                            }
                                        />
                                    </div>
                                    <div className="price-inputs mt-3">
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <div className="input-group input-group-sm">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control min-price-input"
                                                        placeholder="Min"
                                                        value={priceRange[0]}
                                                        min={0}
                                                        max={150000}
                                                        step={10}
                                                        onChange={(e) =>
                                                            setPriceRange([+e.target.value, priceRange[1]])
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="input-group input-group-sm">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control max-price-input"
                                                        placeholder="Max"
                                                        value={priceRange[1]}
                                                        min={0}
                                                        max={150000}
                                                        step={10}
                                                        onChange={(e) =>
                                                            setPriceRange([priceRange[0], +e.target.value])
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="color-filter-widget widget-item">
                                <h3 className="widget-title">Filter by Color</h3>
                                <div className="color-filter-content">
                                    <div className="color-options">
                                        {["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown"].map(
                                            (color) => (
                                                <div className="form-check color-option" key={color}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`color-${color}`}
                                                        checked={selectedColors.includes(color)}
                                                        onChange={() => handleSelect(color, "color")}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`color-${color}`}
                                                    >
                                                        <span
                                                            className="color-swatch"
                                                            style={{ backgroundColor: color }}
                                                            title={color}
                                                        />
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="brand-filter-widget widget-item">
                                <h3 className="widget-title">Filter by Size</h3>
                                <div className="brand-list">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <div className="brand-item" key={size}>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`size-${size}`}
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={() => handleSelect(size, "size")}
                                                />
                                                <label className="form-check-label" htmlFor={`size-${size}`}>
                                                    {size}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-lg-8">
                        {/* Active Filters */}
                        <section
                            id="category-header"
                            className="category-header section"
                        >
                            <div className="container" data-aos="fade-up">
                                <div className="filter-container mb-4" data-aos="fade-up" data-aos-delay="100">

                                    <div className="row g-3">
                                        <div className="col-12 col-md-6 col-lg-4">
                                            <div className="filter-item search-form">
                                                <label for="productSearch" className="form-label">Search Products</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="productSearch" placeholder="Search for products..." aria-label="Search for products" />
                                                    <button className="btn search-btn" type="button">
                                                        <i className="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {filters.length > 0 && (
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <div className="active-filters">
                                                    <span className="active-filter-label">
                                                        Active Filters:
                                                    </span>
                                                    <div className="filter-tags">
                                                        {filters.map((filter) => (
                                                            <span key={filter} className="filter-tag">
                                                                {filter}{" "}
                                                                <button
                                                                    className="filter-remove"
                                                                    onClick={() => handleRemove(filter)}
                                                                >
                                                                    <i className="bi bi-x" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                        <button
                                                            className="clear-all-btn"
                                                            onClick={clearAll}
                                                        >
                                                            Clear All
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Products */}
                        <section
                            id="category-product-list"
                            className="category-product-list section"
                        >
                            <div
                                className="container"
                                data-aos="fade-up"
                                data-aos-delay={100}
                            >
                                {loading ? (
                                    <div className="d-flex justify-content-center">
                                        <CircularProgress />
                                    </div>
                                ) : (
                                    <div className="row g-4">
                                        {products.length > 0 ? (
                                            products.map((product) => (
                                                <div
                                                    className="col-6 col-xl-4"
                                                    key={product._id}
                                                >
                                                    <div
                                                        className="product-card"
                                                        data-aos="zoom-in"
                                                    >
                                                        <div className="product-image">
                                                            <img
                                                                src={product?.img?.[0]}
                                                                className="main-image"
                                                                alt={product.title}
                                                            />
                                                            <img src={product?.img?.[1]} class="hover-image img-fluid" alt="Product Variant" />
                                                            <div className="product-overlay">
                                                                <div className="product-actions">
                                                                    <button
                                                                        type="button"
                                                                        className="action-btn"
                                                                        data-bs-toggle="tooltip"
                                                                        title="Quick View"
                                                                        onClick={() => {
                                                                            if (product?.img?.[0]) {
                                                                                window.open(product.img[0], "_blank");
                                                                            } else {
                                                                                alert("No image available");
                                                                            }
                                                                        }}
                                                                    >
                                                                        <i className="bi bi-eye" />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="action-btn"
                                                                        data-bs-toggle="tooltip"
                                                                        title="Add to Cart"
                                                                        onClick={()=> navigate(`/productdetails/${product?._id}`)}
                                                                    >
                                                                        <i className="bi bi-cart-plus" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="product-details">
                                                            <div className="product-category">
                                                                {product.category}
                                                            </div>
                                                            <h4 className="product-title fw-bold">
                                                                <Link to="#">
                                                                    {product.name}
                                                                </Link>
                                                            </h4>
                                                            <div className="product-meta">
                                                                <div className="product-price">
                                                                    ₹{product?.price?.org}.00
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No products found</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopListing;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import ProductCard from "../cards/ProductCard";

const SearchProducts = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get("q");

    const fetchSearchResults = async () => {
        if (!query) return;
        try {
            setLoading(true);
            const res = await axios.get(
                `https://ecomweb-backend-u6x8.onrender.com/products?search=${encodeURIComponent(query)}`
            );
            console.log(res.data);
            setResults(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSearchResults();
        // eslint-disable-next-line 
    }, [query]);

    return (

            <section id="best-sellers" className="best-sellers section">

                <div className="container section-title" data-aos="fade-up">
                    <h2>Search Results for "{query}"</h2>

                    {loading && <h4>Loading...</h4>}

                    {!loading && results.length === 0 && (
                        <h4>No products found.</h4>
                    )}
                </div>

                <div className="container" data-aos="fade-up" data-aos-delay={100}>

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div className="row g-5">

                            {results.map((product) => {
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
       
    );
}

export default SearchProducts

import React from 'react'

const ProductCategoryCard = ({category}) => {
    return (
        <div

            className="col-lg-3 col-md-6"
            data-aos="zoom-in"
            data-aos-delay={100}
                              >
            <div className="product-showcase">
                <div className="product-image">
                    <img
                        src={category.img}
                        alt="Featured Product"
                        className="img-fluid"
                    />
                    <div className="discount-badge">{category.off}</div>
                </div>
                <div className="product-details">
                    <h6>{category.name}</h6>
                    {/* <div className="price-section">
                        <span className="original-price">$129</span>
                        <span className="sale-price">$71</span>
                    </div> */}
                    <div className="rating-stars">
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <i className="bi bi-star-fill" />
                        <span className="rating-count">(324)</span>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default ProductCategoryCard

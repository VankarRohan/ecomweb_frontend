import { CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../cards/ProductCard'
import { toast } from 'react-toastify'

const Favorite = () => {

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState([])
  const token = localStorage.getItem("ecomweb-token")
  // console.log(token)

  const getfavorites = async () => {

    try {
      setLoading(true)
      if (token) {

        const res = await axios.get("https://ecomweb-backend-u6x8.onrender.com/users/favorite", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log(res.data)
        setLoading(false)
        setProduct(res.data)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message);
    }
  }


  useEffect(() => {
    if (token) {
      getfavorites()
    }
  }, [])
  return (
    <section id="best-sellers" className="best-sellers section">



      <div className="container section-title" data-aos="fade-up">
        <h2>Your favorites</h2>

      </div>




      <div className="container" data-aos="fade-up" data-aos-delay={100}>

        <div style={{

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

        }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {product.length === 0 ? (
                <h3>No favourites !!</h3>
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
            </>
          )}
        </div>
      </div>

    </section >
  )
}

export default Favorite

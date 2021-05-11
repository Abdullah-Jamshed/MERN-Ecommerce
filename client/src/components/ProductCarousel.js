import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Carousel, Image } from "react-bootstrap";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getTopProducts } from "../store/actions/productActions";

const ProductCarousel = () => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { topProducts } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  useEffect(() => {
    if (topProducts.length) {
      console.log(topProducts);
    }
  }, [dispatch, topProducts]);

  return (
    topProducts.length !== 0 && (
      <Carousel pause='hover' className='bg-dark m-4'>
        {topProducts.length !== 0 &&
          topProducts.map((product) => (
            <Carousel.Item key={product._id}>
              <Link>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} ({product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    )
  );
};

export default ProductCarousel;

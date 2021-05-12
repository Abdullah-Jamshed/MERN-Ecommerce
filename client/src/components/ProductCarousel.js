import React, { useEffect } from "react";

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

  return (
    topProducts.length !== 0 && (
      <Carousel pause='hover' className='bg-dark m-4'>
        {topProducts.length !== 0 &&
          topProducts.map((product) => (
            <Carousel.Item key={product._id}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} ({product.price})
                  </h2>
                </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    )
  );
};

export default ProductCarousel;

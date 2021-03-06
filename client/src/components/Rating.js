import React from "react";

const Rating = ({ rating, reviews, color }) => {
  return (
    <div className='rating py-2'>
      <span>
        {/* {[1, 2, 3, 4, 5].map((res) => ( */}
        {[...Array(5).keys()].map((res) => (
          <i
            key={res}
            style={{ color }}
            className={rating >= res + 1 ? "fa fa-star" : rating >= res + 1 - 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"}
          />
        ))}
      </span>
      {reviews !== null && <span className='ml-2'>{reviews} reviews</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;

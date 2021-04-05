import React from "react";

const Rating = ({ rating, reviews }) => {
  const numofStar = 5;
  //   const starNumber = 0;
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((res, i) => (
        <i className={rating >= res ? "fa fa-star" : rating >= res - 0.5 ? "fa fa-star-half-o" : "fa fa-star-o"} />
      ))}
    </div>
  );
};

export default Rating;

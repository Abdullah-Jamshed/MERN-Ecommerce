import React from "react";

// UI LIBRARY COMPONENTS
import { Pagination } from "react-bootstrap";

const Paginate = ({ history, page, pages, isAdmin = false, keyword = "" }) => {
  // HANDLER FUNCTION
  const pushTo = (pageNumber) => {
    if (isAdmin) {
      history.push(`/admin/products/${pageNumber}`);
    } else {
      history.push(keyword ? `/search/${keyword}/page/${pageNumber}` : `/page/${pageNumber}`);
    }
  };

  return (
    pages > 1 && (
      <Pagination className='mt-4'>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item key={x + 1} onClick={() => pushTo(x + 1)} active={x + 1 === Number(page)}>
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;

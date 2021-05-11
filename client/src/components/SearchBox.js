import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  // STATE
  const [keyword, setKeyword] = useState("");
  // HANDLER FUNCTION
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='search' className='mr-sm-2 mr-sm-4'></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

import React, { useEffect, useState, useHistory } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { getAllUser } from '../services/API';
import search from '../assets/icons/search.png'

function SearchBar() {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query != "") {
      navigate({
        pathname: "search",
        search: createSearchParams({ q: query }).toString()
      })
      window.location.reload();
    } else {
      alert("Please enter some search text!");
    }
  };

  return (
    <Container className='searchInputs d-flex'>
      <Form id='Search' onSubmit={handleSubmit} className="justify-content-center">
        <Form.Control
          className='rounded-pill' type="text" placeholder="Tìm kiếm"
          style={{ height: '50px' }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form>
      <Button
        className='border-0 bg-transparent p-0'
        onClick={handleSubmit}>
        <Image className='align-middle' src={search} style={{ height: 30, width: 30 }} />
      </Button>
    </Container>
  )
}

export default SearchBar
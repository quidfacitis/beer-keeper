import React, { useState, useContext, useEffect } from 'react';
import BeerLibraryContext from '../../context/beerLibrary/beerLibraryContext';

const BeerForm = () => {
  const beerLibraryContext = useContext(BeerLibraryContext);

  const { addBeer, current, clearCurrentBeer, updateBeer } = beerLibraryContext;

  useEffect(() => {
    if (current !== null) {
      setFormBeer(current);
    } else {
      setFormBeer({
        name: '',
        type: '',
        abv: '',
        description: '',
        rating: 0
      });
    }
  }, [current]);

  const [formBeer, setFormBeer] = useState({
    name: '',
    type: '',
    abv: '',
    description: '',
    rating: 0
  });

  const { name, type, abv, description, rating } = formBeer;

  const onChange = e => setFormBeer({ ...formBeer, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log("onSubmit CLICKED IN BEER FORM");
    if (current !== null) {
      updateBeer(formBeer);
      clearCurrentBeer();
    } else {
      addBeer(formBeer);
    }
    setFormBeer({
      name: '',
      type: '',
      abv: '',
      description: '',
      rating: 0
    });
  };

  return (
    <div>
      <h1 className="register-center">{current !== null ? "Edit Beer" : "Add New Beer"}</h1>
      <form onSubmit={onSubmit}>
        <div className="form-line">
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required />
        </div>
        <div className="form-line">
          <label htmlFor='type'>Type</label>
          <input type='text' name='type' value={type} onChange={onChange} />
        </div>
        <div className="form-line">
          <label htmlFor='abv'>Abv</label>
          <input type='text' name='abv' value={abv} onChange={onChange} />
        </div>
        <div className="form-line">
          <label htmlFor='description'>Description</label>
          <input type='text' name='description' value={description} onChange={onChange} />
        </div>
        <div className="form-line">
          <label htmlFor='rating'>Rating</label>
          <input type='number' min="0" max="5" name='rating' value={rating} onChange={onChange} />
        </div>
        <div className="form-line">
          <input className="add-beer-btn" type='submit' value={current !== null ? "Edit Beer" : "Add New Beer"} />
        </div>
      </form>
    </div>
  )
}

export default BeerForm;

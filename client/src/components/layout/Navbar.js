import React from 'react';
import { Link } from 'react-router-dom';
import newThreeBeers from './new_three_beers.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/' className="no-underline title-container"><img src={newThreeBeers} className="small-img" alt=''/>
        <h3>Beer Keeper | Keep track of your favorite beers. Discover new ones.</h3></Link>
      <ul >
        <li>
          <Link to='/login' className="no-underline">Login</Link>
        </li>
        <li>
          <Link to='/register' className="no-underline">Register</Link>
        </li>
        <li>
          <Link to='/about' className="no-underline">About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;

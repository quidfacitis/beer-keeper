import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to='/' className="no-underline"><h3>Beer Keeper | Keep track of your favorite beers and discover new ones</h3></Link>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;

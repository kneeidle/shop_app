import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/logo1.png';

function Nav(props) {
  const navStyle = {
  };

  const { posts } = props;

  return (
    <nav className="nav">
      <Link style={navStyle} to="/">
        <div className="logo">
          <img height="100px" src={logo} alt="" />
          <h1>Hamburger Shop</h1>
        </div>
      </Link>
      <div>
        <ul className="nav-links">
          <li><Link className="nav-item" active-color="green" style={navStyle} to="/contact">Contact</Link></li>
          <li><Link className="nav-item" active-color="blue" style={navStyle} to="/product/upload">Upload</Link></li>
          <li><Link className="nav-item" active-color="blue" style={navStyle} to="/login">Login</Link></li>
          <li><Link className="nav-item" active-color="blue" style={navStyle} to="/cart">{posts}<ion-icon name="cart-outline" /></Link></li>
          <span className="nav-indicator" />
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Nav);

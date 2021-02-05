import React, { useEffect } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../images/logo1.png';
import { Admin, Authorize, deletePost } from '../actions/postActions'

function Nav(props) {

  useEffect(() => {
    props.Authorize(JSON.parse(localStorage.getItem("Login")))
    props.Admin(JSON.parse(localStorage.getItem("Admin")))
    props.deletePost(parseInt(localStorage.getItem('cartNumbers')) ? parseInt(localStorage.getItem('cartNumbers')) : 0);
    localStorage.setItem('productsInCart', JSON.stringify({}));
  }, []);

  const navStyle = {
  };

  const spanStyle = {
    backgroundColor: "red",
    color: "white",
    paddingLeft: "7px",
    paddingRight: "7px",
    paddingBottom: "2px",
    borderRadius: "25px",
    fontSize: "20px",
    zIndex: "100",
    position: "absolute",
    left: "60%",
    top: "0px",
    border: "3px solid #301e12",
  };
  const cartStyle = {
    position: "relative"
  }
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
          {props.isAdmin ? (<li><Link className="nav-item" active-color="blue" style={navStyle} to="/product/upload">Upload</Link></li>) : (null)}
          {!props.isAuthenticated ? (<li><Link className="nav-item" active-color="blue" style={navStyle} to="/login">Login</Link></li>) : (null)}
          {props.isAuthenticated ? (<li><Link className="nav-item" to="/logout">Logout</Link></li>) : (null)}
          {props.isAuthenticated ? (<li style={cartStyle}><Link style={navStyle} to="/cart"><ion-icon style={{ zIndex: "-1", fontSize: "40px", color: "#f7c530" }} name="cart-outline" />{ posts != 0 ? (<span style={spanStyle}>{posts}</span>):(null)}</Link></li>) : (null)}
          <span className="nav-indicator" />
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  isAuthenticated: state.auth,
  isAdmin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
      Authorize: (auth) => { dispatch(Authorize(auth)); },
      Admin: (admin) => { dispatch(Admin(admin)); },
      deletePost: (id) => { dispatch(deletePost(id)); },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Nav);

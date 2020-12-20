import React from 'react'
import './BottomMenu.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function BottomMenu(props) {

    const { posts } = props;

    return (
        <nav class="bottom__nav">
                <ul className="bottom__nav-links">
                    <li><Link className="nav__link nav__link--active" to="/"><span className="material-icons nav__icon">dashboard</span><span className="nav__text">Products</span></Link></li>
                    <li><Link className="nav__link" to="/contact"><span className="material-icons nav__icon">contact_page</span><span className="nav__text">Contact</span></Link></li>
                    <li><Link className="nav__link" to="/product/upload"><span className="material-icons nav__icon">publish</span><span className="nav__text">Upload</span></Link></li>
                    <li><Link className="nav__link" to="/cart"><span class="material-icons nav__icon">shopping_cart</span><span className="nav__text">{posts}</span></Link></li>
                </ul>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }

}

export default connect(mapStateToProps)(BottomMenu)  
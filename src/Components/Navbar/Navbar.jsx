import React, { useState, useContext,} from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link,  } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);


  return (
    <div className='navbar'>
      <input type="checkbox" id="nav-toggle" hidden />
<label htmlFor="nav-toggle" className="nav-toggle-label">
  <span></span>
</label>

      <div className="nav-logo">
        <img src={logo} alt="Logo" style={{ width: "40px" }} />
        <p>LUXE NEST</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{menu === "shop" && <hr />}</li>
        <li onClick={() => setMenu("mens")}><Link to='/mens'>Men</Link>{menu === "mens" && <hr />}</li>
        <li onClick={() => setMenu("women")}><Link to='/womens'>Women</Link>{menu === "women" && <hr />}</li>
        <li onClick={() => setMenu("kids")}><Link to='/kids'>Kids</Link>{menu === "kids" && <hr />}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} >Logout</button> 
        : <Link to="/login"><button>Login</button></Link>}
        <Link to='/cart'>
          <div className="nav-cart-icon">
            <img src={cart_icon} alt="Cart" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import './Header.css';
import companylogo from '../../assets/e-wings-small.png';

function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // const logoutUser = () => {
  //   closeMobileMenu();
  //   logout();
  // }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' style={{marginLeft:-20}} className='navbar-logo' onClick={closeMobileMenu}>
            <Image src={companylogo} alt="Logo" />
            <i className='fab fa-typo3' />
          </Link>

          <div className="fill"></div>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fa fa-times' : 'fa fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={logoutUser}>Home</Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link to='/about-us' className='nav-links' onClick={closeMobileMenu}>About Us</Link>
            </li> */}
            {/* <li className='nav-item'>
              <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>Contact Us</Link>
            </li> */}
            {/* <li>
              <Link to='/ddoMobilelogin' className='nav-links' onClick={closeMobileMenu}>Mobile User Login</Link>
            </li> */}
            <li>
              <Link to='/ddologin' className='nav-links' onClick={closeMobileMenu}>DDO Login</Link>
            </li>

            {/* <li>
              <Link to='/StaffLogin' className='nav-link' onClick={closeMobileMenu}>Admin Login</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;

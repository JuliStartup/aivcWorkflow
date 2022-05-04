import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
// import { Button } from './Button';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.css';
import decode from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
function Navbar({ isClient }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  // const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = user?.token;
    showButton();
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
  }, []);
  let routeGo = user?.result;
  let routePath = '/services';
  if (routeGo?.email && routeGo?.email.includes('aivc.ca')) {
    routePath = '/dashboard/app';
  } else {
    routePath = '/applications';
  }
  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('profile');
    localStorage.removeItem('role');
    history('/');
    setUser(null);
  };
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const callLogOut = () => {
    logOut();
    closeMobileMenu();
  };
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            AIVC
            <Box
              component="img"
              src="/static/AIVC-logos_white.png"
              sx={{ width: 40, height: 40 }}
            />
            {/* <i className="fab fa-typo3" /> */}
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {!isClient && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                    Services
                  </Link>
                </li>
              </>
            )}{' '}
            {isClient && (
              <>
                <li className="nav-item">
                  <Link to="/programs" className="nav-links" onClick={closeMobileMenu}>
                    Programs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/applications" className="nav-links" onClick={closeMobileMenu}>
                    Applications
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <a
                className="nav-links"
                target="_blank"
                rel="noreferrer"
                href="https://squareup.com/appointments/book/3wgom89ajm97b1/LHKKTY2HYWJ8Y/start"
              >
                Book Appointment
              </a>
            </li>
            <li className="nav-item">
              {user === null ? (
                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                  Register / Login
                </Link>
              ) : (
                <>
                  <Link to={routePath} className="nav-links" onClick={closeMobileMenu}>
                    Account
                  </Link>
                </>
              )}
            </li>
            <li className="nav-item">
              {user !== null ? (
                <Link to="/" className="nav-links" onClick={callLogOut}>
                  Logout
                </Link>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

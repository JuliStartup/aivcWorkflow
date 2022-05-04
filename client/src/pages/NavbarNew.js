import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import { displayUI } from 'src/ui';
import { makeStyles } from '@mui/styles';
import AnimeVideo from './AnimeVideo';
const useStyles = makeStyles((theme) => ({
  buttonPrime: {
    '&:hover': {
      background: '#9291d8'
    },
    '&:active': {
      background: '#9291d8'
    }
  }
}));
export default function NavbarNew({ showAnime, colorVal, bgCol }) {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
  }, [location]);

  const logOut = () => {
    dispatch({ type: 'LOGOUT' });
    history('/');
    setUser(null);
  };
  const navButtonClick = (e) => {
    const nav = String(e.target.outerText).toLowerCase();
    navigateNav(nav);
  };
  const navigateNav = (nav) => {
    switch (nav) {
      case 'home':
        history('/');
        break;
      case 'about us':
        history('/about-us');
        break;
      case 'services':
        history('/services');
        break;
      case 'how extend visa process':
        history('/extend-process');
        break;
      default:
        history('/');
        break;
    }
  };
  const handleClickLogin = (e) => {
    e.preventDefault();
    history('/login');
  };
  const handleClickAccount = (e) => {
    e.preventDefault();
    history('/dashboard/app');
  };
  const pages = ['Home', 'About Us', 'Services', 'How Extend Visa Process'];

  return (
    <>
      <div className="homeContent">
        <AppBar
          position="fixed"
          style={{
            display: 'flex',
            flexDirection: 'row',
            background: bgCol,
            color: '#00AB55'
          }}
        >
          <LogoOnlyLayout />
          <Container>
            <Toolbar disableGutters>
              <Box className="menuItems" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    className={classes.buttonPrime}
                    key={page}
                    onClick={navButtonClick}
                    sx={{
                      my: 2,
                      fontWeight: 'bold',
                      fontSize: '.8rem',
                      display: 'block',
                      background: '#38368a',
                      color: 'white',
                      marginRight: '5px'
                    }}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  className={classes.buttonPrime}
                  sx={{
                    my: 2,
                    fontWeight: 'bold',
                    background: '#38368a',
                    color: 'white',
                    marginRight: '5px',
                    display: 'block',
                    fontSize: '.8rem'
                  }}
                >
                  <a
                    style={{ textDecoration: 'none', color: '#fff' }}
                    target="_blank"
                    href="
                  https://squareup.com/appointments/book/3wgom89ajm97b1/LHKKTY2HYWJ8Y/start "
                    rel="nofollow"
                  >
                    Book Appointment
                  </a>
                </Button>
              </Box>
              {user ? (
                <Button
                  className={classes.buttonPrime}
                  type="submit"
                  onClick={handleClickAccount}
                  variant="contained"
                >
                  Agents Account
                </Button>
              ) : (
                <Button
                  className={classes.buttonPrime}
                  type="submit"
                  onClick={handleClickLogin}
                  variant="contained"
                >
                  Agents Only
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        {showAnime ? <AnimeVideo /> : <></>}

        {/* <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h3" align="center" color="primary">
            Our Programs
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="PR Express Entry" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="LMIA " />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="BC PNP " />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="Family Sponsorship " />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="Work Permit " />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="Study Visa" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppTotalCases event="Owner Operator Visa" />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppNewsUpdate />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AppOrderTimeline />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Typography variant="h3" align="center" color="primary">
            Our Story
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <AppTotalCases
                event="AIVC http://www.aivc.ca is a leading Canadian Immigration consultation firm with over 5 years of experience. Led by Robin Kapoor, AIVC is comprised with over 10 staff including other RCIC's, administrative assistants and Education Counsellors.

AIVC is dedicated to helping people achieve their Canadian Immigration goals. We assist in areas including Skilled Worker and Business Immigration, Family Sponsorship, Work Permits, Study Permits, Citizenship, and Study/Work extensions.

Robin Kapoor is one of Canada's most experienced and respected Immigration Consultant and often features in media publications in and around India to provide with his expert insights.

We care about you, your family and your business / career, as if it was our very own. We prefer appointments to be able to deliver best that was promised through our consultation sessions. We develop tailored immigration pathways and realistic advise to those who are looking to immigrate to Beautiful Canada ! We dedicate time and attention to listen to your individual needs rather than opting for standard immigration practise."
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ pb: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <AppTrafficBySite />
            </Grid>
          </Grid>
        </Box>
      </Container> */}
      </div>
    </>
  );
}

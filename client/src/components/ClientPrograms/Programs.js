import React from 'react';
import './Programs.scss';
import { IconContext } from 'react-icons/lib';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { IconWrapperStyle } from 'src/sections/@dashboard/app/AppTotalCases';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function Programs() {
  const history = useNavigate();

  const showNewVisitForm = (e) => {
    e.preventDefault();
    history('/new-visit-visa');
  };
  const showExtendVisitForm = (e) => {
    e.preventDefault();
    history('/extend-visit-visa');
  };
  const showNewStudyForm = (e) => {
    e.preventDefault();
    history('/new-study-visa');
  };
  const showExtendStudyForm = (e) => {
    e.preventDefault();
    history('/extend-study-visa');
  };
  const showPGWPForm = (e) => {
    e.preventDefault();
    history('/work-visa');
  };
  const showExtendWorkForm = (e) => {
    e.preventDefault();
    history('/extend-work-visa');
  };
  const showSpousalForm = (e) => {
    e.preventDefault();
    history('/spousal-visa');
  };
  const showAddOnForm = (e) => {
    e.preventDefault();
    history('/cec-pnp-visa');
  };
  const showFSWForm = (e) => {
    e.preventDefault();
    history('/fsw-visa');
  };
  const showPNPForm = (e) => {
    e.preventDefault();
    history('/pnp-visa');
  };
  const showCECForm = (e) => {
    e.preventDefault();
    history('/cec-visa');
  };
  return (
    <>
      <Navbar isClient="true" />
      <IconContext.Provider value={{ color: '#fff', size: 64 }}>
        <div className="programs__section">
          <div className="programs__wrapper">
            <h1 className="programs__heading">Our Programs</h1>
            <div className="programs__container">
              <Link to="/programs" className="programs__container-card">
                <div className="programs__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/tourists.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>VISIT VISA</h3>
                  {/* <h4>$8.99</h4> */}
                  <p>
                    This program has minimum requirements for: skilled work experience language
                    ability education You must meet all the minimum requirements to be eligible.
                  </p>
                  <h4>Apply Now</h4>
                  <ul className="programs__container-features">
                    <li onClick={showNewVisitForm} className="item">
                      {' '}
                      New Application
                    </li>
                    <li onClick={showExtendVisitForm} className="item">
                      {' '}
                      Extend Application
                    </li>
                  </ul>
                </div>
              </Link>
              <Link to="/programs" className="programs__container-card">
                <div className="programs__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/student-visa.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>STUDY VISA</h3>
                  {/* <h4>$29.99</h4> */}
                  <p>
                    {' '}
                    If you need a study permit, your acknowledgment letter must be from a DLI. If it
                    isn’t, IRCC will refuse your application. Contact us now should you want to
                    study in Canada so we can assist you further.
                  </p>
                  <h4>Apply Now</h4>
                  <ul className="programs__container-features">
                    <li onClick={showNewStudyForm} className="item">
                      New Application
                    </li>
                    <li onClick={showExtendStudyForm} className="item">
                      Extend Application
                    </li>
                    {/* <li className="item">$100,000 Limit</li> */}
                  </ul>
                </div>
              </Link>
              <Link to="/programs" className="programs__container-card">
                <div className="programs__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/work.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3> WORK VISA</h3>
                  {/* <h4>$99.99</h4> */}
                  <p>
                    This program has minimum requirements for: skilled work experience language
                    ability education You must meet all the minimum requirements to be eligible.
                  </p>
                  <h4>Apply Now</h4>
                  <ul className="programs__container-features">
                    <li onClick={showPGWPForm} className="item">
                      PGWP File
                    </li>
                    <li onClick={showSpousalForm} className="item">
                      Spousal File
                    </li>
                    <li onClick={showExtendWorkForm} className="item">
                      Extend Application
                    </li>
                  </ul>
                </div>
              </Link>
              <Link to="/programs" className="programs__container-card">
                <div className="programs__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/spouse.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>PR VISA</h3>
                  {/* <h4>$99.99</h4> */}
                  <p>
                    {' '}
                    Sponsor your loved ones through this fantastic program made available to reunite
                    families. Sponsor your spouse / dependent children or parents and grandparents
                  </p>
                  <h4>Apply Now</h4>
                  <ul className="programs__container-features">
                    <li onClick={showCECForm} className="item">
                      CEC
                    </li>
                    <li onClick={showPNPForm} className="item">
                      PNP
                    </li>
                    <li onClick={showFSWForm} className="item">
                      FSW
                    </li>
                    <li onClick={showAddOnForm} className="item">
                      CEC + PNP
                    </li>
                  </ul>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Programs;

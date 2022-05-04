import React from 'react';
import './Services.scss';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button';
import Navbar from '../Navbar/Navbar';
import { IconWrapperStyle } from 'src/sections/@dashboard/app/AppTotalCases';
function Services() {
  return (
    <>
      <Navbar />
      <IconContext.Provider value={{ color: '#fff', size: 64 }}>
        <div className="services__section">
          <div className="services__wrapper">
            <h1 className="services__heading">Our Programs</h1>
            <div className="services__container">
              <Link to="/services" className="services__container-card">
                <div className="services__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/tourists.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>VISIT VISA</h3>
                  {/* <h4>$8.99</h4> */}
                  <p>
                    This program has minimum requirements for: skilled work experience language
                    ability education You must meet all the minimum requirements to be eligible.
                  </p>
                  <ul className="services__container-features">
                    <li> New Application</li>
                    <li> Extend Application</li>
                  </ul>
                  <Button buttonSize="btn--wide" page="servicesBtn" buttonColor="primary">
                    Apply
                  </Button>
                </div>
              </Link>
              <Link to="/services" className="services__container-card">
                <div className="services__container-cardInfo">
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
                  <ul className="services__container-features">
                    <li>New Application</li>
                    <li>Extend Application</li>
                    {/* <li>$100,000 Limit</li> */}
                  </ul>
                  <Button buttonSize="btn--wide" page="servicesBtn" buttonColor="blue">
                    Apply
                  </Button>
                </div>
              </Link>
              <Link to="/services" className="services__container-card">
                <div className="services__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/work.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3> WORK VISA</h3>
                  {/* <h4>$99.99</h4> */}
                  <p>
                    This program has minimum requirements for: skilled work experience language
                    ability education You must meet all the minimum requirements to be eligible.
                  </p>
                  <ul className="services__container-features">
                    <li>PGWP File</li>
                    <li>Spousal File</li>
                    <li>Extend Application</li>
                  </ul>
                  <Button
                    buttonSize="btn--wide"
                    page="servicesBtn"
                    className="applyBtn"
                    buttonColor="primary"
                  >
                    Apply
                  </Button>
                </div>
              </Link>
              <Link to="/services" className="services__container-card">
                <div className="services__container-cardInfo">
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
                  <ul className="services__container-features">
                    <li>CEC</li>
                    <li>PNP</li>
                    <li>FSW</li>
                    <li>CEC + PNP</li>
                  </ul>
                  <Button buttonSize="btn--wide" page="servicesBtn" buttonColor="primary">
                    Apply
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Services;

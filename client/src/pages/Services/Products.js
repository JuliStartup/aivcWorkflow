import React from 'react';
import './Products.css';
import { FaFire } from 'react-icons/fa';
import { BsXDiamondFill } from 'react-icons/bs';
import { GiCrystalize } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button';
import { IconWrapperStyle } from 'src/sections/@dashboard/app/AppTotalCases';
function Products() {
  const history = useNavigate();
  const goToServices = (e) => {
    e.preventDefault();
    history('/services');
  };
  return (
    <>
      <IconContext.Provider value={{ color: '#fff', size: 64 }}>
        <div className="pricing__section">
          <div className="pricing__wrapper">
            <h1 className="pricing__heading">Our Programs</h1>
            <div className="pricing__container">
              <Link to="/" className="pricing__container-card">
                <div className="pricing__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/tourists.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>Visit Visa</h3>
                  <h4>$8.99</h4>
                  <p>inclusive</p>
                  <ul className="pricing__container-features">
                    <li>New Application</li>
                    <li>Extend Existing </li>
                  </ul>
                  <Button
                    onClick={goToServices}
                    buttonSize="btn--wide"
                    page="programsBtn"
                    buttonColor="primary"
                  >
                    Know More
                  </Button>
                </div>
              </Link>
              <Link to="/" className="pricing__container-card">
                <div className="pricing__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/student-visa.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>Study Visa</h3>
                  <h4>$29.99</h4>
                  <p>inclusive</p>
                  <ul className="pricing__container-features">
                    <li>New Application</li>
                    <li>Extend Existing</li>
                    <li>$100,000 Limit</li>
                  </ul>
                  <Button
                    onClick={goToServices}
                    buttonSize="btn--wide"
                    page="programsBtn"
                    buttonColor="blue"
                  >
                    Know More
                  </Button>
                </div>
              </Link>
              <Link to="/" className="pricing__container-card">
                <div className="pricing__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/work.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>Work Visa</h3>
                  <h4>$99.99</h4>
                  <p>inclusive</p>
                  <ul className="pricing__container-features">
                    <li>PGWP</li>
                    <li>Spousal</li>
                    <li>Extend Existing</li>
                  </ul>
                  <Button
                    onClick={goToServices}
                    buttonSize="btn--wide"
                    page="programsBtn"
                    buttonColor="primary"
                  >
                    Know More
                  </Button>
                </div>
              </Link>
              <Link to="/" className="pricing__container-card">
                <div className="pricing__container-cardInfo">
                  <IconWrapperStyle>
                    <img src="/static/spouse.png" alt="spouse" />
                  </IconWrapperStyle>
                  <h3>PR</h3>
                  <h4>$99.99</h4>
                  <p>inclusive</p>
                  <ul className="pricing__container-features">
                    <li>CEC</li>
                    <li>PNP</li>
                    <li>FSW</li>
                    <li>CEC + PNP</li>
                  </ul>
                  <Button
                    onClick={goToServices}
                    buttonSize="btn--wide"
                    page="programsBtn"
                    buttonColor="primary"
                  >
                    Know More
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

export default Products;

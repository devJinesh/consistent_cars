import React from "react";
import img from "../images/logo.png";
import {
  PushpinOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="footer-section ">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <div className="cta-text">
                    <PushpinOutlined className="f-icons" />
                    <h4>Find us</h4>
                    <span>
                    B202 Shopping Complex, Shivranjan Towers, Someshwar Wadi, Pashan, Pune- 411008 
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <PhoneOutlined className="f-icons" />
                <div className="single-cta">
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>+91 86009 64138</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <MailOutlined className="f-icons" />
                <div className="single-cta">
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <a href="mailto:consistent.cars@rediffmail.com">consistent.cars@rediffmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="#">
                      <img
                        src={img}
                        className="img-fluid"
                        style={{ height: "80px", width: "80px" }}
                        alt="logo"
                      />
                      <h3 style={{ color: "#00ffffdf", fontFamily: "Barrio" }}>
                       Consistent Cars
                      </h3>
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      Questions? Reach us
                      <br></br>
                      Monday – Friday from 9AM to 6PM
                      <br></br>
                      +91 86009 64138
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 style={{ textAlign: " initial", marginLeft: "68px" }}>
                      Useful Links
                    </h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/services">Services</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

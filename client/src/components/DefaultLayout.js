import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import Logoo from "../images/logo.png";
import { Link } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = (
    <Menu>
      <Menu.Item>
      <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/userbookings">Bookings</Link>
      </Menu.Item>
      {user.admin && (
        <Menu.Item>
          <Link to="/admin">Admin Panel</Link>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <li>Logout</li>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header box-shadow1">
        <div className="d-flex justify-content-between logo-main">
          {/* Left side - Logo and links */}
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Logoo}
                  alt="car"
                  style={{
                    width: "35px",
                    height: "35px",
                    marginLeft: "16px",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                />
                <h1
                  style={{
                    fontSize: "1.4rem",
                    marginLeft: "10px",
                    marginTop: "15px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Consistent Cars
                </h1>
              </div>
            </Link>
            <div className="nav-links" style={{ display: 'flex'}}>
            <Link to="/services" style={styles.navLink}>Our Services</Link>
            <Link to="/contact" style={styles.navLink}>Contact Us</Link>
            <Link to="/about" style={styles.navLink}>About Us</Link>
          </div>
          </div>

          {/* User Dropdown */}
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>{"Welcome " + user.username}</Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

const styles = {
  navLink: {
    fontFamily: 'Arial, sans-serif', // generic font
    marginLeft: '50px',
    fontSize: '1rem',
    color: 'cyan',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default DefaultLayout;
